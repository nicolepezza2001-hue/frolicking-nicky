/* Personal lessons: immediate device autosave, portable backup, no account secrets. */
(() => {
  const KEY='fn-study-lessons-v1';
  const make=(tag,cls,text)=>{const e=document.createElement(tag);e.className=cls||'';if(text)e.textContent=text;return e;};
  let saved={lessons:[],draft:null};
  try{const data=JSON.parse(localStorage.getItem(KEY));if(data&&Array.isArray(data.lessons))saved=data;}catch(_){}
  const root=document.getElementById('fn-study');if(!root)return;
  const topics=[...root.querySelectorAll('.fn-study-topic')].map(e=>({id:e.id,title:e.querySelector('h2').textContent}));
  let current=null,dirty=false;
  const editor=make('section','fn-study-view fn-lesson fn-lesson-editor');editor.id='lesson-editor';editor.hidden=true;
  const bar=make('nav','fn-study-bar'),back=make('a','fn-study-back','← Back to topic');back.href='#silver-age';bar.append(back);
  const status=make('p','fn-editor-status','Saved on this device only. Export a backup to keep another copy.');status.setAttribute('role','status');
  const heading=make('h2',null,'New lesson');
  const form=make('form','fn-editor-form');
  const topic=make('select');topic.setAttribute('aria-label','Lesson topic');topics.forEach(t=>{const option=make('option',null,t.title);option.value=t.id;topic.append(option);});
  const title=make('input');title.type='text';title.required=true;title.placeholder='Class 3 — lesson title';title.setAttribute('aria-label','Lesson title');
  const date=make('input');date.type='date';date.setAttribute('aria-label','Lesson date');
  const text=make('textarea','fn-editor-writing');text.placeholder='Start taking notes…\n\nUse # for a heading, or - for a bullet.';text.setAttribute('aria-label','Lesson notes');text.spellcheck=true;
  const format=make('div','fn-editor-actions');
  const button=(label,fn)=>{const b=make('button','fn-highlight-mode',label);b.type='button';b.addEventListener('click',fn);return b;};
  const prefix=value=>{const start=text.selectionStart,end=text.selectionEnd;const lineStart=text.value.lastIndexOf('\n',start-1)+1;const selected=text.value.slice(lineStart,end);text.setRangeText(selected.split('\n').map(line=>value+line).join('\n'),lineStart,end,'end');text.dispatchEvent(new Event('input'));text.focus();};
  format.append(button('Heading',()=>prefix('# ')),button('Bullet',()=>prefix('- ')));
  const preview=make('button','fn-highlight-mode','Reading view');preview.type='submit';
  const exportButton=button('Export lessons',()=>download());const importButton=button('Import lessons',()=>upload.click());
  const upload=make('input');upload.type='file';upload.accept='.json,application/json';upload.hidden=true;
  const actions=make('div','fn-editor-actions');actions.append(preview,exportButton,importButton,upload);
  const label=(text,field)=>{const l=make('label','fn-editor-label',text);l.append(field);return l;};
  form.append(label('Topic',topic),label('Title',title),label('Date',date),format,label('Notes',text),actions);
  editor.append(bar,heading,status,form);root.append(editor);
  const persist=()=>{try{localStorage.setItem(KEY,JSON.stringify(saved));status.textContent='Saved on this device · Export a backup for another copy.';return true;}catch(_){status.textContent='Could not save on this device. Export your lessons before leaving.';return false;}};
  const normalise=raw=>{
    if(!raw||typeof raw.id!=='string'||!/^personal-[a-z0-9-]+$/.test(raw.id)||!topics.some(t=>t.id===raw.topic)||typeof raw.title!=='string'||typeof raw.text!=='string')return null;
    return {id:raw.id,topic:raw.topic,title:raw.title.slice(0,300),text:raw.text,date:typeof raw.date==='string'?raw.date:'',updatedAt:raw.updatedAt||''};
  };
  const parse=raw=>raw.split(/\n\s*\n|\n(?=#+\s|[-*]\s)/).map(value=>value.trim()).filter(Boolean).map(value=>({type:/^#+\s/.test(value)?'heading':/^[-*]\s/.test(value)?'note':'paragraph',text:value.replace(/^#+\s|^[-*]\s/,'')}));
  const saveDraft=()=>{
    dirty=true;const now=new Date().toISOString();
    current={id:current?.id||'personal-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7),topic:topic.value,title:title.value,text:text.value,date:date.value,updatedAt:now};
    saved.draft=current;
    if(current.title.trim()||current.text.trim()){
      const index=saved.lessons.findIndex(l=>l.id===current.id);if(index<0)saved.lessons.push({...current});else saved.lessons[index]={...current};
    }
    persist();renderLists();back.href='#'+topic.value;
  };
  [topic,title,date,text].forEach(field=>field.addEventListener('input',saveDraft));
  const download=()=>{
    const data={format:'frolicking-nicky-personal-lessons',version:1,exportedAt:new Date().toISOString(),lessons:saved.lessons,draft:saved.draft};
    const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));
    const a=make('a');a.href=url;a.download='frolicking-nicky-lessons-'+new Date().toISOString().slice(0,10)+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  };
  upload.addEventListener('change',async()=>{
    const file=upload.files[0];if(!file)return;
    try{
      const data=JSON.parse(await file.text());const imported=data.personalLessons?.lessons||data.lessons;
      if(!Array.isArray(imported))throw Error('Not a lesson backup');
      const valid=imported.map(normalise).filter(Boolean);if(!valid.length)throw Error('No personal lessons found');
      // Existing newer edits win when importing an older backup.
      valid.forEach(l=>{const i=saved.lessons.findIndex(v=>v.id===l.id);if(i<0)saved.lessons.push(l);else if(l.updatedAt>saved.lessons[i].updatedAt)saved.lessons[i]=l;});
      if(!persist())return;renderLists();renderViews();status.textContent='Imported '+valid.length+' lessons. Saved on this device.';
    }catch(e){status.textContent='Could not import: '+e.message;}upload.value='';
  });
  const open=(lesson,topicId)=>{
    current=lesson?{...lesson}:null;dirty=false;
    topic.value=lesson?.topic||topicId||'silver-age';title.value=lesson?.title||'';text.value=lesson?.text||'';date.value=lesson?.date||'';
    heading.textContent=lesson?'Edit lesson':'New lesson';back.href='#'+topic.value;status.textContent='Saved on this device only. Export a backup to keep another copy.';
    location.hash='lesson-editor';requestAnimationFrame(()=>title.focus());
  };
  const lists=new Map();
  topics.forEach(t=>{
    const sec=document.getElementById(t.id);const target=sec.querySelector('.fn-study-grid>div')||sec;
    const box=make('section','fn-personal-lessons'),head=make('div','fn-editor-actions');
    const h=make('h3','fn-study-label','Your lessons');head.append(h,button('+ New lesson',()=>open(null,t.id)));
    const list=make('ul','fn-personal-lesson-list');box.append(head,list);target.append(box);lists.set(t.id,list);
  });
  function renderLists(){lists.forEach((list,id)=>{
    list.replaceChildren();saved.lessons.filter(l=>l.topic===id).forEach(l=>{
      const row=make('li'),link=make('a','fn-study-lesson-link',l.title.trim()||'Untitled lesson');link.href='#'+l.id;
      row.append(link,button('Edit',()=>open(l)));list.append(row);
    });
    if(saved.draft?.topic===id&&!saved.lessons.some(l=>l.id===saved.draft.id))list.append(button('Resume draft',()=>open(saved.draft)));
  });}
  function renderViews(){
    root.querySelectorAll('.fn-personal-lesson-view').forEach(e=>e.remove());
    saved.lessons.forEach(l=>{
      const view=make('article','fn-study-view fn-lesson fn-personal-lesson-view');view.id=l.id;view.hidden=true;
      const nav=make('nav','fn-study-bar'),a=make('a','fn-study-back','← '+topics.find(t=>t.id===l.topic).title);a.href='#'+l.topic;
      nav.append(a,button('Edit lesson',()=>open(l)));view.append(nav,make('p','fn-lesson-number','Your lesson · Saved on this device'),make('h2',null,l.title||'Untitled lesson'));
      const blocks=parse(l.text),notes=make('div','fn-lesson-notes');let ul;
      blocks.forEach((block,i)=>{let el;if(block.type==='heading'){ul=null;el=make('h3',null,block.text);notes.append(el);}else if(block.type==='note'){if(!ul){ul=make('ul');notes.append(ul);}el=make('li',null,block.text);ul.append(el);}else{ul=null;el=make('p',null,block.text);notes.append(el);}el.dataset.noteBlock=i;});
      if(!blocks.length)notes.append(make('p',null,'No notes yet. Choose Edit lesson to start writing.'));
      const workspace=make('div','fn-lesson-workspace'),margin=make('aside','fn-lesson-margin');margin.setAttribute('aria-label','Your margin notes');workspace.append(notes,margin);view.append(workspace);root.append(view);
      if(blocks.length)window.fnAnnotateLesson?.({id:l.id,title:l.title,blocks},notes,margin,view);
    });
  }
  form.addEventListener('submit',e=>{e.preventDefault();saveDraft();saved.draft=null;persist();renderViews();location.hash=current.id;});
  back.addEventListener('click',()=>{if(dirty)saveDraft();renderViews();});
  window.addEventListener('hashchange',()=>{
    if(location.hash==='#lesson-editor'&&!current&&saved.draft)open(saved.draft);
    if(location.hash!=='#lesson-editor'&&dirty){saveDraft();dirty=false;renderViews();window.dispatchEvent(new Event('hashchange'));}
    const view=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(view?.classList.contains('fn-personal-lesson-view')){view.hidden=false;document.getElementById('fn-scene').hidden=true;document.body.classList.add('fn-study-open','fn-lesson-open');}
  });
  saved.lessons=saved.lessons.map(normalise).filter(Boolean);renderLists();renderViews();
  if(location.hash==='#lesson-editor'&&saved.draft)open(saved.draft);
  window.dispatchEvent(new Event('hashchange'));
})();
