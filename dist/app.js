'use strict';
let books=[],category='All books',expanded=false;
const $=id=>document.getElementById(id),categories=["All books", "ABC & Number Books", "Activity Books", "Brain Books", "Coloring Books · Ages 3–7", "Coloring Books · Ages 3–8", "Coloring Books · Ages 4–8", "Coloring Books · Ages 6–10", "Coloring Books · Ages 7–13", "Comic Books", "Math Books", "Story Books"];
function el(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;}
function price(b){return b.price===null?'Price coming soon':new Intl.NumberFormat('en-IQ',{style:'currency',currency:b.currency||'IQD',maximumFractionDigits:0}).format(b.price);}
function render(){
 const query=$('search').value.toLocaleLowerCase().trim(),age=$('age').value;
 let matches=books.filter(b=>(category==='All books'||b.category===category)&&(!query||`${b.title} ${b.category} ${b.description}`.toLocaleLowerCase().includes(query))&&(age==='all'||(b.ages&&Number(age)>=Number(b.ages.split('–')[0])&&Number(age)<=Number(b.ages.split('–')[1]))));
 if($('sort').value==='az')matches.sort((a,b)=>a.title.localeCompare(b.title));
 const shown=expanded?matches:matches.slice(0,8);$('books').replaceChildren();
 for(const b of shown){const card=el('button','book-card');card.type='button';card.setAttribute('aria-label',`View ${b.title}`);const stage=el('div','book-stage'),img=el('img');img.src=b.image;img.alt=`${b.title} ${b.previewNote?'title page':'front cover'}`;img.loading='lazy';img.width=220;img.height=290;stage.append(img);if(b.previewNote)stage.append(el('span','preview-chip',b.previewNote));card.append(stage,el('span','book-type',b.category),el('h3','',b.title));const bottom=el('div','book-bottom');bottom.append(el('span','',b.ages?`Ages ${b.ages}`:'Adventure collection'),el('span','book-price',price(b)));const link=el('span','book-details-link','Discover this book');link.append(el('span','','↗'));card.append(bottom,link);card.onclick=()=>openBook(b);$('books').append(card);}
 $('result-count').textContent=`${matches.length} ${matches.length===1?'book':'books'}${category==='All books'?' in the collection':''} · Showing ${shown.length}`;
 $('empty').hidden=matches.length!==0;$('show-more').hidden=expanded||matches.length<=8;
 document.querySelectorAll('#filters button').forEach(n=>n.setAttribute('aria-pressed',String(n.dataset.category===category)));
}
function choose(c){category=c;expanded=false;render();}
function openBook(b){const wrap=$('dialog-content');wrap.replaceChildren();const cover=el('div','modal-cover'),img=el('img');img.src=b.image;img.alt=`${b.title} preview`;cover.append(img);const copy=el('div','modal-copy'),title=el('h2','',b.title);title.id='dialog-title';copy.append(el('p','eyebrow',b.category),title,el('p','',b.description));const tags=el('div','modal-tags');tags.append(el('span','','LUMO Books'),el('span','',b.ages?`Ages ${b.ages}`:'Age guide to be confirmed'));copy.append(tags,el('div','modal-price',price(b)),el('p','small-note','Catalogue preview. Ordering details will be announced when available.'));if(b.previewNote)copy.append(el('p','small-note','This preview shows the title page from the supplied interior.'));const related=el('button','button outline','Explore this collection →');related.onclick=()=>{closeBook();choose(b.category);$('catalogue').scrollIntoView();};copy.append(related);wrap.append(cover,copy);$('book-dialog').showModal();document.body.classList.add('modal-open');}
function closeBook(){$('book-dialog').close();} $('close-dialog').onclick=closeBook;$('book-dialog').addEventListener('close',()=>document.body.classList.remove('modal-open'));$('book-dialog').addEventListener('click',e=>{if(e.target===$('book-dialog')){const r=$('book-dialog').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeBook();}});
for(const c of categories){const b=el('button','',c);b.type='button';b.dataset.category=c;b.setAttribute('aria-pressed',String(c===category));b.onclick=()=>choose(c);$('filters').append(b);}
for(const id of ['search','age','sort'])$(id).addEventListener(id==='search'?'input':'change',()=>{expanded=false;render();});
$('show-more').onclick=()=>{expanded=true;render();};$('reset').onclick=()=>{$('search').value='';$('age').value='all';$('sort').value='featured';choose('All books');};
document.querySelectorAll('.collection').forEach(b=>b.onclick=()=>{choose(b.dataset.category);$('catalogue').scrollIntoView();});
fetch('catalogue.json').then(r=>{if(!r.ok)throw Error('Catalogue unavailable');return r.json();}).then(data=>{books=data;render();}).catch(()=>{$('result-count').textContent='The bookshelf could not load. Please refresh to try again.';});

// Motion is optional and respects system preferences. All content remains visible without this enhancement.
const motionToggle=document.getElementById('motion-toggle');
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
let motionPaused=reduceMotion.matches;
try{motionPaused=motionPaused||localStorage.getItem('lumo-motion')==='paused';}catch{}
function setMotion(paused){motionPaused=paused;document.body.classList.toggle('motion-paused',paused);motionToggle.setAttribute('aria-pressed',String(paused));motionToggle.textContent=paused?'Play animation':'Pause animation';}
setMotion(motionPaused);
motionToggle.addEventListener('click',()=>{setMotion(!motionPaused);try{localStorage.setItem('lumo-motion',motionPaused?'paused':'playing');}catch{}});
reduceMotion.addEventListener('change',e=>setMotion(e.matches));
if('IntersectionObserver' in window){
 const reveals=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){e.target.classList.add('is-visible');reveals.unobserve(e.target);}},{threshold:0.08});
 document.querySelectorAll('.collection,.story-copy,.ways article,.closing h2').forEach((node,i)=>{node.classList.add('reveal');node.style.setProperty('--reveal-delay',`${i%3*80}ms`);reveals.observe(node);});
}
