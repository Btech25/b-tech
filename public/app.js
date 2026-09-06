const c = window.BTECH;
const text = (id, value) => { document.getElementById(id).textContent = value; };
const safe = (value, protocols) => { try { const u = new URL(value, location.href); return protocols.includes(u.protocol) ? u.href : '#'; } catch { return '#'; } };
for (const key of ['name','role','location','phone','email']) text(key,c[key]);
document.getElementById('portrait').src = safe(c.photo,['https:','http:','file:','data:']);
document.getElementById('portrait').alt = c.name;
const links = {whatsapp:safe(c.whatsapp,['https:']),call:'tel:'+c.phone.replace(/[^+\d]/g,''),maps:safe(c.maps,['https:']),email:'mailto:'+c.email.replace(/[\r\n]/g,'')};
document.querySelectorAll('[data-link]').forEach(a=>a.href=links[a.dataset.link]);
document.querySelectorAll('[data-service]').forEach(a=>{const u=new URL(links.whatsapp);u.searchParams.set('text',`Hi B-TECH, I would like to know more about ${a.dataset.service}.`);a.href=u.href;});
function vcardEscape(value){return String(value??'').replace(/\\/g,'\\\\').replace(/\r\n|\r|\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,');}
document.getElementById('save-contact').addEventListener('click',()=>{
 const rows=['BEGIN:VCARD','VERSION:3.0',`FN:${vcardEscape(c.name)}`,`N:;${vcardEscape(c.name)};;;`,'ORG:B-TECH',`TITLE:${vcardEscape(c.role)}`,`TEL;TYPE=CELL:${vcardEscape(c.phone)}`,`EMAIL;TYPE=WORK:${vcardEscape(c.email)}`,`ADR;TYPE=WORK:;;${vcardEscape(c.location)};;;;`,'END:VCARD'];
 const url=URL.createObjectURL(new Blob([rows.join('\r\n')+'\r\n'],{type:'text/vcard;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='Bilal-BTECH.vcf';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);
 text('status','Contact card downloaded. Open it to save the contact.');setTimeout(()=>text('status',''),6000);
});
