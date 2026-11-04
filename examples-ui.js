/* Teacher's own example sentences for Part 5 Easy mode.
   Stored in this browser (localStorage) + export / import as a JSON file for backup. */
(function(){
const KEY='kp1_custom_examples_v1';
const load=()=>{try{const a=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(a)?a:[];}catch(e){return [];}};
const save=a=>{try{localStorage.setItem(KEY,JSON.stringify(a));return true;}catch(e){return false;}};
EX.custom=load;
const H=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const stem=k=>/する$/.test(k)?k.slice(0,-2):/な$/.test(k)?k.slice(0,-1):(/[いるうくぐすつぬぶむ]$/.test(k)&&k.length>1?k.slice(0,-1):k);
let q='',onlyNo=false,sel=null,warned=false,msg='';

function allWords(){
  const seen=new Set(),out=[];
  for(const u of Object.keys(FLASH).sort((a,b)=>parseInt(a)-parseInt(b)))for(const w of FLASH[u]){
    if(seen.has(w.k))continue;seen.add(w.k);out.push({word:w.k,reading:w.r,meaning:w.e,unit:u});}
  return out;
}
const lessonOf=w=>getLessonForWord(w.word,w.reading)||parseInt(w.unit)||12;
const builtinCount=w=>{try{return EX.labelsFor(w).length-new Set(EX.customFor(w).map(c=>c.g)).size;}catch(e){return 0;}};

function render(){
  const d=document.getElementById('exDialog');if(!d)return;
  const cu=load();
  const words=allWords();
  const ql=q.trim().toLowerCase();
  let list=words.filter(w=>!ql||w.word.includes(q.trim())||w.reading.includes(q.trim())||(w.meaning||'').toLowerCase().includes(ql));
  if(onlyNo)list=list.filter(w=>builtinCount(w.word)<=0&&!cu.some(c=>c.word===w.word));
  const shown=list.slice(0,40);
  let h=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
    <div style="font-size:17px;font-weight:900;">✏️ My example sentences</div>
    <button onclick="exClose()" style="border:none;background:#eee;border-radius:8px;padding:6px 12px;font-weight:800;cursor:pointer;">Close</button></div>
    <div style="font-size:12px;color:#888;line-height:1.6;margin-bottom:10px;">Search a word, then add a Japanese sentence + its English translation and pick the grammar it shows. In Easy mode your sentence is used first for that word and grammar. Saved in <b>this browser</b> — use Export to back up.</div>
    <input id="exQ" value="${H(q)}" oninput="exSearch(this.value)" placeholder="Search kanji / reading / English…" style="width:100%;padding:10px 12px;border:2px solid #ddd;border-radius:10px;font-size:14px;margin-bottom:6px;">
    <label style="font-size:12px;color:#666;display:flex;gap:6px;align-items:center;margin-bottom:8px;cursor:pointer;"><input type="checkbox" ${onlyNo?'checked':''} onchange="exOnlyNo(this.checked)"> Only words with no example yet</label>`;
  h+=`<div style="max-height:${sel?'18':'42'}vh;overflow:auto;border:1px solid #eee;border-radius:10px;">`;
  if(!shown.length)h+=`<div style="padding:14px;color:#aaa;font-size:13px;">No words found.</div>`;
  shown.forEach(w=>{
    const own=cu.filter(c=>c.word===w.word).length,b=builtinCount(w.word);
    const on=sel&&sel.word===w.word;
    h+=`<div onclick="exPick('${H(w.word).replace(/'/g,"\\'")}')" style="padding:8px 12px;border-bottom:1px solid #f0f0f0;cursor:pointer;display:flex;gap:8px;align-items:center;background:${on?'#fff0eb':'#fff'};">
      <span style="font-size:17px;min-width:70px;">${H(w.word)}</span><span style="font-size:12px;color:#888;">${H(w.reading)}</span>
      <span style="font-size:11px;color:#aaa;flex:1;">${H(w.meaning)}</span>
      <span style="font-size:10px;font-weight:800;color:${b>0?'#2a8':'#c60'};">${b>0?'built-in ✓':'no example'}</span>${own?`<span style="font-size:10px;font-weight:800;color:#FF6B35;">yours ${own}</span>`:''}</div>`;
  });
  h+=`</div>${list.length>40?`<div style="font-size:11px;color:#aaa;margin-top:4px;">Showing 40 of ${list.length} — type to narrow down.</div>`:''}`;
  if(sel){
    const w=sel,L=lessonOf(w),gs=GENKI_GRAMMAR.filter(g=>g.l<=L-1);
    const mine=cu.filter(c=>c.word===w.word);
    h+=`<div style="margin-top:12px;padding:12px;background:#f8f8f8;border-radius:12px;">
      <div style="font-weight:900;margin-bottom:4px;"><span style="font-size:18px;">${H(w.word)}</span> <span style="font-size:12px;color:#888;">${H(w.reading)} — ${H(w.meaning)} · Lesson ${L}</span></div>
      <div style="font-size:11px;color:#aaa;margin-bottom:8px;">Grammar choices: Lessons 1–${L-1} only (the same rule as the worksheet).</div>`;
    if(gs.length===0)h+=`<div style="font-size:12px;color:#c60;">No grammar is available for this lesson yet.</div>`;
    else{
      h+=`<textarea id="exJa" rows="2" placeholder="Japanese sentence (answer)" style="width:100%;padding:8px;border:2px solid #ddd;border-radius:8px;font-size:14px;margin-bottom:6px;"></textarea>
      <textarea id="exEn" rows="2" placeholder="Natural English sentence (shown to the student)" style="width:100%;padding:8px;border:2px solid #ddd;border-radius:8px;font-size:14px;margin-bottom:6px;"></textarea>
      <select id="exG" style="width:100%;padding:8px;border:2px solid #ddd;border-radius:8px;font-size:13px;margin-bottom:8px;">${gs.map(g=>`<option value="${H(g.en)}">L${g.l} · ${H(g.en)}</option>`).join('')}</select>
      <div style="display:flex;gap:8px;align-items:center;"><button onclick="exSave()" style="padding:9px 16px;border:none;border-radius:10px;background:#FF6B35;color:#fff;font-weight:800;cursor:pointer;">${warned?'Save anyway':'Add sentence'}</button>
      <span style="font-size:12px;color:${warned?'#c60':'#2a8'};">${H(msg)}</span></div>`;
    }
    if(mine.length){
      h+=`<div style="margin-top:12px;font-size:11px;font-weight:900;color:#888;">YOUR SENTENCES FOR THIS WORD</div>`;
      mine.forEach(c=>{h+=`<div style="display:flex;gap:8px;align-items:flex-start;padding:6px 0;border-bottom:1px solid #eee;">
        <div style="flex:1;font-size:13px;"><div>${H(c.ja)}</div><div style="color:#888;">${H(c.en)}</div><div style="font-size:10px;color:#FF6B35;">${H(c.g)}</div></div>
        <button onclick="exDel('${c.id}')" style="border:none;background:#fee;color:#c33;border-radius:6px;padding:3px 8px;cursor:pointer;">✕</button></div>`;});
    }
    h+=`</div>`;
  }
  h+=`<div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;align-items:center;">
    <button onclick="exExport()" style="padding:7px 12px;border:2px solid #ddd;background:#fff;border-radius:8px;font-weight:700;cursor:pointer;">⬇ Export (${cu.length})</button>
    <label style="padding:7px 12px;border:2px solid #ddd;background:#fff;border-radius:8px;font-weight:700;cursor:pointer;">⬆ Import<input type="file" accept="application/json" onchange="exImport(this)" style="display:none;"></label></div>`;
  const keep=document.getElementById('exQ');const hadFocus=keep&&document.activeElement===keep;const pos=hadFocus?keep.selectionStart:0;
  d.firstElementChild.innerHTML=h;
  if(hadFocus){const n=document.getElementById('exQ');n.focus();try{n.setSelectionRange(pos,pos);}catch(e){}}
}
window.openExampleManager=()=>{
  if(document.getElementById('exDialog'))return;
  q='';onlyNo=false;sel=null;warned=false;msg='';
  const d=document.createElement('div');d.id='exDialog';
  d.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:100000;display:flex;align-items:center;justify-content:center;padding:16px;';
  d.innerHTML='<div style="background:#fff;border-radius:18px;padding:20px;width:100%;max-width:560px;max-height:92vh;overflow:auto;"></div>';
  document.body.appendChild(d);render();
};
window.exClose=()=>{const d=document.getElementById('exDialog');if(d)d.remove();if(window.wsRefresh)window.wsRefresh();};
window.exSearch=v=>{q=v;render();};
window.exOnlyNo=v=>{onlyNo=v;render();};
window.exPick=word=>{sel=allWords().find(w=>w.word===word)||null;warned=false;msg='';render();};
window.exDel=id=>{save(load().filter(c=>c.id!==id));render();};
window.exSave=()=>{
  if(!sel)return;
  const ja=document.getElementById('exJa').value.trim(),en=document.getElementById('exEn').value.trim(),g=document.getElementById('exG').value;
  if(!ja||!en){msg='Please fill in both the Japanese and the English sentence.';warned=false;render();restore(ja,en,g);return;}
  const has=ja.includes(sel.word)||ja.includes(stem(sel.word))||ja.includes(sel.reading);
  if(!has&&!warned){warned=true;msg='The Japanese sentence does not seem to contain this word. Press again to save anyway.';render();restore(ja,en,g);return;}
  const a=load();a.push({id:'c'+Date.now().toString(36)+Math.floor(Math.random()*1000),word:sel.word,g,ja,en});
  if(!save(a)){msg='Could not save (browser storage is blocked).';render();restore(ja,en,g);return;}
  warned=false;msg='Added ✓';render();
};
function restore(ja,en,g){const a=document.getElementById('exJa'),b=document.getElementById('exEn'),c=document.getElementById('exG');if(a)a.value=ja;if(b)b.value=en;if(c)c.value=g;}
window.exExport=()=>{
  const blob=new Blob([JSON.stringify(load(),null,1)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='kanji-practice-my-examples.json';document.body.appendChild(a);a.click();a.remove();
};
window.exImport=inp=>{
  const f=inp.files&&inp.files[0];if(!f)return;
  const r=new FileReader();r.onload=()=>{try{
    const add=JSON.parse(r.result);if(!Array.isArray(add))throw 0;
    const cur=load(),keys=new Set(cur.map(c=>c.word+'|'+c.g+'|'+c.ja));
    add.filter(c=>c&&c.word&&c.g&&c.ja&&c.en&&!keys.has(c.word+'|'+c.g+'|'+c.ja)).forEach(c=>cur.push({id:c.id||'i'+Math.random().toString(36).slice(2),word:c.word,g:c.g,ja:c.ja,en:c.en}));
    save(cur);render();
  }catch(e){alert('That file could not be read.');}};r.readAsText(f);
};
})();
