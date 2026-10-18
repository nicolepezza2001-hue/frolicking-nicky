/* Personal lessons: immediate device autosave, portable backup, no account secrets. */
(() => {
  const KEY='fn-study-lessons-v1';
  const make=(tag,cls,text)=>{const e=document.createElement(tag);e.className=cls||'';if(text)e.textContent=text;return e;};
  let saved={lessons:[],draft:null};
  try{const data=JSON.parse(localStorage.getItem(KEY));if(data&&Array.isArray(data.lessons))saved=data;}catch(_){}
  saved.trash ||= [];
  const root=document.getElementById('fn-study');if(!root)return;
  const topics=[...root.querySelectorAll('.fn-study-topic')].map(e=>({id:e.id,title:e.querySelector('h2').textContent}));
  let current=null,dirty=false,published=[];
  const allLessons=()=>{const byId=new Map(published.map(l=>[l.id,l]));saved.lessons.forEach(l=>byId.set(l.id,l));return [...byId.values()];};
  const isOnline=id=>published.some(l=>l.id===id);
  const publicationLabel=lesson=>{const online=published.find(l=>l.id===lesson.id);if(!online)return 'On this device';return ['title','text','topic','date'].some(k=>(online[k]||'')!==(lesson[k]||''))||JSON.stringify(online.images||{})!==JSON.stringify(lesson.images||{})?'Online · local changes':'Online';};

  const editor=make('section','fn-study-view fn-lesson fn-lesson-editor');editor.id='lesson-editor';editor.hidden=true;
  const bar=make('nav','fn-study-bar'),back=make('a','fn-study-back','← Back to topic');back.href='#silver-age';bar.append(back);
  const status=make('p','fn-editor-status','Saved on this device only. Export a backup to keep another copy.');status.setAttribute('role','status');
  const heading=make('h2',null,'New lesson');
  const form=make('form','fn-editor-form');
  const topic=make('select');topic.setAttribute('aria-label','Lesson topic');topics.forEach(t=>{const option=make('option',null,t.title);option.value=t.id;topic.append(option);});
  const title=make('input');title.type='text';title.required=true;title.placeholder='Class 3 — lesson title';title.setAttribute('aria-label','Lesson title');
  const date=make('input');date.type='date';date.setAttribute('aria-label','Lesson date');
  const text=make('textarea','fn-editor-writing');text.placeholder='Start taking notes…\n\nUse # for a heading, or - for a bullet. Paste or drop a picture to add it.';text.setAttribute('aria-label','Lesson notes');text.spellcheck=true;
  const format=make('div','fn-editor-actions');
  const button=(label,fn)=>{const b=make('button','fn-highlight-mode',label);b.type='button';b.addEventListener('click',fn);return b;};
  const prefix=value=>{const start=text.selectionStart,end=text.selectionEnd;const lineStart=text.value.lastIndexOf('\n',start-1)+1;const selected=text.value.slice(lineStart,end);text.setRangeText(selected.split('\n').map(line=>value+line).join('\n'),lineStart,end,'end');text.dispatchEvent(new Event('input'));text.focus();};
  format.append(button('Heading',()=>prefix('# ')),button('Bullet',()=>prefix('- ')),button('Add image',()=>picker.click()));
  // Pictures: pasted, dropped or picked, shrunk to 1200px JPEGs and kept with the lesson (current.images). The notes
  // hold a [image:id] line where each one goes; deleting that line removes the picture.
  let images={};
  const picker=make('input');picker.type='file';picker.accept='image/*';picker.multiple=true;picker.hidden=true;
  const thumbs=make('div','fn-editor-thumbs');
  const tokens=value=>[...value.matchAll(/\[image:([a-z0-9]+)\]/g)].map(m=>m[1]);
  const shrink=file=>new Promise((resolve,reject)=>{
    const url=URL.createObjectURL(file),img=new Image();
    img.onload=()=>{const scale=Math.min(1,1200/Math.max(img.naturalWidth,img.naturalHeight)),c=document.createElement('canvas');
      c.width=Math.round(img.naturalWidth*scale);c.height=Math.round(img.naturalHeight*scale);const g=c.getContext('2d');g.fillStyle='#faeac0';g.fillRect(0,0,c.width,c.height);g.drawImage(img,0,0,c.width,c.height);
      URL.revokeObjectURL(url);resolve(c.toDataURL('image/jpeg',.78));};
    img.onerror=()=>{URL.revokeObjectURL(url);reject(Error('That file could not be read as a picture.'));};img.src=url;
  });
  const addImages=async files=>{
    files=[...files].filter(f=>f.type.startsWith('image/'));if(!files.length)return;
    status.textContent='Adding '+(files.length>1?files.length+' pictures':'the picture')+'…';
    let at=text.selectionStart;
    for(const file of files){
      try{const id=Date.now().toString(36)+Math.random().toString(36).slice(2,6);images[id]=await shrink(file);
        const token='\n\n[image:'+id+']\n\n';text.setRangeText(token,at,at,'end');at+=token.length;}
      catch(e){status.textContent=e.message;return;}
    }
    text.dispatchEvent(new Event('input'));text.focus();
  };
  const drawThumbs=()=>{thumbs.replaceChildren(...tokens(text.value).filter(id=>images[id]).map(id=>{const i=make('img');i.src=images[id];i.alt='';return i;}));};
  picker.addEventListener('change',()=>{addImages(picker.files);picker.value='';});
  text.addEventListener('paste',e=>{const files=[...(e.clipboardData?.files||[])].filter(f=>f.type.startsWith('image/'));if(files.length){e.preventDefault();addImages(files);}});
  text.addEventListener('dragover',e=>{if([...e.dataTransfer.items].some(i=>i.type.startsWith('image/')))e.preventDefault();});
  text.addEventListener('drop',e=>{const files=[...e.dataTransfer.files].filter(f=>f.type.startsWith('image/'));if(files.length){e.preventDefault();addImages(files);}});
  const preview=make('button','fn-highlight-mode','Reading view');preview.type='submit';
  const exportButton=button('Export lessons',()=>download());const importButton=button('Import lessons',()=>upload.click());
  const upload=make('input');upload.type='file';upload.accept='.json,application/json';upload.hidden=true;
  const remove=button('Delete lesson',()=>{
    if(!current)return;
    if(isOnline(current.id)){status.textContent='This lesson is online. Unpublish it before deleting the device copy.';return;}
    if(!confirm('Delete “'+(title.value.trim()||'Untitled lesson')+'”? You can undo this from the topic page.'))return;
    const deleted={...current,title:title.value,text:text.value,date:date.value,topic:topic.value,images:kept(text.value)};
    saved.trash.push(deleted);saved.lessons=saved.lessons.filter(l=>l.id!==deleted.id);if(saved.draft?.id===deleted.id)saved.draft=null;
    current=null;dirty=false;persist();renderLists();renderViews();location.hash=deleted.topic;
  });remove.hidden=true;
  const publish=button('Publish',async()=>{
    if(!form.reportValidity())return;saveDraft();
    if(!current.text.trim()){status.textContent='Write some lesson notes before publishing.';return;}
    publish.disabled=true;
    try{await window.fnPublishLesson(current,message=>{status.textContent=message;});}catch(e){status.textContent=e.message;}finally{publish.disabled=false;}
  });
  const unpublish=button('Unpublish',async()=>{
    if(!current)return;saveDraft();unpublish.disabled=true;
    try{await window.fnPublishLesson(current,message=>{status.textContent=message;},true);}catch(e){status.textContent=e.message;}finally{unpublish.disabled=false;}
  });unpublish.hidden=true;
  const actions=make('div','fn-editor-actions');actions.append(preview,publish,exportButton,importButton,unpublish,remove,upload);
  const label=(text,field)=>{const l=make('label','fn-editor-label',text);l.append(field);return l;};
  form.append(label('Topic',topic),label('Title',title),label('Date',date),format,label('Notes',text),thumbs,picker,actions);
  editor.append(bar,heading,status,form);root.append(editor);
  const persist=()=>{try{localStorage.setItem(KEY,JSON.stringify(saved));status.textContent='Saved on this device · Export a backup for another copy.';return true;}catch(_){status.textContent='Could not save on this device: it may be full of pictures. Export your lessons, then remove a picture or two.';return false;}};
  const normalise=raw=>{
    if(!raw||typeof raw.id!=='string'||!/^personal-[a-z0-9-]+$/.test(raw.id)||!topics.some(t=>t.id===raw.topic)||typeof raw.title!=='string'||typeof raw.text!=='string')return null;
    const images={};if(raw.images&&typeof raw.images==='object')Object.entries(raw.images).forEach(([k,v])=>{if(/^[a-z0-9]+$/.test(k)&&typeof v==='string'&&v.startsWith('data:image/'))images[k]=v;});
    return {id:raw.id,topic:raw.topic,title:raw.title.slice(0,300),text:raw.text,date:typeof raw.date==='string'?raw.date:'',updatedAt:raw.updatedAt||'',...(Object.keys(images).length?{images}:{})};
  };
  const parse=raw=>raw.replace(/[ \t]*(\[image:[a-z0-9]+\])[ \t]*/g,'\n\n$1\n\n').split(/\n\s*\n|\n(?=#+\s|[-*]\s)/).map(value=>value.trim()).filter(Boolean).map(value=>/^\[image:[a-z0-9]+\]$/.test(value)?{type:'image',text:'',image:value.slice(7,-1)}:({type:/^#+\s/.test(value)?'heading':/^[-*]\s/.test(value)?'note':'paragraph',text:value.replace(/^#+\s|^[-*]\s/,'')}));
  const kept=value=>{const out={};tokens(value).forEach(id=>{if(images[id])out[id]=images[id];});return Object.keys(out).length?out:undefined;};
  const saveDraft=()=>{
    dirty=true;const now=new Date().toISOString();
    current={id:current?.id||'personal-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7),topic:topic.value,title:title.value,text:text.value,date:date.value,updatedAt:now,images:kept(text.value)};drawThumbs();
    saved.draft=current;remove.hidden=false;
    if(current.title.trim()||current.text.trim()){
      const index=saved.lessons.findIndex(l=>l.id===current.id);if(index<0)saved.lessons.push({...current});else saved.lessons[index]={...current};
    }
    persist();renderLists();back.href='#'+topic.value;
  };
  [topic,title,date,text].forEach(field=>field.addEventListener('input',saveDraft));
  const download=()=>{
    const data={format:'frolicking-nicky-personal-lessons',version:1,exportedAt:new Date().toISOString(),lessons:allLessons(),draft:saved.draft};
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
    topic.value=lesson?.topic||topicId||'silver-age';title.value=lesson?.title||'';text.value=lesson?.text||'';date.value=lesson?.date||'';images={...(lesson?.images||{})};drawThumbs();
    remove.hidden=!lesson;unpublish.hidden=!lesson||!isOnline(lesson.id);
    heading.textContent=lesson?'Edit lesson':'New lesson';back.href='#'+topic.value;status.textContent=lesson&&isOnline(lesson.id)?'Published online. Changes stay on this device until you click Publish again.':'Saved on this device only. Click Publish to put this lesson online.';
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
    list.replaceChildren();allLessons().filter(l=>l.topic===id).forEach(l=>{
      const row=make('li'),link=make('a','fn-study-lesson-link',l.title.trim()||'Untitled lesson');link.href='#'+l.id;
      row.append(link,make('small','fn-personal-status',publicationLabel(l)),button('Edit',()=>open(l)));list.append(row);
    });
    const deleted=saved.trash.filter(l=>l.topic===id).at(-1);
    if(deleted)list.append(button('Undo deletion',()=>{saved.trash=saved.trash.filter(l=>l.id!==deleted.id);saved.lessons.push(deleted);persist();renderLists();renderViews();window.dispatchEvent(new Event('hashchange'));}));
    if(saved.draft?.topic===id&&!saved.lessons.some(l=>l.id===saved.draft.id))list.append(button('Resume draft',()=>open(saved.draft)));
  });}
  function renderViews(){
    root.querySelectorAll('.fn-personal-lesson-view').forEach(e=>e.remove());
    allLessons().forEach(l=>{
      const view=make('article','fn-study-view fn-lesson fn-personal-lesson-view');view.id=l.id;view.hidden=true;
      const nav=make('nav','fn-study-bar'),a=make('a','fn-study-back','← '+topics.find(t=>t.id===l.topic).title);a.href='#'+l.topic;
      nav.append(a,button('Edit lesson',()=>open(l)));view.append(nav,make('p','fn-lesson-number',isOnline(l.id)?'Published lesson':'Your lesson · Saved on this device'),make('h2',null,l.title||'Untitled lesson'));
      const blocks=parse(l.text),notes=make('div','fn-lesson-notes');let ul;
      blocks.forEach((block,i)=>{let el;if(block.type==='image'){ul=null;if(!l.images?.[block.image])return;const fig=make('figure','fn-lesson-figure'),img=make('img');img.src=l.images[block.image];img.alt='';img.loading='lazy';fig.append(img);notes.append(fig);return;}if(block.type==='heading'){ul=null;el=make('h3',null,block.text);notes.append(el);}else if(block.type==='note'){if(!ul){ul=make('ul');notes.append(ul);}el=make('li',null,block.text);ul.append(el);}else{ul=null;el=make('p',null,block.text);notes.append(el);}el.dataset.noteBlock=i;});
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
  const receiveOnline=lessons=>{
    published=lessons.map(normalise).filter(Boolean);renderLists();renderViews();
    unpublish.hidden=!current||!isOnline(current.id);window.dispatchEvent(new Event('hashchange'));
  };
  window.addEventListener('fn-lessons-live',event=>receiveOnline(event.detail));
  fetch('/assets/published-lessons.json',{cache:'no-store'}).then(response=>{if(!response.ok)throw Error();return response.json();}).then(data=>{if(data.version===1&&Array.isArray(data.lessons))receiveOnline(data.lessons);}).catch(()=>{status.textContent='Online lessons could not load. Your device lessons are still available.';});
  saved.lessons=saved.lessons.map(normalise).filter(Boolean);renderLists();renderViews();
  if(location.hash==='#lesson-editor'&&saved.draft)open(saved.draft);
  window.dispatchEvent(new Event('hashchange'));
})();
