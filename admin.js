const seed=JSON.parse(localStorage.getItem("apf_properties")||"null");const properties=seed||[];
let currentEdit=null;
const naira=n=>n>=1000000?"₦"+(n/1000000).toFixed(n%1000000?1:0)+"m":n>=1000?"₦"+(n/1000).toFixed(0)+"k":"₦"+n;
const purposeLabel=x=>x==="sale"?"For Sale":x==="rent"?"For Rent":"Short Let";
function data(){return JSON.parse(localStorage.getItem("apf_properties")||"[]")}
function saveData(p){localStorage.setItem("apf_properties",JSON.stringify(p))}
function switchSection(id){document.querySelectorAll(".panel").forEach(x=>x.classList.remove("active"));document.getElementById(id).classList.add("active");document.querySelectorAll(".nav").forEach(x=>x.classList.toggle("active",x.dataset.section===id));document.getElementById("pageTitle").textContent=id==="overview"?"Dashboard overview":id==="properties"?"Property management":id==="submissions"?"Property submissions":"Platform settings";if(id==="properties")renderProperties();if(id==="submissions")renderSubmissions();if(id==="overview")renderOverview()}
document.querySelectorAll(".nav").forEach(n=>n.onclick=()=>switchSection(n.dataset.section));
function renderOverview(){const p=data(),subs=JSON.parse(localStorage.getItem("apf_submissions")||"[]"),f=JSON.parse(localStorage.getItem("apf_favourites")||"[]");document.getElementById("statProperties").textContent=p.length;document.getElementById("statSaved").textContent=f.length;document.getElementById("statSubmissions").textContent=subs.length;document.getElementById("statAreas").textContent=new Set(p.map(x=>x.location)).size;document.getElementById("recentTable").innerHTML=table(p.slice(-5).reverse())}
function table(list){if(!list.length)return "<p style='color:#7a857e'>No records yet.</p>";return `<table class="data-table"><thead><tr><th>Property</th><th>Location</th><th>Purpose</th><th>Price</th><th>Agent</th><th>Actions</th></tr></thead><tbody>${list.map(p=>`<tr><td><div style="display:flex;align-items:center;gap:10px"><img class="thumb" src="${p.image}"><strong>${p.title}</strong></div></td><td>${p.location}</td><td><span class="status">${purposeLabel(p.purpose)}</span></td><td>${naira(p.price)}</td><td>${p.agent}</td><td class="actions"><button onclick="editProperty(${p.id})">Edit</button><button class="delete" onclick="deleteProperty(${p.id})">Delete</button></td></tr>`).join("")}</tbody></table>`}
function renderProperties(){const q=(document.getElementById("adminSearch").value||"").toLowerCase(),pur=document.getElementById("adminPurpose").value;let p=data().filter(x=>(!q||[x.title,x.location,x.agent].join(" ").toLowerCase().includes(q))&&(!pur||x.purpose===pur));document.getElementById("propertyTable").innerHTML=table(p)}
document.getElementById("adminSearch").oninput=renderProperties;document.getElementById("adminPurpose").onchange=renderProperties;
function editProperty(id){const p=data().find(x=>x.id===id);if(!p)return;currentEdit=p;openEditor(p)}
function openEditor(p=null){document.getElementById("propertyEditor").classList.add("open");document.getElementById("editorTitle").textContent=p?"Edit property":"Add property";const f=document.getElementById("propertyForm");f.reset();if(p)Object.keys(p).forEach(k=>{if(f.elements[k])f.elements[k].value=p[k]})}
function closeEditor(){document.getElementById("propertyEditor").classList.remove("open");currentEdit=null}
document.getElementById("addBtn").onclick=()=>openEditor();
document.getElementById("propertyForm").onsubmit=e=>{e.preventDefault();const f=new FormData(e.target),obj=Object.fromEntries(f);obj.id=currentEdit?currentEdit.id:Date.now();["price","beds","baths"].forEach(k=>obj[k]=Number(obj[k]||0));let p=data();const i=p.findIndex(x=>x.id===obj.id);if(i>=0)p[i]=obj;else p.push(obj);saveData(p);closeEditor();renderOverview();renderProperties();toast(currentEdit?"Property updated":"Property added")};
function deleteProperty(id){if(!confirm("Delete this property?"))return;saveData(data().filter(x=>x.id!==id));renderOverview();renderProperties();toast("Property deleted")}
function renderSubmissions(){const s=JSON.parse(localStorage.getItem("apf_submissions")||"[]");document.getElementById("submissionTable").innerHTML=s.length?`<table class="data-table"><thead><tr><th>Date</th><th>Name</th><th>Property</th><th>Location</th><th>Phone</th><th>Details</th></tr></thead><tbody>${s.slice().reverse().map(x=>`<tr><td>${new Date(x.date).toLocaleDateString()}</td><td>${x.name}</td><td>${x.title}</td><td>${x.location}</td><td>${x.phone}</td><td>${x.details||"—"}</td></tr>`).join("")}</tbody></table>`:"<p style='color:#7a857e'>No submissions yet.</p>"}
document.getElementById("saveSettings").onclick=()=>{localStorage.setItem("apf_settings",JSON.stringify({name:document.getElementById("siteName").value,whatsapp:document.getElementById("siteWhatsapp").value,email:document.getElementById("siteEmail").value}));toast("Settings saved")};
document.getElementById("resetDemo").onclick=()=>{if(confirm("Reset all demo properties and submissions?")){localStorage.removeItem("apf_properties");localStorage.removeItem("apf_submissions");localStorage.removeItem("apf_favourites");location.reload()}}
function toast(msg){const t=document.createElement("div");t.className="toast";t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),2500)}
const toastStyle=document.createElement("style");toastStyle.textContent=".toast{position:fixed;right:20px;bottom:20px;background:#183a2a;color:#fff;padding:13px 18px;border-radius:8px;z-index:100}";document.head.appendChild(toastStyle);
renderOverview();


let selectedPropertyImage = "";

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("propertyImage");
  const preview = document.getElementById("imagePreview");
  const previewImg = document.getElementById("imagePreviewImg");
  const removeBtn = document.getElementById("removeImage");

  if (!input) return;

  input.addEventListener("change", () => {
    const file = input.files && input.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      input.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Please choose an image smaller than 5MB.");
      input.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = e => {
      selectedPropertyImage = e.target.result;
      previewImg.src = selectedPropertyImage;
      preview.hidden = false;
    };
    reader.readAsDataURL(file);
  });

  removeBtn?.addEventListener("click", () => {
    selectedPropertyImage = "";
    input.value = "";
    preview.hidden = true;
    previewImg.removeAttribute("src");
  });
});
