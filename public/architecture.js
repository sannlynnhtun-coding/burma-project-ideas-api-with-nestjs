let architectureTemplate;
async function renderArchitecture(doc){
 $('main').classList.add('ybs-reference-page');
 $('reference').innerHTML='<p class="muted">Loading visual architecture…</p>';
 $('console').innerHTML='';currentExample=null;
 closeMobileNav(false);$('copy-page-label').textContent='Copy page';
 try{
  architectureTemplate ||= fetch('/ybs/workflow.html').then(r=>{if(!r.ok)throw Error('Template unavailable');return r.text();});
  const template=await architectureTemplate;
  if(current.id!==doc.id)return;
  const config={resource:doc.resource,title:label(doc.resource),docs:groups.get(doc.resource),flow:RESOURCE_FLOWS[doc.resource]||null};
  const data=JSON.stringify(config).replaceAll('<','\\u003c');
  const source=template.replace(/<script>[\s\S]*?<\/script>/g,'').replace('</head>','<script type="application/json" id="architecture-data">'+data+'</script></head>').replace('<script src="/ybs/graph-arrows.js">','<script src="/architecture-runtime.js"></script><script src="/ybs/graph-arrows.js">');
  const frame=document.createElement('iframe');frame.id='ybs-reference-frame';frame.title=config.title+' Complete Visual Architecture';frame.srcdoc=source;
  $('reference').replaceChildren(frame);
 }catch(error){if(current.id===doc.id){$('reference').textContent='Could not load the architecture. Reload the page to try again.';architectureTemplate=null;}}
}
