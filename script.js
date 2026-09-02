const cover = document.getElementById('cover');
const openBtn = document.getElementById('openBtn');
const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

async function startMusic() {
  try {
    music.volume = 0;
    await music.play();
    musicToggle.classList.add('playing');
    let v = 0;
    const fade = setInterval(() => {
      v += 0.04;
      music.volume = Math.min(v, 0.72);
      if (v >= 0.72) clearInterval(fade);
    }, 90);
  } catch (e) {}
}

openBtn.addEventListener('click', function () {
  if (cover.classList.contains('transitioning')) return;

  cover.classList.add('transitioning');
  startMusic();

  setTimeout(function () {
    document.getElementById('inicio').scrollIntoView({ behavior: 'auto' });
  }, 1500);

  setTimeout(function () {
    cover.classList.add('dream-out');
  }, 2050);
});

musicToggle.addEventListener('click', async function () {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.classList.add('playing');
    } catch(e) {}
  } else {
    music.pause();
    musicToggle.classList.remove('playing');
  }
});

const target = new Date('2026-10-10T12:00:00-06:00').getTime();
function updateCountdown(){
  const diff = target - Date.now();
  const safe = Math.max(diff, 0);
  const days = Math.floor(safe / 86400000);
  const hours = Math.floor((safe % 86400000) / 3600000);
  const minutes = Math.floor((safe % 3600000) / 60000);
  const seconds = Math.floor((safe % 60000) / 1000);
  document.getElementById('days').textContent = String(days).padStart(2,'0');
  document.getElementById('hours').textContent = String(hours).padStart(2,'0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2,'0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown,1000);

document.querySelectorAll('.page .content').forEach(el => el.classList.add('reveal'));
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
},{threshold:.18});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


// Galería deslizable de Karol
(function(){
  const track=document.querySelector('.gallery-track');
  const viewport=document.querySelector('.gallery-viewport');
  const slides=document.querySelectorAll('.gallery-slide');
  const dots=document.querySelectorAll('.gallery-dots button');
  const prev=document.querySelector('.gallery-prev');
  const next=document.querySelector('.gallery-next');
  if(!track || !slides.length) return;
  let index=0, startX=0, deltaX=0, dragging=false;
  function go(i){
    index=(i+slides.length)%slides.length;
    track.style.transform=`translateX(-${index*100}%)`;
    dots.forEach((d,n)=>d.classList.toggle('active',n===index));
  }
  prev?.addEventListener('click',()=>go(index-1));
  next?.addEventListener('click',()=>go(index+1));
  dots.forEach((d,n)=>d.addEventListener('click',()=>go(n)));
  viewport.addEventListener('pointerdown',e=>{dragging=true;startX=e.clientX;deltaX=0;viewport.setPointerCapture?.(e.pointerId)});
  viewport.addEventListener('pointermove',e=>{if(dragging) deltaX=e.clientX-startX});
  viewport.addEventListener('pointerup',e=>{if(!dragging)return;dragging=false;if(Math.abs(deltaX)>45)go(index+(deltaX<0?1:-1));deltaX=0});
  viewport.addEventListener('pointercancel',()=>{dragging=false;deltaX=0});
})();
