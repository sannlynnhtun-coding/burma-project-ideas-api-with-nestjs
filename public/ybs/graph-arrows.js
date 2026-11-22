(() => {
 const canvas=document.getElementById('ybs-node-canvas');
 if(!canvas)return;
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
 svg.classList.add('ybs-graph-arrows');
 svg.setAttribute('aria-hidden','true');
 canvas.prepend(svg);
 let pending;
 const draw=()=>{
  pending=null;
  const bounds=canvas.getBoundingClientRect();
  if(!bounds.width)return;
  const desktop=matchMedia('(min-width:1024px)').matches;
  const box=element=>{const r=element.getBoundingClientRect();return {left:r.left-bounds.left,right:r.right-bounds.left,top:r.top-bounds.top,bottom:r.bottom-bounds.top,cx:(r.left+r.right)/2-bounds.left,cy:(r.top+r.bottom)/2-bounds.top};};
  const root=box(document.getElementById('ybs-root-node'));
  const selected=canvas.querySelector('.tree-node.node-selected');
  const paths=[];
  const add=(d,active,tip)=>{
   paths.push('<path class="ybs-graph-connector'+(active?' is-active':'')+'" d="'+d+'"/>');
   if(tip){const [x,y,direction]=tip;paths.push('<path class="ybs-graph-terminal'+(active?' is-active':'')+'" d="M'+(x-direction*10)+','+y+' H'+x+'" marker-end="url(#ybs-graph-'+(active?'active':'normal')+')"/>');}
  };
  const nodes=[...canvas.querySelectorAll('.tree-node')];
  const boxes=nodes.map(box);
  if(boxes.length){
   const rail=desktop?(root.right+boxes[0].left)/2:-10;
   const startX=desktop?root.right:root.left;
   const top=Math.min(root.cy,...boxes.map(b=>b.cy)),bottom=Math.max(root.cy,...boxes.map(b=>b.cy));
   add('M'+startX+','+root.cy+' H'+rail+' M'+rail+','+top+' V'+bottom,false);
   boxes.forEach((target,i)=>add('M'+rail+','+target.cy+' H'+target.left,nodes[i]===selected,[target.left,target.cy,1]));
  }
  if(selected){
   const start=box(selected),targets=[...document.querySelectorAll('#tree-leaf-cards > div')].map(box);
   if(targets.length){
    const rail=desktop?(start.right+targets[0].left)/2:bounds.width+10;
    const top=Math.min(start.cy,...targets.map(b=>b.cy)),bottom=Math.max(start.cy,...targets.map(b=>b.cy));
    add('M'+start.right+','+start.cy+' H'+rail+' M'+rail+','+top+' V'+bottom,true);
    targets.forEach(target=>{const x=desktop?target.left:target.right;add('M'+rail+','+target.cy+' H'+x,true,[x,target.cy,desktop?1:-1]);});
   }
  }
  svg.setAttribute('viewBox',`0 0 ${bounds.width} ${bounds.height}`);
  svg.innerHTML=`<defs>${[['normal','#7AA2F7'],['active','#FF9E64']].map(([id,color])=>`<marker id="ybs-graph-${id}" viewBox="0 0 8 8" refX="7" refY="4" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M1 1L7 4L1 7" fill="none" stroke="${color}" stroke-width="1.5"/></marker>`).join('')}</defs>${paths.join('')}`;
 };
 const schedule=()=>{if(!pending)pending=requestAnimationFrame(draw);};
 new ResizeObserver(schedule).observe(canvas);
 new MutationObserver(schedule).observe(document.getElementById('tree-entity-list'),{subtree:true,attributes:true,attributeFilter:['class']});
 new MutationObserver(schedule).observe(document.getElementById('tree-leaf-cards'),{childList:true});
 addEventListener('resize',schedule);
 document.fonts.ready.then(schedule);
 schedule();
})();
