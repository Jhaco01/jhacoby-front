import{getItemCardName}from"./Card-Elements/01-getItemCardName.js";import{getItemCardImage}from"./Card-Elements/02-getItemCardImage.js";const createCard=()=>{const e=document.createElement("div");return e.classList.add("card","h-100"),e};export const getItemCard=(e,{name:t,url_image:d,price:a,discount:n})=>{const m=document.createElement("div");m.classList.add("col","mb-5");const c=createCard(),r=getItemCardImage(d);c.appendChild(r);const s=document.createElement("div");s.classList.add(["card-body","p-4"]);const o=document.createElement("div");o.classList.add("text-center");const p=getItemCardName(t);c.appendChild(p),o.appendChild(p);const i=n?`${a} CLP - ${n}% off`:`${a} CLP`;o.append(i),s.appendChild(o),c.appendChild(s),m.appendChild(c),e.appendChild(m)};