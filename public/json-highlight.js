/* Highlight valid JSON only; preserve the response text and escape all markup. */
(() => {
 const seen=new WeakMap();
 const escape=value=>value.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function highlight(pre){
  const source=pre.textContent;
  const previous=seen.get(pre);
  if(previous?.source===source&&(!previous.valid||pre.innerHTML===previous.html))return;
  try{JSON.parse(source);}catch{seen.set(pre,{source,valid:false});pre.classList.remove('json-highlight');return;}
  const tokens=/"(?:\\.|[^"\\])*"|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|[{}\[\],:]/g;
  let html='',offset=0;
  for(const match of source.matchAll(tokens)){
   const token=match[0];html+=escape(source.slice(offset,match.index));
   const kind=token[0]==='"'?(source.slice(match.index+token.length).trimStart()[0]===':'?'key':'string'):/^(true|false)$/.test(token)?'boolean':token==='null'?'null':/^-?\d/.test(token)?'number':'punctuation';
   html+=`<span class="json-${kind}">${escape(token)}</span>`;offset=match.index+token.length;
  }
  html+=escape(source.slice(offset));pre.classList.add('json-highlight');pre.innerHTML=html;
  seen.set(pre,{source,valid:true,html:pre.innerHTML});
 }
 let scheduled=false;
 const scan=()=>{scheduled=false;document.querySelectorAll('pre').forEach(highlight);};
 const observer=new MutationObserver(()=>{if(!scheduled){scheduled=true;queueMicrotask(scan);}});
 observer.observe(document.documentElement,{childList:true,subtree:true,characterData:true});
 scan();
})();
