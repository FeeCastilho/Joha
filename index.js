/* ============================================================
   JÔHA · index.js — interações da landing page
   (.js-anim é adicionado inline no <head> para evitar flash)
   ============================================================ */
(function(){
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- menu mobile ---- */
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  if(burger && navLinks){
    burger.addEventListener('click', ()=>navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>navLinks.classList.remove('open')));
  }

  /* ---- palavra cinética (especialidades) ---- */
  const rot = document.getElementById('rotWord');
  if(rot && !reduce){
    const words = ['tratamento capilar','saúde do couro cabeludo','coloração terapêutica','cortes com essência'];
    let i = 0;
    setInterval(()=>{
      i = (i+1) % words.length;
      rot.classList.add('swap');
      setTimeout(()=>{ rot.textContent = words[i]; rot.classList.remove('swap'); }, 450);
    }, 2600);
  }

  /* ---- scroll reveals ---- */
  const revealSel = '.manifesto .leaf-rule, .manifesto p, #pilares .sec-head, .pillar, .prices .head-row, .price-item, .price-note, .club-head > div:first-child, .club-card, #equipe .sec-head, .member, #visite .ph, #visite .eyebrow, #visite h2, #visite .info-row, .ig .eyebrow, .ig h2, .ig p, .ig .ph, .ig .btn, .cta-final .seal, .cta-final h2, .cta-final p, .cta-final > .wrap > div:last-child';
  const revs = [...document.querySelectorAll(revealSel)];
  if(!reduce){
    revs.forEach(el=>el.classList.add('reveal'));
    const seen = new Map();
    revs.forEach(el=>{
      const p = el.parentElement;
      const n = (seen.get(p)||0); seen.set(p, n+1);
      el.style.transitionDelay = Math.min(n*70, 420) + 'ms';
    });
    if('IntersectionObserver' in window){
      const io = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
      }, {rootMargin:'0px 0px -10% 0px', threshold:0.12});
      revs.forEach(el=>io.observe(el));
    } else {
      revs.forEach(el=>el.classList.add('in'));
    }
  }

  /* ---- progresso + nav + parallax ---- */
  const prog = document.getElementById('prog');
  const nav = document.querySelector('.nav');
  const arch = document.querySelector('.hero .arch');
  let ticking = false;
  function onScroll(){
    const y = window.scrollY;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if(prog) prog.style.width = (h>0 ? (y/h*100) : 0) + '%';
    if(nav) nav.classList.toggle('scrolled', y > 60);
    if(!reduce && arch) arch.style.transform = 'translateY(' + (y * 0.06) + 'px)';
    ticking = false;
  }
  window.addEventListener('scroll', ()=>{ if(!ticking){ requestAnimationFrame(onScroll); ticking = true; } }, {passive:true});
  onScroll();

  /* ---- failsafe: garante hero visível mesmo se a animação não rodar ---- */
  window.addEventListener('load', ()=>setTimeout(()=>document.documentElement.classList.add('anim-ready'), 2200));
})();
