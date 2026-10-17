/* Local, text-offset annotations. Notes never leave this browser. */
(() => {
  const KEY = 'fn-study-annotations-v1';
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (_) {}
  let highlightMode = false;
  const modeButtons = [];
  const palette = {lavender:'#c2a3d2',rose:'#e8b4bd',mint:'#b8d4b2',blue:'#accde2',peach:'#edc090'};
  let activeColor = 'lavender';
  const colorButtons = [];
  const make = (tag, cls, text) => { const e = document.createElement(tag); e.className = cls || ''; if (text) e.textContent = text; return e; };
  window.fnAnnotateLesson = (lesson, content, margin, section) => {
    const records = saved[lesson.id] ||= [];
    const status = make('p', 'fn-annotation-status fn-sr'); status.setAttribute('aria-live', 'polite'); section.append(status);
    let pending = null, selecting = false, suppressMarkUntil = 0;
    const mode = make('button', 'fn-highlight-mode', 'Highlight'); mode.type = 'button'; mode.setAttribute('aria-pressed', String(highlightMode));
    mode.setAttribute('title', 'Turn on to highlight each passage you select. Press Escape to turn off.');
    modeButtons.push(mode);
    const tools = make('div', 'fn-reading-tools'); tools.setAttribute('role', 'group'); tools.setAttribute('aria-label', 'Reading tools');
    const colours = make('div', 'fn-highlight-colours'); colours.setAttribute('role','group'); colours.setAttribute('aria-label','Highlighter colours');
    Object.entries(palette).forEach(([name, value]) => {
      const button = make('button', 'fn-highlight-colour'); button.type='button'; button.dataset.colour=name;
      button.style.background=value; button.setAttribute('aria-label',name+' highlighter'); button.title=name; button.setAttribute('aria-pressed',String(name===activeColor));
      colorButtons.push(button); button.addEventListener('click',()=>{activeColor=name;colorButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.colour===name)));});colours.append(button);
    });
    const addNote = make('button','fn-highlight-mode','Note'); addNote.type='button'; addNote.title='Write a margin note beside the current passage';
    tools.append(mode,colours,addNote); section.querySelector('.fn-study-bar').append(tools);
    const backup = make('button','fn-highlight-mode','Export backup'); backup.type='button';
    backup.title='Download all lesson text, highlights, margin notes and study progress';tools.append(backup);
    backup.addEventListener('click',()=>{
      let study={};try{study=JSON.parse(localStorage.getItem('fn-study-v1'))||{};}catch(_){}
      const data={format:'frolicking-nicky-study-backup',version:1,exportedAt:new Date().toISOString(),lessons:[...(window.FN_SILVER_AGE_LESSONS||[]),...(window.FN_FRENCH_LESSONS||[])],annotations:saved,study};
      const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);
      const link=make('a');link.href=url;link.download='frolicking-nicky-study-'+new Date().toISOString().slice(0,10)+'.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
      status.textContent='Backup downloaded. Keep this file somewhere safe.';
    });
    const setMode = value => { highlightMode = value; modeButtons.forEach(button => button.setAttribute('aria-pressed', String(value))); document.body.classList.toggle('fn-highlighter-active', value); };
    mode.addEventListener('click', () => setMode(!highlightMode));
    const toolbar = make('div', 'fn-highlight-toolbar'); toolbar.hidden = true; toolbar.setAttribute('role', 'toolbar'); toolbar.setAttribute('aria-label', 'Selected text');
    const highlight = make('button', '', 'Highlight'); const comment = make('button', '', 'Highlight + note');
    highlight.type = comment.type = 'button'; toolbar.append(highlight, comment); section.append(toolbar);
    toolbar.addEventListener('pointerdown', e => e.preventDefault());
    let clickedRecord = null;
    const eraseToolbar=make('div','fn-highlight-toolbar');eraseToolbar.hidden=true;eraseToolbar.setAttribute('role','toolbar');eraseToolbar.setAttribute('aria-label','Highlight actions');
    const erase=make('button','','Erase highlight'), openNote=make('button','','Note');erase.type=openNote.type='button';eraseToolbar.append(erase,openNote);section.append(eraseToolbar);
    eraseToolbar.addEventListener('pointerdown',e=>e.preventDefault());
    const closeErase=()=>{eraseToolbar.hidden=true;clickedRecord=null;};
    const blocks = () => [...content.querySelectorAll('[data-note-block]')];
    const store = () => { try { localStorage.setItem(KEY, JSON.stringify(saved)); status.textContent = 'Saved in this browser'; } catch (_) { status.textContent = 'Could not save. Keep this page open to retain these notes.'; } };
    const renderHighlights = () => {
      blocks().forEach(block => {
        const index = Number(block.dataset.noteBlock), text = lesson.blocks[index].text;
        const spans = records.flatMap(r => (r.ranges || []).filter(s => s.block === index).map(s => ({ ...s, id:r.id, colour:r.colour || 'lavender' })));
        const boundaries = [...new Set([0,text.length,...spans.flatMap(s=>[s.start,s.end])])].sort((a,b)=>a-b);
        block.replaceChildren();
        for (let i=0;i<boundaries.length-1;i++) {
          const start=boundaries[i],end=boundaries[i+1]; const covering=spans.filter(s=>s.start<=start&&s.end>=end);
          if (!covering.length) block.append(document.createTextNode(text.slice(start,end)));
          else { const mark=make('mark','fn-text-highlight',text.slice(start,end)); mark.dataset.annotation=covering[0].id; mark.style.backgroundColor=palette[covering[0].colour] || palette.lavender; mark.tabIndex=0; mark.setAttribute('role','button'); mark.setAttribute('aria-label','Highlight actions for '+text.slice(start,end)); block.append(mark); }
        }
      });
    };
    const layout = () => {
      if (section.hidden || matchMedia('(max-width:760px)').matches) return;
      let bottom=0;
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
    const capture = (commit = false) => {
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
      if(highlightMode){toolbar.hidden=true;if(commit && !selecting){suppressMarkUntil=Date.now()+400;create(false);}return;}
      const rect=range.getBoundingClientRect();toolbar.hidden=false;
      toolbar.style.left=Math.max(8,Math.min(innerWidth-toolbar.offsetWidth-8,rect.left))+'px';
      toolbar.style.top=Math.max(8,Math.min(innerHeight-toolbar.offsetHeight-8,rect.top-toolbar.offsetHeight-8))+'px';
    };
    const create = hasNote => {
      if(!pending)return;
      const record={...pending,id:Date.now().toString(36)+Math.random().toString(36).slice(2,7),hasNote,text:'',colour:activeColor};
      records.push(record);pending=null;toolbar.hidden=true;getSelection()?.removeAllRanges();store();renderHighlights();renderCards();if(hasNote)focusRecord(record.id);
    };
    highlight.addEventListener('click',()=>create(false));comment.addEventListener('click',()=>create(true));
    content.addEventListener('pointerdown',()=>{selecting=true;});
    document.addEventListener('pointerup',()=>{if(selecting){selecting=false;setTimeout(()=>capture(true),0);}});
    content.addEventListener('keyup',()=>capture(true));
    let selectionTimer; document.addEventListener('selectionchange',()=>{clearTimeout(selectionTimer);selectionTimer=setTimeout(()=>capture(!selecting),300);});
    const openMark = e => {
      const mark=e.target.closest('mark');if(Date.now()<suppressMarkUntil || !mark || !getSelection()?.isCollapsed)return;
      const record=records.find(r=>r.id===mark.dataset.annotation);if(!record)return;
      clickedRecord=record;
      toolbar.hidden=true;const rect=mark.getBoundingClientRect();eraseToolbar.hidden=false;
      eraseToolbar.style.left=Math.max(8,Math.min(innerWidth-eraseToolbar.offsetWidth-8,rect.left))+'px';
      eraseToolbar.style.top=Math.max(8,rect.top-eraseToolbar.offsetHeight-8)+'px';
    };
    erase.addEventListener('click',()=>{
      if(!clickedRecord)return;
      const target=clickedRecord;
      target.ranges=[];
      if(!target.hasNote)records.splice(records.indexOf(target),1);
      closeErase();store();renderHighlights();renderCards();
    });
    openNote.addEventListener('click',()=>{
      if(!clickedRecord)return;const record=clickedRecord;
      if(!record.hasNote){record.hasNote=true;store();renderCards();}closeErase();focusRecord(record.id);
    });
    document.addEventListener('pointerdown',e=>{if(!eraseToolbar.contains(e.target)&&!e.target.closest('mark'))closeErase();});
    content.addEventListener('click',openMark);
    content.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('mark')){e.preventDefault();openMark(e);}});
    margin.addEventListener('click',e=>{
      if(e.target.closest('.fn-margin-card'))return;
      const y=e.clientY; const nearest=blocks().reduce((best,block)=>Math.abs(block.getBoundingClientRect().top-y)<Math.abs(best.getBoundingClientRect().top-y)?block:best);
      pending={ranges:[],quote:'',block:Number(nearest.dataset.noteBlock)};create(true);
    });
    addNote.addEventListener('click',()=>{const nearest=blocks().reduce((best,block)=>Math.abs(block.getBoundingClientRect().top-160)<Math.abs(best.getBoundingClientRect().top-160)?block:best);pending={ranges:[],quote:'',block:Number(nearest.dataset.noteBlock)};create(true);});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'){setMode(false);toolbar.hidden=true;closeErase();}});
    window.addEventListener('resize',layout);window.addEventListener('hashchange',()=>{toolbar.hidden=true;closeErase();requestAnimationFrame(layout);});
    window.addEventListener('scroll',()=>{toolbar.hidden=true;closeErase();},{passive:true});
    new ResizeObserver(layout).observe(content);
    renderHighlights();renderCards();
  };
})();
