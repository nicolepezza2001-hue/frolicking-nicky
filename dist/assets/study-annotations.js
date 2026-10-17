/* Local, text-offset annotations. Notes never leave this browser. */
(() => {
  const KEY = 'fn-study-annotations-v1';
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (_) {}
  const make = (tag, cls, text) => { const e = document.createElement(tag); e.className = cls || ''; if (text) e.textContent = text; return e; };
  window.fnAnnotateLesson = (lesson, content, margin, section) => {
    const records = saved[lesson.id] ||= [];
    const hint = make('p', 'fn-margin-hint', 'Select text to highlight it, or click here to add a note.');
    const status = make('p', 'fn-annotation-status', 'Notes save in this browser.'); status.setAttribute('aria-live', 'polite');
    const controls = make('div', 'fn-margin-controls'); controls.append(hint, status); margin.append(controls); let pending = null;
    const toolbar = make('div', 'fn-highlight-toolbar'); toolbar.hidden = true; toolbar.setAttribute('role', 'toolbar'); toolbar.setAttribute('aria-label', 'Selected text');
    const highlight = make('button', '', 'Highlight'); const comment = make('button', '', 'Highlight + note');
    highlight.type = comment.type = 'button'; toolbar.append(highlight, comment); section.append(toolbar);
    toolbar.addEventListener('pointerdown', e => e.preventDefault());
    const blocks = () => [...content.querySelectorAll('[data-note-block]')];
    const store = () => { try { localStorage.setItem(KEY, JSON.stringify(saved)); status.textContent = 'Saved in this browser'; } catch (_) { status.textContent = 'Could not save. Keep this page open to retain these notes.'; } };
    const renderHighlights = () => {
      blocks().forEach(block => {
        const index = Number(block.dataset.noteBlock), text = lesson.blocks[index].text;
        const spans = records.flatMap(r => (r.ranges || []).filter(s => s.block === index).map(s => ({ ...s, id:r.id })));
        const boundaries = [...new Set([0,text.length,...spans.flatMap(s=>[s.start,s.end])])].sort((a,b)=>a-b);
        block.replaceChildren();
        for (let i=0;i<boundaries.length-1;i++) {
          const start=boundaries[i],end=boundaries[i+1]; const covering=spans.filter(s=>s.start<=start&&s.end>=end);
          if (!covering.length) block.append(document.createTextNode(text.slice(start,end)));
          else { const mark=make('mark','fn-text-highlight',text.slice(start,end)); mark.dataset.annotation=covering[0].id; mark.tabIndex=0; mark.setAttribute('role','button'); mark.setAttribute('aria-label','Open note for '+text.slice(start,end)); block.append(mark); }
        }
      });
    };
    const layout = () => {
      if (section.hidden || matchMedia('(max-width:760px)').matches) return;
      let bottom=controls.offsetHeight+24;
      [...margin.querySelectorAll('.fn-margin-card')].forEach(card=>{
        const record=records.find(r=>r.id===card.dataset.annotation);
        const anchor=content.querySelector(`[data-note-block="${record.block}"]`);
        const desired=anchor ? anchor.getBoundingClientRect().top-margin.getBoundingClientRect().top : bottom;
        const top=Math.max(bottom,desired); card.style.top=top+'px'; bottom=top+card.offsetHeight+16;
      });
      margin.style.minHeight=bottom+'px';
    };
    const focusRecord = id => {
      const card=margin.querySelector(`[data-annotation="${id}"]`);
      if (card) { card.querySelector('textarea').focus(); card.scrollIntoView({block:'nearest',behavior:'smooth'}); }
    };
    const renderCards = () => {
      margin.querySelectorAll('.fn-margin-card').forEach(e=>e.remove());
      records.filter(r=>r.hasNote).sort((a,b)=>a.block-b.block).forEach(record=>{
        const card=make('div','fn-margin-card'); card.dataset.annotation=record.id;
        if(record.quote) card.append(make('blockquote','',record.quote));
        const field=make('textarea'); field.value=record.text || ''; field.placeholder='Write your note…'; field.setAttribute('aria-label',record.quote?'Note on '+record.quote:'Margin note');
        const resize=()=>{field.style.height='auto';field.style.height=Math.max(84,field.scrollHeight)+'px';};
        field.addEventListener('input',()=>{record.text=field.value;resize();store();layout();});
        const remove=make('button','fn-note-remove','Remove'); remove.type='button';
        remove.addEventListener('click',()=>{records.splice(records.indexOf(record),1);store();renderHighlights();renderCards();});
        card.append(field,remove);margin.append(card);resize();
      });layout();
    };
    const capture = () => {
      const selection=getSelection();
      if(!selection || selection.isCollapsed || !selection.rangeCount || section.hidden){toolbar.hidden=true;return;}
      const range=selection.getRangeAt(0);
      if(!content.contains(range.startContainer)||!content.contains(range.endContainer)){toolbar.hidden=true;return;}
      const ranges=[];
      blocks().forEach(block=>{
        if(!range.intersectsNode(block))return;
        const local=range.cloneRange();
        if(!block.contains(range.startContainer))local.setStart(block,0);
        if(!block.contains(range.endContainer))local.setEnd(block,block.childNodes.length);
        const before=document.createRange();before.selectNodeContents(block);before.setEnd(local.startContainer,local.startOffset);
        const start=before.toString().length,end=start+local.toString().length;
        if(end>start)ranges.push({block:Number(block.dataset.noteBlock),start,end});
      });
      if(!ranges.length){toolbar.hidden=true;return;}
      pending={ranges,quote:selection.toString().trim(),block:ranges[0].block};
      const rect=range.getBoundingClientRect();toolbar.hidden=false;
      toolbar.style.left=Math.max(8,Math.min(innerWidth-toolbar.offsetWidth-8,rect.left))+'px';
      toolbar.style.top=Math.max(8,Math.min(innerHeight-toolbar.offsetHeight-8,rect.top-toolbar.offsetHeight-8))+'px';
    };
    const create = hasNote => {
      if(!pending)return;
      const record={...pending,id:Date.now().toString(36)+Math.random().toString(36).slice(2,7),hasNote,text:''};
      records.push(record);pending=null;toolbar.hidden=true;getSelection()?.removeAllRanges();store();renderHighlights();renderCards();if(hasNote)focusRecord(record.id);
    };
    highlight.addEventListener('click',()=>create(false));comment.addEventListener('click',()=>create(true));
    content.addEventListener('pointerup',()=>setTimeout(capture,0));content.addEventListener('keyup',capture);
    let selectionTimer; document.addEventListener('selectionchange',()=>{clearTimeout(selectionTimer);selectionTimer=setTimeout(capture,120);});
    const openMark = e => {
      const mark=e.target.closest('mark');if(!mark || !getSelection()?.isCollapsed)return;
      const record=records.find(r=>r.id===mark.dataset.annotation);if(!record)return;
      if(!record.hasNote){record.hasNote=true;store();renderCards();}focusRecord(record.id);
    };
    content.addEventListener('click',openMark);
    content.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('mark')){e.preventDefault();openMark(e);}});
    margin.addEventListener('click',e=>{
      if(e.target.closest('.fn-margin-card'))return;
      const y=e.clientY; const nearest=blocks().reduce((best,block)=>Math.abs(block.getBoundingClientRect().top-y)<Math.abs(best.getBoundingClientRect().top-y)?block:best);
      pending={ranges:[],quote:'',block:Number(nearest.dataset.noteBlock)};create(true);
    });
    const add=make('button','fn-add-margin-note','+ Add note');add.type='button';
    add.addEventListener('click',e=>{e.stopPropagation();pending={ranges:[],quote:'',block:0};create(true);});controls.prepend(add);
    window.addEventListener('resize',layout);window.addEventListener('hashchange',()=>{toolbar.hidden=true;requestAnimationFrame(layout);});
    window.addEventListener('scroll',()=>{toolbar.hidden=true;},{passive:true});
    new ResizeObserver(layout).observe(content);
    renderHighlights();renderCards();
  };
})();
