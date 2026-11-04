
(function(){
 "use strict";
 const finder=document.querySelector("[data-finder]");
 if(!finder)return;
 const search=finder.querySelector("[data-search]");
 const cards=Array.from(finder.querySelectorAll("[data-product-card]"));
 const filters=Array.from(finder.querySelectorAll("[data-cat-btn]"));
 const more=finder.querySelector("[data-load-more]");
 const count=finder.querySelector("[data-result-count]");
 const empty=finder.querySelector("[data-empty]");
 const submit=document.querySelector("[data-search-form]");
 let category="all";
 let limit=Number(finder.dataset.initialLimit||"8");
 const baseLimit=limit;
 function normalize(s){return String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase("de").trim()}
 function update(){
  const q=normalize(search?search.value:"");
  const match=cards.filter(card=>(category==="all"||card.dataset.category===category)
   &&normalize(card.dataset.search+" "+card.textContent).includes(q));
  cards.forEach(card=>{card.hidden=true});
  match.slice(0,limit).forEach(card=>{card.hidden=false});
  if(count)count.textContent=match.length+" Treffer · "+Math.min(match.length,limit)+" sichtbar";
  if(empty)empty.hidden=match.length>0;
  if(more)more.hidden=match.length<=limit;
  filters.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.catBtn===category)));
 }
 filters.forEach(b=>b.addEventListener("click",()=>{category=b.dataset.catBtn||"all";limit=baseLimit;update()}));
 if(search)search.addEventListener("input",()=>{limit=baseLimit;update()});
 if(more)more.addEventListener("click",()=>{limit+=8;update()});
 if(submit)submit.addEventListener("submit",e=>{e.preventDefault();finder.scrollIntoView({block:"start"})});
 const params=new URLSearchParams(location.search);if(search&&params.has("q"))search.value=params.get("q")||"";
 const hash=(location.hash||"").replace("#","");
 if(["basics","mode","gaming","weihnachten"].includes(hash)){category=hash;limit=baseLimit}
 if(hash==="shop-basics")category="basics";
 if(hash==="shop-mode")category="mode";
 if(hash==="shop-gaming")category="gaming";
 if(hash==="shop-weihnachten")category="weihnachten";
 update();
})();
(function(){
 const target=(location.hash||"").slice(1);
 if(!/^ratgeber-\d+$/.test(target))return;
 const section=document.getElementById(target);
 if(section&&section.tagName==="DETAILS"){section.open=true;setTimeout(()=>section.scrollIntoView({block:"start"}),80)}
})();


/* Legacy anchors redirect: retain old shared FundFux links after the compact redesign. */
(function(){
 "use strict";
 if(location.pathname!=="/"&&!location.pathname.endsWith("/index.html"))return;
 const anchor=location.hash.slice(1).toLowerCase();
 const map={
 "weihnachten":"/katalog.html#weihnachten",
 "mob-gaming":"/katalog.html#gaming",
 "gaming":"/katalog.html#gaming",
 "gaming-varianten":"/katalog.html#gaming",
 "ratgeber":"/ratgeber.html",
 "ratgeber-uebersicht":"/ratgeber.html#ratgeber-uebersicht",
 "impressum":"/archiv.html#impressum",
 "datenschutz":"/archiv.html#datenschutz"
 };
 const target=map[anchor]||(/^ratgeber-\d+$/.test(anchor)?"/ratgeber.html#"+anchor:null);
 if(target)location.replace(target);
})();
