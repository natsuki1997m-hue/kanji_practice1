/* Easy-mode example sentences for Part 5 (worksheet).
   Natural sentences are built from hand-written data (examples-data.js / examples-misc.js)
   + a small Japanese conjugation / English inflection engine (this file).
   EX.make(word, grammarLabel) -> {ja, en} or null (no natural example → caller skips/falls back). */
(function(){
const EX=window.EX=window.EX||{};
EX.VP=EX.VP||{};   // word -> ["ja|en|flags", ...]   (verb phrases that contain the word)
EX.GR={};          // grammar label (GENKI_GRAMMAR.en) -> [builder(word,reading,meaning) -> [ja,en]|null]
EX.add=(label,fn)=>{(EX.GR[label]=EX.GR[label]||[]).push(fn);};
const pickR=a=>a[Math.floor(Math.random()*a.length)];
const shufR=a=>{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
EX.pickR=pickR;EX.shufR=shufR;

// ───────── Japanese verb conjugation ─────────
const GOD={'う':['い','わ','って','った'],'つ':['ち','た','って','った'],'る':['り','ら','って','った'],
  'む':['み','ま','んで','んだ'],'ぶ':['び','ば','んで','んだ'],'ぬ':['に','な','んで','んだ'],
  'く':['き','か','いて','いた'],'ぐ':['ぎ','が','いで','いだ'],'す':['し','さ','して','した']};
function jaForms(d,ichi){
  let stem,te,ta,nai;
  if(/する$/.test(d)){const h=d.slice(0,-2);stem=h+'し';te=h+'して';ta=h+'した';nai=h+'しない';}
  else if(/(来る|くる)$/.test(d)){const kanji=/来る$/.test(d);const h=kanji?d.slice(0,-2):d.slice(0,-2);
    const k=kanji?'来':'き';stem=h+k;te=h+k+'て';ta=h+k+'た';nai=h+(kanji?'来':'こ')+'ない';}
  else if(ichi){const h=d.slice(0,-1);stem=h;te=h+'て';ta=h+'た';nai=h+'ない';}
  else{const h=d.slice(0,-1),c=GOD[d.slice(-1)];stem=h+c[0];nai=h+c[1];te=h+c[2];ta=h+c[3];
    if(/行く$/.test(d)){te=h+'って';ta=h+'った';}}
  return {dict:d,stem,te,ta,nai,masu:stem+'ます',masen:stem+'ません',mashita:stem+'ました',
    masenka:stem+'ませんか',mashou:stem+'ましょう',mashouka:stem+'ましょうか',tai:stem+'たいです',tari:ta+'り'};
}
EX.jaForms=jaForms;

// ───────── English verb inflection ─────────
const IRR={eat:['ate','eaten','eating'],go:['went','gone','going'],see:['saw','seen','seeing'],drink:['drank','drunk','drinking'],
 buy:['bought','bought','buying'],make:['made','made','making'],write:['wrote','written','writing'],read:['read','read','reading'],
 speak:['spoke','spoken','speaking'],take:['took','taken','taking'],get:['got','gotten','getting'],come:['came','come','coming'],
 meet:['met','met','meeting'],sing:['sang','sung','singing'],say:['said','said','saying'],bring:['brought','brought','bringing'],
 have:['had','had','having'],give:['gave','given','giving'],sell:['sold','sold','selling'],know:['knew','known','knowing'],
 think:['thought','thought','thinking'],wake:['woke','woken','waking'],sleep:['slept','slept','sleeping'],put:['put','put','putting'],
 tell:['told','told','telling'],do:['did','done','doing'],run:['ran','run','running'],swim:['swam','swum','swimming'],
 teach:['taught','taught','teaching'],find:['found','found','finding'],leave:['left','left','leaving'],wear:['wore','worn','wearing'],
 begin:['began','begun','beginning'],sit:['sat','sat','sitting'],stand:['stood','stood','standing'],draw:['drew','drawn','drawing'],
 lose:['lost','lost','losing'],pay:['paid','paid','paying'],send:['sent','sent','sending'],spend:['spent','spent','spending'],
 get_up:['got','gotten','getting'],hear:['heard','heard','hearing'],keep:['kept','kept','keeping'],build:['built','built','building'],
 ride:['rode','ridden','riding'],drive:['drove','driven','driving'],forget:['forgot','forgotten','forgetting'],
 cut:['cut','cut','cutting'],be:['was','been','being'],wash:['washed','washed','washing'],choose:['chose','chosen','choosing']};
const DBL=new Set(['stop','plan','shop','chat','jog','drop','nap','chat']);
function enForms(v){
  if(IRR[v])return {base:v,past:IRR[v][0],pp:IRR[v][1],ing:IRR[v][2]};
  let past,ing;
  if(/[^aeiou]y$/.test(v)){past=v.slice(0,-1)+'ied';ing=v+'ing';}
  else if(/e$/.test(v)&&!/ee$/.test(v)){past=v+'d';ing=v.slice(0,-1)+'ing';}
  else if(DBL.has(v)){const l=v.slice(-1);past=v+l+'ed';ing=v+l+'ing';}
  else{past=v+'ed';ing=v+'ing';}
  return {base:v,past,pp:past,ing};
}
EX.enForms=enForms;

// ───────── verb-phrase records ─────────
// "ja|en|flags"  ja: dictionary form ('!' prefix = ichidan verb)   en: base-form phrase
// flags: r request/permission ok · p can be prohibited · h can be offered as help · k liked / habitual
//        x "have done before" ok · l leisure · u lasts a while · w already has a companion (no invite) · s state verb only
const cache={};
function parseVP(str){
  if(cache[str])return cache[str];
  const [ja0,en,f]=str.split('|');
  const ichi=ja0[0]==='!';const ja=ichi?ja0.slice(1):ja0;
  const ew=en.split(' ');
  const v={ja,en,f:f||'',J:jaForms(ja,ichi),E:enForms(ew[0]),rest:ew.slice(1).join(' ')};
  return (cache[str]=v);
}
EX.parseVP=parseVP;
// poss replaces the {P} token in English phrases (my / your / his / our)
const E=(v,f,poss)=>{
  let verb=v.E[f];
  if(f==='ppx'&&v.E.base==='go'&&/^to /.test(v.rest))verb='been';
  if(f==='ppx')f='pp',verb=verb==='been'?verb:v.E.pp;
  return (verb+(v.rest?' '+v.rest:'')).replace(/\{P\}/g,poss||'my');
};
EX.E=E;
// all VP records of a word that have/lack the given flag
const Q_OK=new Set(['Plan to ~','Want to ~','Have done ~ before','Like / good at doing ~']);
EX.vps=(word,flag,label)=>(EX.VP[word]||[]).map(parseVP).filter(v=>{
  const s=v.f.includes('s');
  if(v.f.includes('q')&&!Q_OK.has(label))return false;
  if(flag==='s')return s;
  if(s)return false;
  return !flag||v.f.includes(flag);
});
// register a VP-based grammar: builder gets a VP record and returns [ja,en]
function vpg(label,flag,build,extraOK){
  EX.add(label,(word)=>{
    const c=shufR(EX.vps(word,flag,label));
    for(const v of c){const r=build(v);if(r)return r;}
    return null;
  });
}
EX.vpg=vpg;

// second clauses / second activities used by "A and then B" and "do A and B"
const SEC=[['うちに帰りました','went home'],['晩ご飯を食べました','had dinner'],['ねました','went to bed'],['友だちに会いました','met a friend']];
const SECL=[['テレビを見','watch TV'],['音楽を聞','listen to music'],['友だちに会','meet friends'],['買い物をし','go shopping']];

vpg('Polite present verb','',v=>['明日、'+v.J.masu+'。','Tomorrow I will '+E(v,'base')+'.']);
vpg('Particles を / で / に / へ','',v=>['午後、'+v.J.masu+'。','This afternoon I will '+E(v,'base')+'.']);
vpg("Invitation: won't you ~?",'r',v=>v.f.includes('w')?null:['いっしょに'+v.J.masenka+'。','Would you like to '+E(v,'base','your')+' with me?']);
vpg('Polite past verb','',v=>['昨日、'+v.J.mashita+'。','Yesterday I '+E(v,'past')+'.']);
vpg("Let's ~ / Shall we ~?",'r',v=>v.f.includes('w')?null:['いっしょに'+v.J.mashou+'。',"Let's "+E(v,'base','our')+'.']);
vpg('Please do ~ (te-form)','r',v=>[v.J.te+'ください。','Please '+E(v,'base','your')+'.']);
vpg('Do A and then B (te-form)','',v=>{
  const t=v.en+' '+v.ja;
  const far=/Japan|China|Korea|Tokyo|Kyoto|Hokkaido|Antarctica|Asia|Pole|area|overseas|move|live|climb|travel|mountain|river|swim|embassy|Mt\./.test(v.en);
  const pool=SEC.filter(s=>{
    if(far&&!/met a friend/.test(s[1]))return false;
    if(/dinner|ご飯|meal|lunch|breakfast|eat/.test(t)&&/dinner/.test(s[1]))return false;
    if(/home|帰|shopping/.test(t)&&/home/.test(s[1]))return false;
    if(/bed|寝|ね/.test(v.en)&&/bed/.test(s[1]))return false;
    if(/meet|会/.test(t)&&/met /.test(s[1]))return false;
    return true;});
  if(!pool.length)return null;const s=pickR(pool);
  return [v.J.te+'、'+s[0]+'。','I '+E(v,'past')+' and then '+s[1]+'.'];});
vpg('May I ~? / You may ~','r',v=>[v.J.te+'もいいですか。','May I '+E(v,'base')+'?']);
vpg('You must not ~','p',v=>[v.J.te+'はいけません。','You must not '+E(v,'base','your')+'.']);
vpg('Shall I ~? (offering help)','h',v=>[v.J.mashouka+'。','Shall I '+E(v,'base')+'?']);
vpg('Is doing ~ (ている)','',v=>v.f.includes('0')?null:['今、'+v.J.te+'います。','I am '+E(v,'ing')+' now.']);
vpg('State / result (ている)','s',v=>[v.J.te+'います。','I '+E(v,'base')+'.']);
vpg('Short (plain) forms','',v=>['明日、'+v.J.dict+'。','Tomorrow I will '+E(v,'base')+'. (Use plain form.)']);
vpg('I think that ~','',v=>['田中さんは明日'+v.J.dict+'と思います。','I think Tanaka-san will '+E(v,'base','his')+' tomorrow.']);
vpg('~ said that ~','',v=>['田中さんは明日'+v.J.dict+'と言っていました。','Tanaka-san said that he would '+E(v,'base','his')+' tomorrow.']);
vpg("Please don't ~",'p',v=>[v.J.nai+'でください。',"Please don't "+E(v,'base','your')+'.']);
vpg('Like / good at doing ~','k',v=>['わたしは'+v.J.dict+'のが好きです。','I like '+E(v,'ing')+'.']);
vpg('Frequency adverbs (often, sometimes, not much, never)','k',v=>['わたしはよく'+v.J.masu+'。','I often '+E(v,'base')+'.']);
vpg('Duration (for ~ hours / minutes)','u',v=>['昨日、二時間'+v.J.mashita+'。','Yesterday I '+E(v,'past')+' for two hours.']);
vpg('Short past forms','',v=>['昨日、'+v.J.ta+'。','Yesterday I '+E(v,'past')+'. (Use plain form.)']);
vpg('Modifying a noun with a verb / adjective','',v=>v.rest.includes('{P}')?null:['昨日'+v.J.ta+'人は田中さんです。','The person who '+E(v,'past')+' yesterday is Tanaka-san.']);
vpg('Already / not yet','',v=>['もう'+v.J.mashita+'か。','Have you '+E(v,'pp')+' yet?']);
vpg('Plan to ~','',v=>['来週、'+v.J.dict+'つもりです。','I plan to '+E(v,'base')+' next week.']);
vpg('Want to ~','',v=>[v.J.tai+'。','I want to '+E(v,'base')+'.']);
vpg('Do things like ~ and ~','l',v=>{
  const s=pickR(SECL.filter(x=>x[1]!==v.en));
  let t2;
  if(s[0]==='テレビを見')t2='テレビを見たり';else if(s[0]==='音楽を聞')t2='音楽を聞いたり';
  else if(s[0]==='友だちに会')t2='友だちに会ったり';else t2='買い物をしたり';
  return ['週末は、'+v.J.tari+'、'+t2+'します。','On weekends, I '+E(v,'base')+' and '+s[1]+', among other things.'];
});
vpg('Have done ~ before','x',v=>[v.J.ta+'ことがあります。','I have '+E(v,'ppx')+' before.']);

// ───────── public API ─────────
// Which grammar labels have at least one natural example for this word?
EX.labelsFor=(word)=>Object.keys(EX.GR).filter(l=>EX.GR[l].some(fn=>{try{return !!fn(word);}catch(e){return false;}}));
EX.make=(word,label)=>{
  const fns=shufR(EX.GR[label]||[]);
  for(const fn of fns){let r=null;try{r=fn(word);}catch(e){r=null;}if(r)return {ja:r[0],en:r[1]};}
  return null;
};
EX.has=(word,label)=>!!EX.make(word,label);
})();
