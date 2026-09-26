const movies = [
  {title:"Neon Horizon",year:2026,genre:"Sci-Fi",rating:"8.4",desc:"A courier crosses a neon megacity where a mysterious signal changes the course of one night.",c1:"#7c2438"},
  {title:"Last Protocol",year:2025,genre:"Action",rating:"8.1",desc:"An ex-agent races across borders to stop a stolen security protocol from going live.",c1:"#263f66"},
  {title:"After Midnight",year:2024,genre:"Drama",rating:"7.9",desc:"Two strangers meet during a citywide blackout and uncover a shared past.",c1:"#60422a"},
  {title:"Weekend Theory",year:2025,genre:"Comedy",rating:"7.6",desc:"A group of friends attempts the perfect weekend and creates a much bigger mess.",c1:"#526b32"},
  {title:"Red Circuit",year:2023,genre:"Action",rating:"8.0",desc:"A street racer is pulled into a dangerous underground competition.",c1:"#72251f"},
  {title:"Orbit Nine",year:2026,genre:"Sci-Fi",rating:"8.6",desc:"A deep-space crew receives a message that should be impossible.",c1:"#3e2a73"},
  {title:"Paper Skies",year:2024,genre:"Drama",rating:"7.8",desc:"An illustrator returns home and rebuilds a life through an unexpected friendship.",c1:"#68563b"},
  {title:"Roommates",year:2023,genre:"Comedy",rating:"7.3",desc:"Four very different roommates turn ordinary apartment life into chaos.",c1:"#395e63"}
];

const grid=document.querySelector("#movieGrid"), search=document.querySelector("#search"), empty=document.querySelector("#empty");
let genre="All";

function render(){
  const q=search.value.trim().toLowerCase();
  const list=movies.filter(m=>(genre==="All"||m.genre===genre)&&(!q||`${m.title} ${m.genre} ${m.year}`.toLowerCase().includes(q)));
  grid.innerHTML=list.map((m,i)=>`
    <article class="movie" data-i="${movies.indexOf(m)}">
      <div class="poster" style="--c1:${m.c1}">
        <div class="poster-title">${m.title}</div>
      </div>
      <div class="info"><div class="title">${m.title}<span class="rating">★ ${m.rating}</span></div><div class="meta">${m.year} • ${m.genre}</div></div>
    </article>`).join("");
  empty.classList.toggle("hidden",list.length>0);
  document.querySelectorAll(".movie").forEach(card=>card.onclick=()=>openModal(movies[card.dataset.i]));
}
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{
  document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
  b.classList.add("active"); genre=b.dataset.genre; render();
});
search.addEventListener("input",render);

const modal=document.querySelector("#modal"), content=document.querySelector("#modalContent");
function openModal(m){
  content.innerHTML=`<p class="eyebrow">${m.genre.toUpperCase()} • ${m.year}</p><h3>${m.title}</h3><p>${m.desc}</p><div class="tags"><span class="tag">★ ${m.rating}/10</span><span class="tag">${m.genre}</span><span class="tag">${m.year}</span></div>`;
  modal.classList.remove("hidden");modal.setAttribute("aria-hidden","false");
}
function closeModal(){modal.classList.add("hidden");modal.setAttribute("aria-hidden","true")}
document.querySelector("#close").onclick=closeModal;
modal.onclick=e=>{if(e.target===modal)closeModal()};
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
render();