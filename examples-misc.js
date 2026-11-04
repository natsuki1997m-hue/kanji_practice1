/* Part 5 Easy mode — noun-based sentences (things, people, places).
   Verb-phrase grammars live in examples.js; these add the "X is Y" style grammars. */
(function(){
const EX=window.EX;const pickR=EX.pickR;
const an=n=>(/^[aeiou]/i.test(n)?'an ':'a ')+n;
const cap=s=>s[0].toUpperCase()+s.slice(1);

// ── things: word → [English noun, article ('a' | ''), flags]  (L = fine with "I like ~") ──
const TH={時計:['watch','a',''],本:['book','a','L'],辞書:['dictionary','a',''],教科書:['textbook','a',''],新聞:['newspaper','a','L'],
 手紙:['letter','a','L'],車:['car','a','L'],自転車:['bicycle','a','L'],自動車:['car','a',''],電話:['telephone','a',''],電車:['train','a','L'],
 漫画:['comic book','a','L'],日記:['diary','a',''],名刺:['business card','a',''],電池:['battery','a',''],水着:['swimsuit','a',''],
 折り紙:['origami','','L'],食べ物:['food','','L'],飲み物:['drink','a','L'],牛乳:['milk','','L'],牛肉:['beef','','L'],地下鉄:['subway','the','L'],
 新幹線:['bullet train','the','L'],雪:['snow','','L'],水:['water','','L'],お金:['money','','']};
const thNP=(w)=>{const t=TH[w];return t[1]==='a'?an(t[0]):(t[1]==='the'?'the '+t[0]:t[0]);};
const thG=(label,build,needFlag)=>EX.add(label,w=>{const t=TH[w];if(!t||(needFlag&&!t[2].includes(needFlag)))return null;return build(w,t);});
thG('X is Y',(w)=>['これは'+w+'です。','This is '+thNP(w)+'.']);
thG('Yes/no question with か',(w)=>['これは'+w+'ですか。','Is this '+thNP(w)+'?']);
thG('this / that / that over there (a thing)',(w)=>{const r=pickR([['これ','This'],['それ','That'],['あれ','That over there']]);
  return [r[0]+'は'+w+'です。',r[1]+' is '+thNP(w)+'.'];});
thG('Noun A の Noun B',(w,t)=>t[1]==='a'?['これはわたしの'+w+'です。','This is my '+t[0]+'.']:null);
thG('~ too / also (も)',(w)=>['これも'+w+'です。','This is '+thNP(w)+', too.']);
thG('is not (noun)',(w)=>['これは'+w+'じゃないです。',"This isn't "+thNP(w)+'.']);
thG('Whose ~?',(w,t)=>t[1]==='a'?['これはだれの'+w+'ですか。','Whose '+t[0]+' is this?']:null);
thG('this / that + noun',(w,t)=>t[1]==='a'?['この'+w+'はわたしのです。','This '+t[0]+' is mine.']:null);
thG('There is / exists (あります・います)',(w,t)=>t[1]==='a'?['ここに'+w+'があります。','There is '+thNP(w)+' here.']:null);
// fix plurals for "I like ~" (comic book → comic books, etc.)
thG('Like / dislike (好き・きらい)',(w,t)=>{
  const noun=t[1]==='a'?(/y$/.test(t[0])?t[0].slice(0,-1)+'ies':t[0]+'s'):(t[1]==='the'?'the '+t[0]:t[0]);
  return ['わたしは'+w+'が好きです。','I like '+noun+'.'];},'L');

// ── people ──
// occupations / roles: word → [English with article, Japanese prefix, flags]  (O = can be "was a ~" (former status))
const OCC={先生:['a teacher','','O'],学生:['a student','','O'],大学生:['a college student','','O'],高校生:['a high school student','','O'],
 小学生:['an elementary school student','','O'],会社員:['an office worker','','O'],店員:['a store clerk','','O'],駅員:['a station attendant','',''],
 作家:['an author','',''],歌手:['a singer','',''],画家:['a painter','',''],社長:['a company president','',''],市長:['a mayor','',''],
 外国人:['a foreigner','',''],子ども:['a child','','O'],大人:['an adult','',''],天才:['a genius','',''],会員:['a member','','O'],
 一年生:['a first-year student','','O'],二年生:['a second-year student','','O'],三年生:['a third-year student','','O'],四年生:['a fourth-year student','','O'],
 女子学生:['a female student','','O'],男子学生:['a male student','','O'],先輩:['my senior','わたしの',''],友だち:['my friend','わたしの',''],
 親友:['my best friend','わたしの',''],友人:['my friend','わたしの',''],家族:['my family','わたしの',''],
 父:['my father','わたしの',''],母:['my mother','わたしの',''],祖父:['my grandfather','わたしの',''],祖母:['my grandmother','わたしの',''],
 お父さん:['my father','わたしの',''],お母さん:['my mother','わたしの',''],赤ちゃん:['a baby','',''],少年:['a boy','',''],少女:['a girl','',''],
 女の子:['a girl','',''],男の子:['a boy','',''],女の人:['a woman','',''],男の人:['a man','',''],作者:['an author','',''],日本人:['a Japanese person','',''],
 町長:['a town mayor','',''],大使:['an ambassador','',''],長男:['my eldest son','わたしの',''],長女:['my eldest daughter','わたしの',''],次女:['my second daughter','わたしの',''],
 知り合い:['an acquaintance','',''],知人:['an acquaintance','',''],お金持ち:['a rich person','',''],青年:['a young man','','']};
const NAME={山本さん:'Yamamoto-san',木村さん:'Kimura-san',山川さん:'Yamakawa-san',小川さん:'Ogawa-san',田中さん:'Tanaka-san',山田さん:'Yamada-san',京子:'Kyoko'};
const JOBS=[['先生','a teacher'],['大学生','a college student'],['会社員','an office worker'],['学生','a student']];
const poss=en=>/^an? /.test(en)?'the '+en.replace(/^an? /,''):en;   // a teacher → the teacher('s)
const occG=(label,build,wantO)=>EX.add(label,w=>{const t=OCC[w];if(!t)return null;if(wantO&&!t[2].includes('O'))return null;return build(w,t);});
const nameG=(label,build)=>EX.add(label,w=>{const n=NAME[w];if(!n)return null;return build(w,n);});
// occupation sentences ("That person is a teacher.")
const pf=t=>t[1];
occG('X is Y',(w,t)=>['あの人は'+t[1]+w+'です。','That person is '+t[0]+'.']);
occG('Yes/no question with か',(w,t)=>['あの人は'+t[1]+w+'ですか。','Is that person '+t[0]+'?']);
occG('is not (noun)',(w,t)=>['あの人は'+t[1]+w+'じゃないです。',"That person isn't "+t[0]+'.']);
occG('~ too / also (も)',(w,t)=>['あの人も'+t[1]+w+'です。','That person is also '+t[0]+'.']);
occG("Past of です (was / wasn't)",(w,t)=>['あの人は'+t[1]+w+'でした。','That person was '+t[0]+'.'],true);
occG('this / that + noun',(w,t)=>t[1]?null:['あの'+w+'は田中さんです。','That '+t[0].replace(/^an? /,'')+' is Tanaka-san.']);
occG('Noun A の Noun B',(w,t)=>['これは'+(t[1]?'わたしの'+w:w)+'の本です。','This is '+(t[1]?t[0]:poss(t[0]))+"'s book."]);
occG('There is / exists (あります・います)',(w,t)=>t[1]?null:['教室に'+w+'がいます。','There is '+t[0]+' in the classroom.']);
// names ("Tanaka-san is a teacher.")
nameG('X is Y',(w,n)=>{const j=pickR(JOBS);return [w+'は'+j[0]+'です。',n+' is '+j[1]+'.'];});
nameG('Yes/no question with か',(w,n)=>{const j=pickR(JOBS);return [w+'は'+j[0]+'ですか。','Is '+n+' '+j[1]+'?'];});
nameG('is not (noun)',(w,n)=>{const j=pickR(JOBS);return [w+'は'+j[0]+'じゃないです。',n+" isn't "+j[1]+'.'];});
nameG('~ too / also (も)',(w,n)=>{const j=pickR(JOBS);return [w+'も'+j[0]+'です。',n+' is '+j[1]+', too.'];});
nameG("Past of です (was / wasn't)",(w,n)=>[w+'は学生でした。',n+' was a student.']);
nameG('Sentence ending ね / よ',(w,n)=>{const j=pickR(JOBS);return [w+'は'+j[0]+'ですよ。',n+' is '+j[1]+", you know."];});
nameG('Noun A の Noun B',(w,n)=>['これは'+w+'の本です。','This is '+n+"'s book."]);
nameG('this / that + noun',(w,n)=>['あの人は'+w+'です。','That person is '+n+'.']);
// "with" (と): X = companion
const WITH_FR=[['晩ご飯を食べました','had dinner'],['映画を見ました','watched a movie'],['買い物をしました','went shopping'],['話しました','talked']];
const companion=(w)=>{
  if(NAME[w])return [NAME[w],true];
  const t=OCC[w];if(!t)return null;
  if(/^my /.test(t[0]))return [t[0],true];
  if(w==='先生')return ['the teacher',false];
  return null;
};
EX.add('と (and / with)',w=>{const c=companion(w);if(!c)return null;
  const act=c[1]?pickR(WITH_FR):['話しました','talked'];
  const jx=OCC[w]&&OCC[w][1]?OCC[w][1]+w:w;
  return [(jx.startsWith('わたしの')?'':'わたしは')+jx+'と'+act[0]+'。','I '+act[1]+' with '+c[0]+'.'];});

// ── places ──
const BLD={銀行:'bank',大学:'university',図書館:'library',病院:'hospital',学校:'school',会社:'company',教会:'church',神社:'shrine',
 駐車場:'parking lot',売店:'stand',映画館:'movie theater',美容院:'beauty parlor',市役所:'city hall',市場:'market',旅館:'Japanese inn',
 食堂:'cafeteria',大使館:'embassy',小学校:'elementary school',中学校:'junior high school',高校:'high school',大学院:'graduate school'};
const NP={日本:'Japan',中国:'China',韓国:'South Korea',東京:'Tokyo',京都:'Kyoto',北海道:'Hokkaido'};
const bG=(label,build)=>EX.add(label,w=>BLD[w]?build(w,BLD[w]):null);
const nG=(label,build)=>EX.add(label,w=>NP[w]?build(w,NP[w]):null);
bG('X is Y',(w,e)=>['ここは'+w+'です。','This is '+an(e)+'.']);
bG('Yes/no question with か',(w,e)=>['ここは'+w+'ですか。','Is this '+an(e)+'?']);
bG('is not (noun)',(w,e)=>['ここは'+w+'じゃないです。',"This isn't "+an(e)+'.']);
bG('here / there',(w,e)=>['あそこに'+w+'があります。','There is '+an(e)+' over there.']);
bG('There is / exists (あります・います)',(w,e)=>['近くに'+w+'があります。','There is '+an(e)+' nearby.']);
bG('this / that + noun',(w,e)=>['あの'+w+'は有名です。','That '+e+' is famous.']);
bG('Like / dislike (好き・きらい)',(w,e)=>/^(bank|company|embassy|city hall|parking lot|stand|graduate school|beauty parlor)$/.test(e)?null:['わたしは'+w+'が好きです。','I like the '+e+'.']);
nG('X is Y',(w,e)=>['ここは'+w+'です。','This is '+e+'.']);
nG('Yes/no question with か',(w,e)=>['ここは'+w+'ですか。','Is this '+e+'?']);
nG('Like / dislike (好き・きらい)',(w,e)=>['わたしは'+w+'が好きです。','I like '+e+'.']);
nG('~ too / also (も)',(w,e)=>['わたしは'+w+'も好きです。','I like '+e+', too.']);
})();
