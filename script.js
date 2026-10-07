const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let timer;

function showSlide(index){
  currentSlide = index;
  slides.forEach((s,i)=>s.classList.toggle('active', i===index));
  dots.forEach((d,i)=>d.classList.toggle('active', i===index));
}
function autoSlide(){ showSlide((currentSlide + 1) % slides.length); }
function startSlider(){ timer = setInterval(autoSlide, 5500); }
dots.forEach(dot => dot.addEventListener('click', ()=>{
  clearInterval(timer);
  showSlide(Number(dot.dataset.slide));
  startSlider();
}));
startSlider();

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuToggle.addEventListener('click', ()=>{
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const openModal = (title,text)=>{
  modalTitle.textContent = title;
  modalText.textContent = text;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
};
const closeModals = ()=>{
  document.querySelectorAll('.modal').forEach(m=>{m.classList.remove('open');m.setAttribute('aria-hidden','true');});
};
document.querySelectorAll('.modal-close,.modal-ok').forEach(b=>b.addEventListener('click',closeModals));
document.querySelectorAll('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m) closeModals();}));

const modalContent = {
  programacion: ['Programación de riego','Aquí se publicarán los turnos, sectores y horarios de distribución definidos por ASOTOQUECHA. Esta sección queda preparada para incorporar una programación real.'],
  tramites: ['Solicitudes y trámites','Aquí se podrán consultar los requisitos, formatos y canales para presentar solicitudes ante la asociación.'],
  agua: ['Uso eficiente del agua','Se podrán publicar recomendaciones de manejo, mantenimiento de canales, prevención de pérdidas y buenas prácticas de riego.']
};
document.querySelectorAll('[data-modal]').forEach(btn=>btn.addEventListener('click',()=>{
  const [title,text]=modalContent[btn.dataset.modal];
  openModal(title,text);
}));
document.querySelectorAll('[data-doc]').forEach(btn=>btn.addEventListener('click',()=>{
  openModal(btn.dataset.doc,'El botón queda preparado para enlazar el documento PDF oficial correspondiente cuando sea cargado al sitio.');
}));

const portalModal = document.getElementById('portalModal');
document.getElementById('portalBtn').addEventListener('click',()=>portalModal.classList.add('open'));
document.getElementById('demoLogin').addEventListener('click',()=>{
  const user = document.getElementById('demoUser').value.trim();
  const note = document.getElementById('portalNote');
  if(!user){ note.textContent='Ingresa un usuario o número de documento para continuar.'; return; }
  note.textContent='Demostración: el acceso fue recibido. Para usuarios reales debe conectarse un sistema de autenticación y base de datos.';
});

document.getElementById('contactForm').addEventListener('submit',e=>{
  e.preventDefault();
  document.getElementById('formNote').textContent='Formulario validado. Para recibir mensajes realmente, debe conectarse a un servicio de correo o backend.';
  e.target.reset();
});

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const target=document.querySelector(a.getAttribute('href'));
  if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
}));
