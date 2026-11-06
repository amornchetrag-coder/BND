const products = [
{id:"BND-001",brand:"Nike",name:"Air Force 1 '07",category:"Everyday Icon",price:3790,tag:"BESTSELLER",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85"},
{id:"BND-002",brand:"Adidas",name:"Samba OG",category:"Terrace Classic",price:3800,tag:"CULT CLASSIC",image:"https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=85"},
{id:"BND-003",brand:"New Balance",name:"9060",category:"Modern Lifestyle",price:5690,tag:"EDITOR'S PICK",image:"https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=85"},
{id:"BND-004",brand:"ASICS",name:"GEL-1130",category:"Sport Heritage",price:3900,tag:"DAILY RUNNER",image:"https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1000&q=85"},
{id:"BND-005",brand:"Converse",name:"Chuck Taylor All Star Hi",category:"Canvas Essential",price:2290,tag:"WARDROBE STAPLE",image:"https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=1000&q=85"},
{id:"BND-006",brand:"Nike",name:"Dunk Low",category:"Street Essential",price:4290,tag:"STREET FAVORITE",image:"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=85"}
];
let bag = [];
let activeFilter = "All";
const grid = document.getElementById("productGrid");
const money = n => "฿" + Math.round(n).toLocaleString("en-US");
function renderProducts(){
 let shown = products.filter(p => activeFilter==="All" || p.brand===activeFilter);
 const sort = document.getElementById("sortSelect").value;
 if(sort==="low") shown.sort((a,b)=>a.price-b.price);
 if(sort==="high") shown.sort((a,b)=>b.price-a.price);
 grid.innerHTML = shown.map(p=>`<article class="product-card"><div class="product-image"><img loading="lazy" src="${p.image}" alt="${p.brand} ${p.name} sneakers"><span class="product-tag">${p.tag}</span><button class="quick-add" data-add="${p.id}">+ ADD TO BAG</button></div><div class="product-info"><div><div class="product-brand">${p.brand}</div><h3 class="product-name">${p.name}</h3><div class="product-category">${p.category}</div></div><div class="product-price">${money(p.price)}</div></div></article>`).join("");
}
function notify(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function renderBag(){
 const count=bag.reduce((s,p)=>s+p.qty,0); const total=bag.reduce((s,p)=>s+p.price*p.qty,0);
 document.getElementById("bagCount").textContent=count; document.getElementById("bagPanelCount").textContent=count; document.getElementById("bagTotal").textContent=money(total);
 document.getElementById("bagItems").innerHTML=bag.length?bag.map(p=>`<div class="bag-item"><img src="${p.image}" alt=""><div><strong>${p.name}</strong><small>${p.brand} · Qty ${p.qty}</small><br><small>${money(p.price*p.qty)}</small></div><button data-remove="${p.id}">REMOVE</button></div>`).join(""):'<p class="empty-bag">Your rotation starts here.</p>';
}
function openBag(){document.getElementById("bagPanel").classList.add("open");document.getElementById("overlay").classList.add("show")}
function closeBag(){document.getElementById("bagPanel").classList.remove("open");document.getElementById("overlay").classList.remove("show")}
document.getElementById("filters").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;activeFilter=b.dataset.filter;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts()});
document.getElementById("sortSelect").addEventListener("change",renderProducts);
grid.addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(!b)return;const p=products.find(x=>x.id===b.dataset.add);const old=bag.find(x=>x.id===p.id);if(old)old.qty++;else bag.push({...p,qty:1});renderBag();notify(`${p.name} added to your bag`);});
document.getElementById("bagButton").addEventListener("click",openBag);
document.getElementById("closeBag").addEventListener("click",closeBag);
document.getElementById("overlay").addEventListener("click",closeBag);
document.getElementById("bagItems").addEventListener("click",e=>{const b=e.target.closest("[data-remove]");if(!b)return;bag=bag.filter(p=>p.id!==b.dataset.remove);renderBag()});
document.getElementById("checkoutButton").addEventListener("click",()=>notify("Demo only — checkout and payment are not connected."));
document.getElementById("newsletterForm").addEventListener("submit",e=>{e.preventDefault();document.getElementById("newsletterMessage").textContent="Thanks — this demo form does not send or store email addresses.";e.target.reset()});
document.getElementById("menuToggle").addEventListener("click",()=>document.querySelector("nav").classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a=>a.addEventListener("click",()=>document.querySelector("nav").classList.remove("open")));
document.getElementById("searchToggle").addEventListener("click",()=>{const q=prompt("Search BND sneakers by brand or model:");if(!q)return;const found=products.filter(p=>(p.brand+" "+p.name).toLowerCase().includes(q.toLowerCase()));if(!found.length){notify("No matches — try Nike, Samba or 9060.");return;}activeFilter="All";document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x.dataset.filter==="All"));grid.innerHTML=found.map(p=>`<article class="product-card"><div class="product-image"><img src="${p.image}" alt="${p.brand} ${p.name} sneakers"><span class="product-tag">${p.tag}</span><button class="quick-add" data-add="${p.id}">+ ADD TO BAG</button></div><div class="product-info"><div><div class="product-brand">${p.brand}</div><h3 class="product-name">${p.name}</h3><div class="product-category">${p.category}</div></div><div class="product-price">${money(p.price)}</div></div></article>`).join("");document.getElementById("shop").scrollIntoView({behavior:"smooth"});});
renderProducts();renderBag();
