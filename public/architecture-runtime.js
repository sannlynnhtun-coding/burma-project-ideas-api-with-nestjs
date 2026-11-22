/* Populate the YBS document template with the selected resource's own API data. */
(() => {
 const config=JSON.parse(document.getElementById('architecture-data').textContent);
 const {docs,title,resource,flow}=config;
 const $=id=>document.getElementById(id);
 const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const text=value=>typeof value==='string'?value:JSON.stringify(value,null,2);
 const colored=value=>text(value).replace(/"(?:\\.|[^"\\])*"(?=\s*:)|"(?:\\.|[^"\\])*"|\b(?:true|false|null|-?\d+(?:\.\d+)?)\b/g,(token,offset,whole)=>{
  const color=token[0]==='"'?(whole.slice(offset+token.length).trimStart()[0]===':'?'#7AA2F7':'#9ECE6A'):'#FF9E64';
  return `\u0001${color}\u0002${token}\u0003`;
 }).split(/(\u0001#[A-Fa-f0-9]{6}\u0002[^\u0003]*\u0003)/).map(part=>part.startsWith('\u0001')?`<span style="color:${part.slice(1,8)}">${esc(part.slice(9,-1))}</span>`:esc(part)).join('');
 const step=d=>flow?.steps.find(s=>s.id===d.id);
 const groupCount=Math.min(4,docs.length);
 const stage=d=>Math.floor(docs.indexOf(d)*groupCount/docs.length)+1;
 const groups=Array.from({length:groupCount},(_,i)=>docs.filter(d=>stage(d)===i+1));
 let selected=docs[0],filter=1,language='curl',requestController;
 const jump=target=>{target.setAttribute('tabindex','-1');target.focus({preventScroll:true});parent.scrollTo({top:parent.scrollY+frameElement.getBoundingClientRect().top+target.getBoundingClientRect().top+scrollY-128,behavior:'instant'});};
 document.title=title+' API · Complete Visual Architecture';
 const utility=document.querySelector('body > div');
 utility.querySelector('span.font-bold').textContent=title+' API · Complete Visual Architecture';
 utility.querySelector('.font-typewriter').textContent=`${docs.length} endpoints · /${resource}/*`;
 const board=$('miro-ui-board');
 board.querySelector('h2').textContent=`How Frontend Screens Map to ${title} Responses`;
 board.querySelector('h2+p').textContent='Follow the numbered task cards to see each interface action, endpoint, and response. Arrows show the reading order; calls are independent unless the guide specifies a dependency.';
 board.querySelector('strong').textContent=parent.location.origin;
 board.querySelector('strong').parentElement.nextElementSibling.textContent='Response examples · Documented API data';
 const canvas=board.querySelector(':scope > .grid');
 const cardTemplate=canvas.firstElementChild.cloneNode(true);
 canvas.replaceChildren();
 docs.forEach((d,i)=>{
  const card=cardTemplate.cloneNode(true),parts=card.children;
  const header=parts[0];header.firstElementChild.textContent=`TASK ${String(i+1).padStart(2,'0')} · ${step(d)?.title[0]||d.title}`;
  header.lastElementChild.textContent=d.method;
  header.style.flexWrap='wrap';header.style.gap='8px';
  const json=parts[1];json.querySelector('span').textContent=d.method+' '+d.path;
  json.querySelector('span:last-child').textContent=(d.responseStatus||200)+' · EXAMPLE';
  json.querySelector('pre').innerHTML=colored(d.responseSuccess);
  json.querySelector('pre').style.maxHeight='240px';json.querySelector('pre').style.overflow='auto';
  parts[2].textContent='↓ response → interface';
  parts[3].innerHTML=`<div><div class="flex items-center justify-between border-b border-black/10 pb-2 mb-3"><span class="text-[11px] font-bold text-[#1E1E1E]">${esc(step(d)?.title[0]||d.title)}</span></div><p class="text-xs text-[#555]" lang="my">${esc(step(d)?.detail[1]||d.titleMm)}</p><p class="text-xs text-[#555]" style="margin-top:12px">${esc(step(d)?.detail[0]||d.summary)}</p></div><button data-jump-endpoint="${esc(d.id)}" class="mt-3 w-full py-1.5 rounded-lg bg-[#1E1E1E] text-white text-[11px] font-semibold hover:bg-black transition">Test ${esc(d.method)} API →</button>`;
  canvas.append(card);
 });
 const tree=$('json-tree-board');tree.querySelector('h2').textContent=title+' Data Entities & Response Tree';
 tree.querySelector('h2+p').textContent='Choose an endpoint node to inspect its documented response records and field names.';
 tree.querySelector('.font-plex > span').textContent=`Root: ${title} API (${docs.length} routes)`;
 $('ybs-root-node').firstElementChild.textContent='/'+resource;
 $('ybs-root-node').lastElementChild.textContent=docs.length+' routes';
 if(resource.length>12){const root=$('ybs-root-node').firstElementChild;root.style.cssText='font-size:10px;line-height:1.3;max-width:64px;overflow-wrap:anywhere';}
 const nodeTemplate=$('tree-entity-list').firstElementChild.cloneNode(true);
 $('tree-entity-list').replaceChildren();
 docs.forEach((d,i)=>{
  const node=nodeTemplate.cloneNode(true);node.dataset.treeNode=d.id;
  node.classList.toggle('node-selected',i===0);node.setAttribute('aria-pressed',String(i===0));
  node.querySelector('.font-bold').textContent=d.path.replace('/'+resource,'')||'/';
  node.querySelector('.ml-1').textContent='';node.querySelector('.mt-0\\.5').textContent=d.method+' '+d.path;
  node.onclick=()=>showTree(d);$('tree-entity-list').append(node);
 });
 function showTree(d){
  document.querySelectorAll('.tree-node').forEach(n=>{n.classList.toggle('node-selected',n.dataset.treeNode===d.id);n.setAttribute('aria-pressed',String(n.dataset.treeNode===d.id));});
  const records=Array.isArray(d.responseSuccess)?d.responseSuccess.slice(0,3):[d.responseSuccess];
  $('tree-leaf-cards').innerHTML=records.map(record=>`<div class="dark-json-card p-3.5 text-[11px] leading-relaxed border-l-4 border-l-[#FF9E64]"><div class="text-[10px] text-white/45 mb-1 font-plex">${esc(d.method+' '+d.path)}</div><pre tabindex="0" style="max-height:280px;overflow:auto;white-space:pre-wrap;overflow-wrap:anywhere">${colored(record)}</pre></div>`).join('');
 }
 showTree(docs[0]);
 const lab=$('ybs-simulator');lab.querySelector('h2').textContent=`How to Call ${title} API Step-by-Step + Live Lab`;
 lab.querySelector('h2').previousElementSibling.textContent=`Board 03 · Developer Playbook & ${docs.length}-Endpoint Runner`;
 lab.querySelector('h2+p').textContent=`Inspect integration instructions or test any of the ${docs.length} endpoints live.`;
 const server=$('server-select');server.prepend(new Option('Current server · '+parent.location.origin,parent.location.origin,true,true));
 $('btn-run-chain').textContent='Demo Task Walkthrough';
 $('chain-banner').querySelector('span').textContent='Documented task walkthrough · No live requests';
 $('btn-run-chain').onclick=()=>{$('chain-banner').classList.remove('hidden');$('chain-log').innerHTML=docs.map((d,i)=>`<div>${i+1}. ${esc(d.method+' '+d.path+' → '+(step(d)?.detail[0]||d.summary))}</div>`).join('');};
 $('btn-close-chain').onclick=()=>$('chain-banner').classList.add('hidden');
 $('btn-show-all-stages').previousElementSibling.textContent=`Choose a Task Group (${docs.length} endpoints)`;
 $('btn-show-all-stages').textContent=`Show All ${docs.length} Endpoints`;
 $('btn-show-all-stages').onclick=()=>{filter='ALL';updateStages();renderList();};
 const pipelineTemplate=$('pipeline-steps').firstElementChild.cloneNode(true);$('pipeline-steps').replaceChildren();
 groups.forEach((items,i)=>{
  const button=pipelineTemplate.cloneNode(true);button.dataset.pipelineStage=String(i+1);
  button.querySelector('span').textContent='GROUP '+String(i+1).padStart(2,'0');button.querySelector('span:last-child').textContent=items.length+' routes';
  button.querySelector('.font-bold.text-sm').textContent=step(items[0])?.title[0]||items[0].title;
  button.lastElementChild.textContent=items.map(d=>d.path).join(' · ');
  button.onclick=()=>{filter=i+1;select(items[0]);};$('pipeline-steps').append(button);
 });
 $('ybs-search').placeholder=`Filter ${title} endpoints…`;$('ybs-search').setAttribute('aria-label','Find an endpoint');$('ybs-search').oninput=renderList;
 const methodBadge=$('detail-path').previousElementSibling;
 function updateStages(){document.querySelectorAll('.pipeline-card').forEach(b=>{const active=Number(b.dataset.pipelineStage)===filter;b.style.borderColor=active?'#E7E678':'rgba(255,255,255,.15)';b.style.background=active?'#2B2B2B':'#252525';b.setAttribute('aria-pressed',String(active));});}
 function renderList(){
  const query=$('ybs-search').value.trim().toLowerCase();
  const items=docs.filter(d=>(filter==='ALL'||stage(d)===filter)&&(d.path+' '+d.title).toLowerCase().includes(query));
  $('ybs-endpoint-list').innerHTML=items.map(d=>`<button data-endpoint="${esc(d.id)}" aria-pressed="${selected===d}" class="w-full text-left p-3 rounded-lg mb-1.5 transition border ${selected===d?'bg-[#323232] border-[#E7E678] text-white':'bg-transparent border-transparent hover:bg-white/5 text-white/80'}"><div class="flex items-center justify-between gap-2"><span class="text-xs font-semibold truncate">${esc(d.title)}</span><span class="px-1.5 py-0.5 rounded bg-[#E7E678] text-[#1E1E1E] font-bold text-[10px] font-plex shrink-0">${esc(d.method)}</span></div><div class="font-plex text-[11px] text-white/55 truncate mt-1">${esc(d.path)}</div></button>`).join('')||'<p class="text-xs text-white/50 p-4">No matching endpoints. Change the search or task group.</p>';
 }
 function url(){let path=selected.path;const query=new URLSearchParams();document.querySelectorAll('.ybs-param-input').forEach(input=>{if(input.dataset.in==='path')path=path.replace(':'+input.dataset.name,encodeURIComponent(input.value));else if(input.value)query.set(input.dataset.name,input.value);});return $('server-select').value+path+(query.size?'?'+query:'');}
 function snippet(){
  const endpoint=url(),quoted=JSON.stringify(endpoint),method=selected.method;
  const body=$('resource-body')?.value;
  const options={method};if(body){options.headers={'Content-Type':'application/json'};options.body=body;}
  let code;
  if(language==='curl')code=`curl -X ${method} '${endpoint.replaceAll("'","'\\''")}'`+(body?` -H 'Content-Type: application/json' --data '${body.replaceAll("'","'\\''")}'`:'');
  else if(language==='fetch')code=`const res = await fetch(${quoted}, ${JSON.stringify(options,null,2)});\nconst data = await res.${selected.responseContentType==='text/plain'?'text':'json'}();\nconsole.log(data);`;
  else code=`using var http = new HttpClient();\nusing var request = new HttpRequestMessage(HttpMethod.${method[0]+method.slice(1).toLowerCase()}, ${quoted});\n`+(body?`request.Content = new StringContent(${JSON.stringify(body)}, System.Text.Encoding.UTF8, "application/json");\n`:'')+'using var response = await http.SendAsync(request);\nConsole.WriteLine(await response.Content.ReadAsStringAsync());';
  $('code-preview').textContent=code;
 }
 function sample(){$('response-status-badge').textContent=`${selected.responseStatus||200} · Documented Sample`;$('response-preview').textContent=text(selected.responseSuccess);}
 function select(d){
  requestController?.abort();selected=d;updateStages();renderList();methodBadge.textContent=d.method;
  $('btn-send-live').disabled=false;
  $('detail-stage-badge').textContent='Group '+String(stage(d)).padStart(2,'0');$('detail-title').textContent=d.title;$('detail-title-mm').textContent=d.titleMm;$('detail-path').textContent=d.path;
  $('detail-desc').textContent=step(d)?.detail[0]||d.summary;$('detail-howto').textContent=flow?.note?.[0]||'Use the documented parameters. Reuse available data and call other endpoints when needed.';
  $('detail-path').parentElement.parentElement.previousElementSibling.textContent=d.titleMm;
  $('detail-stage-badge').nextElementSibling.textContent=d.responseContentType||'application/json';
  $('detail-params-container').classList.toggle('hidden',!(d.params?.length||d.requestBody));
  $('detail-params-fields').innerHTML=(d.params||[]).map((p,i)=>`<div class="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center"><label for="resource-param-${i}" class="sm:col-span-4 text-xs font-plex text-white/80">${esc(p.name)} (${esc(p.in)})</label><input id="resource-param-${i}" data-name="${esc(p.name)}" data-in="${esc(p.in)}" value="${esc(p.example??'')}" class="ybs-param-input sm:col-span-8 bg-[#161616] border border-white/15 rounded px-2.5 py-1.5 text-xs font-plex text-white focus:outline-none focus:border-[#E7E678]"></div>`).join('')+(d.requestBody?`<label for="resource-body" class="text-xs text-white/80">JSON body</label><textarea id="resource-body" rows="5" class="w-full bg-[#161616] border border-white/15 rounded px-2.5 py-1.5 text-xs font-plex text-white">${esc(JSON.stringify(d.requestBody,null,2))}</textarea>`:'');
  $('detail-params-fields').oninput=snippet;snippet();sample();
 }
 document.addEventListener('click',event=>{
  const link=event.target.closest('a[href^="#"]');if(link){const target=$(link.getAttribute('href').slice(1));if(target){event.preventDefault();jump(target);}}
  const button=event.target.closest('[data-endpoint],[data-jump-endpoint]');if(button){const d=docs.find(d=>d.id===(button.dataset.endpoint||button.dataset.jumpEndpoint));if(d){if(button.dataset.jumpEndpoint){filter='ALL';$('ybs-search').value='';}select(d);if(button.dataset.jumpEndpoint)jump(lab);}}
  const tab=event.target.closest('.code-tab');if(tab){language=tab.dataset.lang;document.querySelectorAll('.code-tab').forEach(b=>{b.style.background=b===tab?'#2E2E2E':'transparent';b.setAttribute('aria-pressed',String(b===tab));});snippet();}
 });
 $('server-select').onchange=snippet;$('btn-reset-sample').onclick=sample;
 $('btn-send-live').onclick=async()=>{
  const d=selected,controller=new AbortController();requestController=controller;const options={method:d.method,signal:controller.signal};
  if($('resource-body')){try{options.body=JSON.stringify(JSON.parse($('resource-body').value));options.headers={'Content-Type':'application/json'};}catch{$('response-status-badge').textContent='Invalid JSON body';return;}}
  $('btn-send-live').disabled=true;$('response-status-badge').textContent='Sending request…';const timer=setTimeout(()=>controller.abort(),30000);
  try{const response=await fetch(url(),options),body=await response.text();if(selected!==d||requestController!==controller)return;$('response-status-badge').textContent=`${response.status} ${response.statusText} · Live Response`;try{$('response-preview').textContent=JSON.stringify(JSON.parse(body),null,2);}catch{$('response-preview').textContent=body;}}
  catch(error){if(selected===d&&requestController===controller){$('response-status-badge').textContent='Request failed';$('response-preview').textContent=error.name==='AbortError'?'Request timed out or was cancelled.':'Could not reach the server. Check connectivity and try again.';}}
  finally{clearTimeout(timer);if(requestController===controller)$('btn-send-live').disabled=false;}
 };
 const copy=async(value,button)=>{try{await navigator.clipboard.writeText(value);button.textContent='Copied';}catch{button.textContent='Copy unavailable';}};
 $('btn-copy-url').onclick=e=>copy(url(),e.currentTarget);$('btn-copy-code').onclick=e=>copy($('code-preview').textContent,e.currentTarget);
 select(docs[0]);
 // Match the source document's height to the surrounding documentation shell.
 const report=()=>{const height=Math.ceil(lab.getBoundingClientRect().bottom+scrollY+parseFloat(getComputedStyle(lab).marginBottom)+parseFloat(getComputedStyle(document.body).paddingBottom));parent.postMessage({type:'ybs-reference-height',height},parent.location.origin);};
 new ResizeObserver(report).observe(document.body);addEventListener('resize',report);addEventListener('load',report);document.fonts.ready.then(report);report();
})();
