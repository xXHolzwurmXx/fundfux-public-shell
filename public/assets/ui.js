(()=>{const btn=document.querySelector('.menu-toggle'),nav=document.getElementById('navlinks');if(btn&&nav){btn.addEventListener('click',()=>{const open=nav.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));btn.textContent=open?'✕ Schließen':'☰ Menü';});nav.addEventListener('click',e=>{if(e.target.closest('a')){nav.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.textContent='☰ Menü';}});}
const input=document.getElementById('filter-input');if(input){const products=[...document.querySelectorAll('.product[data-search]')],counter=document.getElementById('filter-count');const render=()=>{const q=input.value.trim().toLocaleLowerCase('de');let visible=0;products.forEach(x=>{const match=x.dataset.search.includes(q);x.hidden=!match;if(match)visible++;});if(counter)counter.textContent=visible+' passende Einträge';};input.addEventListener('input',render);render();}})();

/* New homepage category finder: local-only. No tracking or network requests. */
(()=>{"use strict";
 const field=document.getElementById('ff19-search'), clear=document.getElementById('ff19-search-clear'),tiles=[...document.querySelectorAll('.ff19-tile')],status=document.getElementById('ff19-search-result'),empty=document.getElementById('ff19-no-results');
 if(!field||!tiles.length)return;
 function normalize(s){return (s||'').toLocaleLowerCase('de').normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
 function render(){const q=normalize(field.value.trim());let count=0;for(const tile of tiles){const hay=normalize((tile.dataset.search||'')+' '+tile.textContent);const match=!q||hay.includes(q);tile.hidden=!match;if(match)count++}clear.hidden=!q;status.textContent=q?count+' passende Produktwelten für „'+field.value.trim()+'“.':count+' Produktwelten entdecken.';empty.hidden=count!==0}
 field.addEventListener('input',render);clear.addEventListener('click',()=>{field.value='';render();field.focus()});render();
})();


/* FundFux Mission Control: fully client-side search; no tracking, requests or hidden affiliate calls. */
(()=>{"use strict";
const input=document.querySelector("#ff20-search"),popover=document.querySelector("#ff20-results"),clear=document.querySelector("#ff20-clear"),data=document.querySelector("#ff20-index");
if(!input||!popover||!data)return;
let entries=[];try{entries=JSON.parse(data.textContent)}catch(e){return}
const normalize=s=>String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase("de");
const categoryMap={"konsolen.html":"Konsolen","gaming.html":"Gaming","haushalt.html":"Technik & Haushalt","basics.html":"Amazon Basics","mode.html":"Mode","geschenke.html":"Geschenkideen"};
const allowed=new Set(Object.keys(categoryMap));
const safeLink=(page,query)=>page+"?q="+encodeURIComponent(query);
function render(){
 const q=input.value.trim(),key=normalize(q);
 clear.hidden=!q;
 if(!key){popover.hidden=true;input.setAttribute("aria-expanded","false");popover.replaceChildren();return}
 const ranked=entries.filter(e=>allowed.has(e.page)&&normalize(e.title+" "+e.detail+" "+categoryMap[e.page]).includes(key))
 .sort((a,b)=>{
   const rank=x=>{const title=normalize(x.title);if(key==='ps5'&&title==='playstation 5')return 0;if(title.startsWith(key))return 0;if(x.page==='konsolen.html'&&title.includes(key))return 1;if(title.includes(key))return 2;return 3};return rank(a)-rank(b)
 }).slice(0,6);
 popover.replaceChildren();
 if(!ranked.length){const empty=document.createElement("div");empty.className="ff20-suggest-none";empty.textContent="Kein passender Eintrag. Versuche „Gaming“, „Mode“ oder „PS5“.";popover.append(empty)}
 ranked.forEach(item=>{
 const a=document.createElement("a");a.href=safeLink(item.page,item.title);
 const name=document.createElement("span");name.textContent=item.title;
 const cat=document.createElement("small");cat.textContent=categoryMap[item.page]+" ↗";
 a.append(name,cat);popover.append(a);
 });
 popover.hidden=false;input.setAttribute("aria-expanded","true");
}
input.addEventListener("input",render);
input.addEventListener("keydown",e=>{if(e.key==="Enter"){const first=popover.querySelector("a");if(first&&!popover.hidden){e.preventDefault();location.href=first.href}}if(e.key==="Escape"){input.value="";render();input.blur()}});
clear.addEventListener("click",()=>{input.value="";render();input.focus()});
document.addEventListener("keydown",e=>{if(e.key==="/"&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)&&!e.ctrlKey&&!e.metaKey){e.preventDefault();input.focus()}});
document.addEventListener("click",e=>{if(!e.target.closest(".ff20-search-area")){popover.hidden=true;input.setAttribute("aria-expanded","false")}});
render();
})();
(()=>{
 const f=document.querySelector("#filter-input");if(!f)return;
 const q=new URLSearchParams(location.search).get("q");if(!q)return;
 if(q.length>160)return;
 f.value=q;f.dispatchEvent(new Event("input",{bubbles:true}));
})();
