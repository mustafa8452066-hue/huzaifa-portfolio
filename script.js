const burger=document.getElementById('burger'),menu=document.getElementById('menu');
burger.addEventListener('click',()=>menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));
const links=[...menu.querySelectorAll('a')],secs=links.map(a=>document.querySelector(a.getAttribute('href')));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-45% 0px -50% 0px'});
secs.forEach(s=>s&&io.observe(s));
const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');ro.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('section:not(.hero) > *, .card').forEach(el=>{el.classList.add('reveal');ro.observe(el)});

const hi=document.querySelector('.hero-img img');
if(hi&&matchMedia('(hover:hover)').matches){
 hi.addEventListener('mousemove',e=>{const r=hi.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;hi.style.transform=`rotateY(${x*14}deg) rotateX(${-y*14}deg) scale(1.05)`});
 hi.addEventListener('mouseleave',()=>hi.style.transform='');
}
