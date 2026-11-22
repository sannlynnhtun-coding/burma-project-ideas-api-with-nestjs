(() => {
 const valid=['light','dark','mixed'];
 const apply=mode=>{if(valid.includes(mode)){document.documentElement.dataset.colorMode=mode;document.documentElement.style.colorScheme=mode==='dark'?'dark':'light';}};
 try{apply(parent.document.documentElement.dataset.colorMode||localStorage.getItem('bpi-theme')||'mixed');}catch{apply('mixed');}
 addEventListener('message',event=>{if(event.source===parent&&event.origin===parent.location.origin&&event.data?.type==='bpi-color-mode')apply(event.data.mode);});
})();
