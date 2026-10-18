/* Direct publishing uses an owner-supplied GitHub key in tab memory only. */
(() => {
  const API='https://api.github.com/repos/nicolepezza2001-hue/frolicking-nicky';
  const FILE='/contents/dist/assets/published-lessons.json';
  let key='',busy=false;
  const make=(tag,text)=>{const e=document.createElement(tag);if(text)e.textContent=text;return e;};
  const decode=value=>new TextDecoder().decode(Uint8Array.from(atob(value.replace(/\s/g,'')),c=>c.charCodeAt(0)));
  const encode=value=>{const bytes=new TextEncoder().encode(value);let s='';for(const byte of bytes)s+=String.fromCharCode(byte);return btoa(s);};
  const dialog=make('dialog');dialog.className='fn-publish-dialog';
  const form=make('form');form.method='dialog';
  const heading=make('h3','Publish lesson');const explanation=make('p');
  const setup=make('details');const summary=make('summary','Connect publishing');
  const instructions=make('p','Create a fine-grained GitHub personal access token for nicolepezza2001-hue/frolicking-nicky only, with Contents: Read and write. Choose an expiry date. Paste it below; it stays only in this tab until you reload or disconnect.');
  const setupLink=make('a','Open GitHub publishing-key settings');setupLink.href='https://github.com/settings/personal-access-tokens/new';setupLink.target='_blank';setupLink.rel='noopener noreferrer';
  const label=make('label','Publishing key');const input=make('input');input.type='password';input.autocomplete='off';input.spellcheck=false;input.setAttribute('aria-label','Publishing key');label.append(input);
  setup.append(summary,instructions,setupLink,label);
  const error=make('p');error.setAttribute('role','status');
  const controls=make('div');controls.className='fn-editor-actions';
  const submit=make('button','Publish online');submit.type='submit';submit.className='fn-highlight-mode';
  const cancel=make('button','Cancel');cancel.type='button';cancel.className='fn-highlight-mode';
  const disconnect=make('button','Disconnect publishing');disconnect.type='button';disconnect.className='fn-highlight-mode';
  controls.append(submit,cancel,disconnect);form.append(heading,explanation,setup,error,controls);dialog.append(form);document.body.append(dialog);
  disconnect.addEventListener('click',()=>{key='';input.value='';setup.open=true;error.textContent='Disconnected. Enter a key to publish again.';});
  const request=async(path,options={})=>{
    const response=await fetch(API+path,{...options,headers:{Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2026-03-10',Authorization:'Bearer '+key,...options.headers}});
    if(response.status===401){key='';throw Error('The publishing key is invalid or expired. Reconnect to try again.');}
    if(response.status===403)throw Error('Publishing is not allowed by this key. Check the repository and Contents: Read and write permission.');
    return response;
  };
  const readRepo=async()=>{
    const response=await request(FILE+'?ref=main');
    if(response.status===404)throw Error('The publishing file could not be read. Check that the key has access to this repository.');
    if(!response.ok)throw Error('Could not load online lessons ('+response.status+').');
    const file=await response.json();const data=JSON.parse(decode(file.content));
    if(data.version!==1||!Array.isArray(data.lessons))throw Error('The online lesson file has an unexpected format. Nothing was changed.');
    return {sha:file.sha,data};
  };
  const watchLive=(lesson,remove,onStatus)=>{
    let attempts=0;
    const check=async()=>{
      try{
        const response=await fetch('/assets/published-lessons.json?live='+Date.now(),{cache:'no-store'});
        if(response.ok){const data=await response.json();const found=data.lessons?.find(l=>l.id===lesson.id);
          if(remove?!found:found?.publishedAt===lesson.publishedAt){window.dispatchEvent(new CustomEvent('fn-lessons-live',{detail:data.lessons}));onStatus(remove?'Removed from the public site.':'Published online.');return;}
        }
      }catch(_){}
      if(++attempts<18)setTimeout(check,10000);else onStatus('Submitted to GitHub. Deployment is taking longer than expected; check the website publishing status.');
    };setTimeout(check,8000);
  };
  window.fnPublishLesson=(lesson,onStatus,remove=false)=>new Promise((resolve,reject)=>{
    if(busy){reject(Error('Another lesson is being published. Please wait.'));return;}
    if(dialog.open){reject(Error('Finish or cancel the open publishing dialog first.'));return;}
    heading.textContent=remove?'Unpublish lesson':'Publish lesson';submit.textContent=remove?'Remove from public site':'Publish online';
    explanation.textContent=remove?'Remove “'+lesson.title+'” from the public site? Your device copy stays saved.':'Publish “'+lesson.title+'” on frolickingnicky.com? Anyone with the link can read it. Highlights and margin notes are not uploaded.';
    setup.open=!key;error.textContent='';input.value='';dialog.showModal();
    let finished=false;
    const cleanup=()=>{form.removeEventListener('submit',publish);cancel.removeEventListener('click',abort);dialog.removeEventListener('cancel',abort);input.value='';busy=false;};
    const abort=e=>{if(busy){e?.preventDefault();return;}if(finished)return;finished=true;cleanup();dialog.close();resolve(null);};
    const publish=async e=>{
      e.preventDefault();if(busy)return;
      if(input.value.trim())key=input.value.trim();input.value='';
      if(!key){setup.open=true;error.textContent='Connect a publishing key first.';return;}
      busy=true;submit.disabled=true;cancel.disabled=true;disconnect.disabled=true;error.textContent='Sending lesson to the website…';
      try{
        const publicLesson={id:lesson.id,topic:lesson.topic,title:lesson.title,text:lesson.text,date:lesson.date||'',updatedAt:lesson.updatedAt||new Date().toISOString(),publishedAt:new Date().toISOString()};
        let commit;
        for(let attempt=0;attempt<2;attempt++){
          const {sha,data}=await readRepo();const lessons=data.lessons.filter(l=>l.id!==lesson.id);if(!remove)lessons.push(publicLesson);
          const response=await request(FILE,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:(remove?'Unpublish lesson: ':'Publish lesson: ')+lesson.title,branch:'main',sha,content:encode(JSON.stringify({version:1,lessons},null,2)+'\n')})});
          if(response.status===409&&attempt===0)continue;
          if(!response.ok)throw Error(response.status===409?'The online lessons changed again. Your draft is safe; please retry.':'GitHub could not publish the lesson ('+response.status+'). Your draft is safe.');
          commit=(await response.json()).commit?.sha;if(!commit)throw Error('GitHub did not confirm a commit. Check the website before retrying.');break;
        }
        finished=true;cleanup();dialog.close();onStatus('Submitted to GitHub. Website checks and deployment are running.');
        watchLive(publicLesson,remove,onStatus);resolve({commit});
      }catch(err){busy=false;error.textContent=err.message;setup.open=!key;}
      finally{submit.disabled=false;cancel.disabled=false;disconnect.disabled=false;}
    };
    form.addEventListener('submit',publish);cancel.addEventListener('click',abort);dialog.addEventListener('cancel',abort);
  });
})();
