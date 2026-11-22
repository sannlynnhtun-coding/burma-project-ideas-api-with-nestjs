(() => {
 const canvas=document.querySelector('#miro-ui-board > .grid');
 if(!canvas)return;
 canvas.id='ybs-ui-canvas';
 const cards=[...canvas.children];
 canvas.style.setProperty('--board-tablet-columns',Math.min(2,cards.length));
 canvas.style.setProperty('--board-desktop-columns',Math.min(4,cards.length));
 for(const card of cards){
  const caption=card.querySelector('.dark-json-card')?.nextElementSibling;
  if(caption){
   caption.classList.add('ybs-ui-connector-caption');
   const text=caption.firstChild;
   if(text?.nodeType===Node.TEXT_NODE)text.textContent=text.textContent.replace('↓','');
  }
 }
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
 svg.classList.add('ybs-graph-arrows');
 svg.setAttribute('aria-hidden','true');
 canvas.prepend(svg);
 let pending;
 const draw=()=>{
  pending=null;
  const bounds=canvas.getBoundingClientRect();
  if(!bounds.width)return;
  svg.setAttribute('viewBox',`0 0 ${bounds.width} ${bounds.height}`);
  const arrow=(path,x,y,dx,dy,attributes='')=>`<path class="ybs-graph-connector ybs-ui-arrow${attributes?' ybs-step-arrow':''}" ${attributes} d="${path}"/><path class="ybs-graph-terminal ybs-ui-arrow ybs-ui-terminal" d="M${x-dx*10},${y-dy*10} L${x},${y}" marker-end="url(#ybs-ui-arrowhead)"/>`;
  const paths=cards.map(card=>{
   const json=card.querySelector('.dark-json-card');
   const ui=json?.nextElementSibling?.nextElementSibling;
   if(!json||!ui)return '';
   const from=json.getBoundingClientRect(),to=ui.getBoundingClientRect();
   const x=from.left-bounds.left+16;
   const y=to.top-bounds.top;
   return arrow(`M${x},${from.bottom-bounds.top} V${y}`,x,y,0,1);
  });
  const steps=cards.slice(0,-1).map((card,index)=>{
   const from=card.getBoundingClientRect(),to=cards[index+1].getBoundingClientRect();
   let path,x,y,dx,dy;
   if(Math.abs(from.top-to.top)<2){
    const a=card.querySelector('.dark-json-card').getBoundingClientRect();
    const b=cards[index+1].querySelector('.dark-json-card').getBoundingClientRect();
    const x1=from.right-bounds.left,x2=to.left-bounds.left;
    const y1=(a.top+a.bottom)/2-bounds.top,y2=(b.top+b.bottom)/2-bounds.top;
    const mid=(x1+x2)/2;
    path=`M${x1},${y1} H${mid} V${y2} H${x2}`;
    x=x2;y=y2;dx=1;dy=0;
   }else{
    const x1=(from.left+from.right)/2-bounds.left;
    const x2=to.left-bounds.left+Math.min(72,to.width/2);
    const y1=from.bottom-bounds.top,y2=to.top-bounds.top;
    const mid=(y1+y2)/2;
    path=`M${x1},${y1} V${mid} H${x2} V${y2}`;
    x=x2;y=y2;dx=0;dy=1;
   }
   return arrow(path,x,y,dx,dy,`data-step-from="${index+1}" data-step-to="${index+2}"`);
  });
  svg.innerHTML=`<defs><marker id="ybs-ui-arrowhead" viewBox="0 0 8 8" refX="7" refY="4" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M1 1L7 4L1 7" fill="none" stroke="#C97A42" stroke-width="1.5"/></marker></defs>${paths.join('')}${steps.join('')}`;
 };
 const schedule=()=>{if(!pending)pending=requestAnimationFrame(draw);};
 const observer=new ResizeObserver(schedule);
 observer.observe(canvas);
 for(const card of cards)observer.observe(card);
 addEventListener('resize',schedule);
 document.fonts.ready.then(schedule);
 schedule();
})();
