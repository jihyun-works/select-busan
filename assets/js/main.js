const body=document.body,menu=document.querySelector('.mobile-menu'),menuButton=document.querySelector('.menu-btn');
function setMenu(open){menu.classList.toggle('open',open);body.classList.toggle('menu-open',open);menu.setAttribute('aria-hidden',String(!open));menuButton.setAttribute('aria-expanded',String(open))}
menuButton.addEventListener('click',()=>setMenu(true));document.querySelector('.menu-close').addEventListener('click',()=>setMenu(false));menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
const modal=document.querySelector('.qr-modal');function setModal(open){modal.classList.toggle('open',open);body.classList.toggle('modal-open',open)}document.querySelector('.qr-open').addEventListener('click',()=>setModal(true));document.querySelector('.qr-close').addEventListener('click',()=>setModal(false));document.querySelector('.qr-close-btn').addEventListener('click',()=>setModal(false));modal.addEventListener('click',e=>{if(e.target===modal)setModal(false)});document.addEventListener('keydown',e=>{if(e.key==='Escape'){setModal(false);setMenu(false)}});

const collectorSlider=document.querySelector('.collector-grid'),sliderDots=[...document.querySelectorAll('.slider-dots button')];
if(collectorSlider&&matchMedia('(max-width:600px)').matches){
  const originalSlides=[...collectorSlider.children],firstClone=originalSlides[0].cloneNode(true),lastClone=originalSlides.at(-1).cloneNode(true);
  firstClone.setAttribute('aria-hidden','true');lastClone.setAttribute('aria-hidden','true');
  collectorSlider.append(firstClone);collectorSlider.prepend(lastClone);
  const goTo=(index,behavior='smooth')=>collectorSlider.scrollTo({left:collectorSlider.clientWidth*index,behavior});
  requestAnimationFrame(()=>goTo(1,'auto'));
  let loopTimer;
  collectorSlider.addEventListener('scroll',()=>{
    clearTimeout(loopTimer);
    const rawIndex=Math.round(collectorSlider.scrollLeft/collectorSlider.clientWidth);
    const dotIndex=(rawIndex-1+originalSlides.length)%originalSlides.length;
    sliderDots.forEach((dot,i)=>dot.classList.toggle('active',i===dotIndex));
    loopTimer=setTimeout(()=>{
      const index=Math.round(collectorSlider.scrollLeft/collectorSlider.clientWidth);
      if(index===0)goTo(originalSlides.length,'auto');
      if(index===originalSlides.length+1)goTo(1,'auto');
    },80)
  },{passive:true});
  sliderDots.forEach((dot,i)=>dot.addEventListener('click',()=>goTo(i+1)))
}

const collectionSelect=document.querySelector('.area-select select');
if(collectionSelect){
  const collectionAreas={
    haeundae:{area:'HAEUNDAE · GWANGALLI',character:'MOMI',type:'MOMENT COLLECTOR',color:'#f45f70',spots:[
      ['HAEUNDAE BEACH','assets/img/HAEUNDAE_BEACH.png'],['DONGBAEKSEOM ISLAND','assets/img/DONGBAEKSEOM_ISLAND.png'],['GWANGALLI BRIDGE','assets/img/GWANGALLI.png']]},
    ilgwang:{area:'ILGWANG · SONGJEONG',character:'WAY',type:'ROUTE COLLECTOR',color:'#006fe8',spots:[
      ['ILGWANG BEACH','assets/img/GWANGALLI.png'],['SONGJEONG BEACH','assets/img/HAEUNDAE_BEACH.png'],['CHEONGSAPO','assets/img/DONGBAEKSEOM_ISLAND.png']]},
    songdo:{area:'SONGDO · YEONGDO',character:'TORI',type:'STORY COLLECTOR',color:'#16a6a6',spots:[
      ['SONGDO BEACH','assets/img/DONGBAEKSEOM_ISLAND.png'],['HUINNYEOUL VILLAGE','assets/img/GWANGALLI.png'],['TAEJONGDAE','assets/img/HAEUNDAE_BEACH.png']]},
    dadaepo:{area:'DADEPO · MOLUNDAE',character:'LUMI',type:'LIGHT COLLECTOR',color:'#e9ad00',spots:[
      ['DADEPO BEACH','assets/img/HAEUNDAE_BEACH.png'],['MOLUNDAE','assets/img/GWANGALLI.png'],['AMISAN OBSERVATORY','assets/img/DONGBAEKSEOM_ISLAND.png']]}
  };
  collectionSelect.addEventListener('change',()=>{
    const selected=collectionAreas[collectionSelect.value];
    if(!selected)return;
    document.querySelector('.collection-area-name').textContent=selected.area;
    document.querySelector('.collection-character').textContent=selected.character;
    document.querySelector('.collection-character').style.color=selected.color;
    document.querySelector('.collection-type').textContent=selected.type;
    document.querySelectorAll('.collection-card').forEach((card,index)=>{
      const [spotName,imageSrc]=selected.spots[index];
      card.querySelector('h3').textContent=spotName;
      const image=card.querySelector(':scope > img');
      image.src=imageSrc;
      image.alt=spotName
    });
  })
}

const revealTargets=document.querySelectorAll('.section-heading,.steps>li,.area-grid>article,.collection-card,.collection-guide,.reward-hero,.receive,.exchange-strip,.reward-help,.collector-grid>a,.footer-title,.footer-characters,.footer-row');
if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver'in window){
  revealTargets.forEach((element,index)=>{element.classList.add('scroll-reveal');element.style.setProperty('--reveal-delay',`${(index%5)*55}ms`)});
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('is-visible',entry.isIntersecting)),{threshold:.12,rootMargin:'0px 0px -45px'});
  revealTargets.forEach(element=>revealObserver.observe(element))
}

const topButton=document.querySelector('.top-button');
const toggleTopButton=()=>topButton.classList.toggle('show',scrollY>500);
addEventListener('scroll',toggleTopButton,{passive:true});
toggleTopButton();
topButton.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}));
