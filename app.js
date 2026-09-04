const seedProperties=[
{id:1,title:"Modern 4-Bedroom Terrace",purpose:"sale",type:"House",location:"Maitama",price:185000000,beds:4,baths:5,area:"420 sqm",agent:"Amina Bello",phone:"08065919908",image:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",description:"A beautifully finished contemporary terrace with generous living spaces, fitted kitchen, parking and premium finishes."},
{id:2,title:"Luxury 3-Bedroom Apartment",purpose:"rent",type:"Apartment",location:"Wuse",price:6500000,beds:3,baths:3,area:"180 sqm",agent:"Ibrahim Musa",phone:"08035278191",image:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",description:"Bright, spacious apartment close to major business and lifestyle destinations in central Abuja."},
{id:3,title:"Jabi Waterfront Residence",purpose:"sale",type:"Apartment",location:"Jabi",price:95000000,beds:3,baths:4,area:"210 sqm",agent:"Daniel Okafor",phone:"09067859191",image:"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",description:"Premium apartment with modern interiors and easy access to Jabi Lake and surrounding amenities."},
{id:4,title:"Executive 5-Bedroom Duplex",purpose:"sale",type:"Duplex",location:"Asokoro",price:320000000,beds:5,baths:6,area:"650 sqm",agent:"Sarah Adeyemi",phone:"08135572790",image:"https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",description:"Elegant detached duplex in a quiet Asokoro neighbourhood, featuring spacious rooms and private outdoor space."},
{id:5,title:"Furnished 2-Bedroom Shortlet",purpose:"shortlet",type:"Apartment",location:"Gwarinpa",price:120000,beds:2,baths:2,area:"120 sqm",agent:"Chinedu Eze",phone:"08036101981",image:"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",description:"Fully furnished shortlet with Wi-Fi, smart TV, fitted kitchen and secure parking."},
{id:6,title:"Prime Residential Land",purpose:"sale",type:"Land",location:"Katampe",price:75000000,beds:0,baths:0,area:"600 sqm",agent:"Maryam Yusuf",phone:"09033829090",image:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",description:"Well-positioned residential plot in a fast-developing premium district of Abuja."},
{id:7,title:"Serviced 1-Bedroom Apartment",purpose:"rent",type:"Apartment",location:"Life Camp",price:3500000,beds:1,baths:2,area:"95 sqm",agent:"Tunde James",phone:"08036919527",image:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",description:"Neat serviced apartment with modern fittings and excellent access to Life Camp and Gwarinpa."},
{id:8,title:"Family 4-Bedroom Home",purpose:"rent",type:"House",location:"Lugbe",price:4500000,beds:4,baths:4,area:"350 sqm",agent:"Grace Peter",phone:"08107774744",image:"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",description:"Comfortable family home with large rooms, parking and a secure compound."},
{id:9,title:"Premium Office Space",purpose:"rent",type:"Commercial",location:"Garki",price:9000000,beds:0,baths:2,area:"260 sqm",agent:"Michael Obi",phone:"07071401974",image:"https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",description:"Professional office suite suitable for corporate teams, consultants and service businesses."}
];

let properties=JSON.parse(localStorage.getItem("apf_properties")||"null")||seedProperties;
let favourites=JSON.parse(localStorage.getItem("apf_favourites")||"[]");
let currentPurpose="all", currentResults=properties;

const naira=n=>n>=1000000?"₦"+(n/1000000).toFixed(n%1000000?1:0)+"m":n>=1000?"₦"+(n/1000).toFixed(0)+"k":"₦"+n;
const formatPrice=p=>p.purpose==="sale"?naira(p.price):naira(p.price)+ (p.purpose==="shortlet"?"/night":"/year");
function save(){localStorage.setItem("apf_properties",JSON.stringify(properties));localStorage.setItem("apf_favourites",JSON.stringify(favourites));}
function render(list=properties){
 currentResults=list;
 const grid=document.getElementById("propertyGrid"), empty=document.getElementById("emptyState");
 grid.innerHTML="";
 empty.hidden=list.length>0;
 list.forEach(p=>{
   const saved=favourites.includes(p.id);
   grid.insertAdjacentHTML("beforeend",`<article class="property-card"><div class="property-img" style="background-image:url('${p.image}')"><span class="badge">${p.purpose==="sale"?"For Sale":p.purpose==="rent"?"For Rent":"Short Let"}</span><button class="heart ${saved?"saved":""}" onclick="toggleFav(${p.id},event)">${saved?"♥":"♡"}</button></div><div class="property-body"><h3>${p.title}</h3><div class="property-meta"><span>${p.beds?p.beds+" beds":"Land"}</span><span>${p.baths?p.baths+" baths":""}</span><span>${p.area}</span></div><div class="property-price">${formatPrice(p)}</div><div class="property-location">⌖ ${p.location}, Abuja</div><button class="text-link" style="border:0;background:none;padding:12px 0 0;cursor:pointer" onclick="openProperty(${p.id})">View property →</button></div></article>`);
 });
 document.getElementById("favCount").textContent=favourites.length;
}
function toggleFav(id,e){e.stopPropagation();favourites=favourites.includes(id)?favourites.filter(x=>x!==id):[...favourites,id];save();render(currentResults);}
function openProperty(id){
 const p=properties.find(x=>x.id===id); if(!p)return;
 document.getElementById("propertyDetail").innerHTML=`<div class="detail-image" style="background-image:url('${p.image}')"></div><div class="detail-body"><div class="detail-grid"><div><p class="eyebrow dark">${p.purpose==="sale"?"FOR SALE":p.purpose==="rent"?"FOR RENT":"SHORT LET"} · ${p.type}</p><h2>${p.title}</h2><p>⌖ ${p.location}, Abuja</p><div class="detail-price">${formatPrice(p)}</div><div class="property-meta" style="margin-top:18px"><span>${p.beds?p.beds+" Bedrooms":""}</span><span>${p.baths?p.baths+" Bathrooms":""}</span><span>${p.area}</span></div><p>${p.description}</p></div><div class="agent-box"><strong>Contact agent</strong><h3>${p.agent}</h3><p>${p.phone}</p><a class="primary-btn" href="tel:${p.phone}">Call agent</a><a class="primary-btn" target="_blank" href="https://wa.me/234${p.phone.replace(/^0/,"")}?text=${encodeURIComponent("Hello "+p.agent+", I am interested in "+p.title+" in "+p.location+".")}">WhatsApp enquiry</a></div></div></div>`;
 document.getElementById("propertyModal").classList.add("open");
}
function search(){
 const loc=document.getElementById("searchLocation").value,type=document.getElementById("searchType").value,beds=Number(document.getElementById("searchBeds").value||0),max=Number(document.getElementById("searchPrice").value||Infinity);
 const list=properties.filter(p=>(currentPurpose==="all"||p.purpose===currentPurpose)&&(!loc||p.location===loc)&&(!type||p.type===type)&&(!beds||p.beds>=beds)&&(p.price<=max));
 render(list);document.getElementById("properties").scrollIntoView({behavior:"smooth"});
}
document.querySelectorAll(".search-tabs button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".search-tabs button").forEach(x=>x.classList.remove("active"));b.classList.add("active");currentPurpose=b.dataset.purpose});
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");currentPurpose=b.dataset.filter;search()});
document.getElementById("searchBtn").onclick=search;
document.getElementById("viewAll").onclick=e=>{e.preventDefault();currentPurpose="all";document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));document.querySelector('.filter[data-filter="all"]').classList.add("active");render(properties)};
document.querySelectorAll(".location-card").forEach(b=>b.onclick=()=>{document.getElementById("searchLocation").value=b.dataset.location;search()});
document.getElementById("openList").onclick=()=>document.getElementById("listModal").classList.add("open");
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>b.closest(".modal").classList.remove("open"));
document.querySelectorAll(".modal").forEach(m=>m.onclick=e=>{if(e.target===m)m.classList.remove("open")});
document.getElementById("listForm").onsubmit=e=>{e.preventDefault();const d=new FormData(e.target);let submissions=JSON.parse(localStorage.getItem("apf_submissions")||"[]");submissions.push({...Object.fromEntries(d),date:new Date().toISOString()});localStorage.setItem("apf_submissions",JSON.stringify(submissions));e.target.reset();document.getElementById("listModal").classList.remove("open");toast("Property submitted successfully. Our team will follow up.");};
document.getElementById("contactForm").onsubmit=e=>{e.preventDefault();e.target.reset();toast("Thanks — your enquiry has been received.");};
document.getElementById("favNav").onclick=()=>{render(properties.filter(p=>favourites.includes(p.id)));document.getElementById("properties").scrollIntoView({behavior:"smooth"})};
document.getElementById("menuBtn").onclick=()=>document.getElementById("mainNav").classList.toggle("mobile-open");
function toast(msg){const t=document.createElement("div");t.className="toast";t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),3000)}
render();
