/* Part 5 Easy mode — adjectives, time words, durations and counters. */
(function(){
const EX=window.EX;const pickR=EX.pickR;

// ───────── adjectives ─────────
// k: 'i' | 'na'   f: adjective as it appears in the sentence (na-adjectives without な)   ea: English adjective
// pre/enP: present sentence (pre = Japanese up to the adjective) · pj/pe: optional different subject for the past
// n: [ja, en] noun phrase sentence · te: [partner adjective (dict form, no です), English partner] · bec/sup/feat: [ja, en] full sentences
// cmp: [A, B, English comparative] with English subjects [Aen, Ben]
const A=[
 {w:'円い',k:'i',f:'円い',ea:'round',pre:'この皿は',enP:'This plate is round.',pj:'あのテーブルは',pe:'That table was round.',n:['これは円い皿です。','This is a round plate.'],te:['白い','white'],one:1},
 {w:'大きい',k:'i',f:'大きい',ea:'big',pre:'この家は',enP:'This house is big.',pj:'あの家は',pe:'That house was big.',n:['これは大きい家です。','This is a big house.'],te:['新しい','new'],bec:['子どもは大きくなりました。','The child has gotten big.'],cmp:['犬','ねこ','bigger','Dogs','cats'],sup:['どうぶつの中で、ぞうがいちばん大きいです。','Among animals, elephants are the biggest.'],one:1},
 {w:'小さい',k:'i',f:'小さい',ea:'small',pre:'この車は',enP:'This car is small.',pj:'あの部屋は',pe:'That room was small.',n:['これは小さい車です。','This is a small car.'],te:['かわいい','cute'],cmp:['ねこ','犬','smaller','Cats','dogs'],one:1},
 {w:'高い',k:'i',f:'高い',ea:'expensive',pre:'このレストランは',enP:'This restaurant is expensive.',pj:'あのホテルは',pe:'That hotel was expensive.',n:['これは高いかばんです。','This is an expensive bag.'],te:['おいしい','delicious'],bec:['野菜が高くなりました。','Vegetables have become expensive.'],cmp:['新幹線','バス','more expensive','The bullet train','the bus'],sup:['日本で富士山がいちばん高い山です。','Mt. Fuji is the highest mountain in Japan.'],one:1},
 {w:'新しい',k:'i',f:'新しい',ea:'new',pre:'この家は',enP:'This house is new.',pj:'その店は',pe:'That store was new.',n:['これは新しい車です。','This is a new car.'],te:['きれい','pretty'],one:1},
 {w:'白い',k:'i',f:'白い',ea:'white',pre:'このシャツは',enP:'This shirt is white.',pj:'あの犬は',pe:'That dog was white.',n:['これは白いシャツです。','This is a white shirt.'],te:['きれい','clean'],one:1},
 {w:'少ない',k:'i',f:'少ない',ea:'few',pre:'今年は雨が',enP:'There is little rain this year.',pj:'去年は雨が',pe:'There was little rain last year.'},
 {w:'古い',k:'i',f:'古い',ea:'old',pre:'この車は',enP:'This car is old.',pj:'あの家は',pe:'That house was old.',n:['これは古い本です。','This is an old book.'],te:['小さい','small'],bec:['このカメラは古くなりました。','This camera has gotten old.'],one:1},
 {w:'正しい',k:'i',f:'正しい',ea:'correct',pre:'この答えは',enP:'This answer is correct.',pj:'あの答えは',pe:'That answer was correct.',n:['これは正しい答えです。','This is the correct answer.']},
 {w:'長い',k:'i',f:'長い',ea:'long',pre:'この川は',enP:'This river is long.',pj:'その映画は',pe:'That movie was long.',n:['これは長い橋です。','This is a long bridge.'],te:['きれい','clean'],bec:['髪が長くなりました。','My hair has gotten long.'],one:1},
 {w:'明るい',k:'i',f:'明るい',ea:'bright',pre:'この部屋は',enP:'This room is bright.',pj:'あの部屋は',pe:'That room was bright.',n:['これは明るい部屋です。','This is a bright room.'],te:['広い','spacious'],bec:['部屋が明るくなりました。','The room has become bright.']},
 {w:'強い',k:'i',f:'強い',ea:'strong',pre:'この犬は',enP:'This dog is strong.',pj:'昨日は風が',pe:'The wind was strong yesterday.',n:['あれは強い犬です。','That is a strong dog.'],te:['大きい','big'],bec:['風が強くなりました。','The wind has gotten strong.'],cmp:['ライオン','犬','stronger','Lions','dogs'],sup:['クラスで、田中さんがいちばん強いです。','Tanaka-san is the strongest in the class.']},
 {w:'早い',k:'i',f:'早い',ea:'early',pre:'うちの朝ご飯は',enP:'Breakfast is early at my house.',pj:'昨日の会議は',pe:'Yesterday’s meeting was early.'},
 {w:'赤い',k:'i',f:'赤い',ea:'red',pre:'このりんごは',enP:'This apple is red.',pj:'あの車は',pe:'That car was red.',n:['これは赤い車です。','This is a red car.'],te:['大きい','big'],one:1},
 {w:'青い',k:'i',f:'青い',ea:'blue',pre:'この海は',enP:'This sea is blue.',pj:'昨日の空は',pe:'Yesterday’s sky was blue.',n:['これは青いかばんです。','This is a blue bag.'],te:['きれい','beautiful'],one:1},
 {w:'上手な',k:'na',f:'上手',ea:'good',pre:'田中さんは日本語が',enP:'Tanaka-san is good at Japanese.',pj:'あの人は料理が',pe:'That person was good at cooking.',n:['あの人は上手な歌手です。','That person is a good singer.'],bec:['日本語が上手になりました。','My Japanese has gotten better.'],sup:['クラスで田中さんがいちばん日本語が上手です。','Tanaka-san is the best at Japanese in the class.']},
 {w:'下手な',k:'na',f:'下手',ea:'poor',pre:'わたしは歌が',enP:'I am bad at singing.',pj:'子どもの時、わたしは絵が',pe:'I was bad at drawing as a child.',n:['これは下手な字です。','This is poor handwriting.']},
 {w:'元気な',k:'na',f:'元気',ea:'fine',pre:'山田さんは',enP:'Yamada-san is fine.',pj:'先週、山田さんは',pe:'Yamada-san was fine last week.',n:['あの人は元気な人です。','That person is a lively person.'],te:['やさしい','kind'],bec:['元気になりました。','I have gotten well.']},
 {w:'大変な',k:'na',f:'大変',ea:'tough',pre:'今日の仕事は',enP:'Today’s work is tough.',pj:'昨日の仕事は',pe:'Yesterday’s work was tough.',n:['これは大変な仕事です。','This is tough work.']},
 {w:'新鮮な',k:'na',f:'新鮮',ea:'fresh',pre:'この魚は',enP:'This fish is fresh.',pj:'あの魚は',pe:'That fish was fresh.',n:['これは新鮮な魚です。','This is fresh fish.'],te:['おいしい','delicious']},
 {w:'不思議な',k:'na',f:'不思議',ea:'mysterious',pre:'この話は',enP:'This story is mysterious.',pj:'あの話は',pe:'That story was mysterious.',n:['これは不思議な話です。','This is a mysterious story.'],te:['おもしろい','interesting']},
 {w:'有名な',k:'na',f:'有名',ea:'famous',pre:'この歌手は',enP:'This singer is famous.',pj:'昔、この町は',pe:'This town was famous long ago.',n:['これは有名な歌です。','This is a famous song.'],bec:['この店は有名になりました。','This store has become famous.'],sup:['日本で富士山がいちばん有名です。','Mt. Fuji is the most famous in Japan.']},
 {w:'好きな',k:'na',f:'好き',ea:'favorite',pre:'わたしは犬が',enP:'I like dogs.',pj:'子どもの時、わたしはケーキが',pe:'I liked cake as a child.',n:['これはわたしの好きな本です。','This is my favorite book.'],bec:['日本が好きになりました。','I have come to like Japan.'],sup:['どうぶつの中で、犬がいちばん好きです。','I like dogs the best of all animals.']},
 {w:'大好きな',k:'na',f:'大好き',ea:'favorite',pre:'わたしはすしが',enP:'I love sushi.',pj:'子どもの時、わたしはカレーが',pe:'I loved curry as a child.',n:['これはわたしの大好きな歌です。','This is a song I love.'],bec:['日本が大好きになりました。','I have come to love Japan.']},
 {w:'勤勉な',k:'na',f:'勤勉',ea:'diligent',pre:'田中さんは',enP:'Tanaka-san is diligent.',pj:'山田さんは学生の時、',pe:'Yamada-san was diligent as a student.',n:['あの人は勤勉な学生です。','That person is a diligent student.'],te:['まじめ','serious']},
 {w:'強情な',k:'na',f:'強情',ea:'stubborn',pre:'弟は',enP:'My younger brother is stubborn.',pj:'子どもの時、わたしは',pe:'I was stubborn as a child.',n:['あの人は強情な人です。','That person is a stubborn person.']},
 {w:'強力な',k:'na',f:'強力',ea:'powerful',pre:'この機械は',enP:'This machine is powerful.',pj:'あの機械は',pe:'That machine was powerful.',n:['これは強力な機械です。','This is a powerful machine.'],te:['便利','useful']},
 {w:'有能な',k:'na',f:'有能',ea:'capable',pre:'田中さんは',enP:'Tanaka-san is capable.',pj:'山田さんは',pe:'Yamada-san was capable.',n:['あの人は有能な社長です。','That person is a capable company president.'],te:['まじめ','serious']},
 {w:'色々な',k:'na',f:'色々',ea:'various',n:['この店には色々な本があります。','This store has all kinds of books.']},
 {w:'特別な',k:'na',f:'特別',ea:'special',pre:'今日は',enP:'Today is special.',pj:'昨日は',pe:'Yesterday was special.',n:['これは特別なケーキです。','This is a special cake.'],te:['楽しい','fun']}
];
const AD={};A.forEach(a=>AD[a.w]=a);
const fi=a=>a.f;                                   // stem for forms
const jPres=a=>a.pre+a.f+(a.k==='na'?'です':'です');
const jPast=a=>(a.pj||a.pre)+(a.k==='i'?a.f.slice(0,-1)+'かったです':a.f+'でした');
const jTe=a=>a.k==='i'?a.f.slice(0,-1)+'くて':a.f+'で';
const kinds=(k)=>k;
const adjG=(label,kind,build)=>EX.add(label,w=>{const a=AD[w];if(!a||(kind&&a.k!==kind))return null;return build(a);});
adjG('i-adjective, present','i',a=>a.pre?[jPres(a)+'。',a.enP]:null);
adjG('na-adjective, present','na',a=>a.pre?[jPres(a)+'。',a.enP]:null);
adjG('Adjective, past','',a=>a.pre?[jPast(a)+'。',a.pe||a.enP.replace(' is ',' was ')]:null);
adjG('Adjective + noun','',a=>a.n?[a.n[0],a.n[1]]:null);
adjG('Modifying a noun with a verb / adjective','',a=>a.n?[a.n[0],a.n[1]]:null);
adjG('Adjective te-form (and)','',a=>a.pre&&a.te?[a.pre+jTe(a)+a.te[0]+'です。',a.enP.replace(/\.$/,'')+' and '+a.te[1]+'.']:null);
adjG('Become ~','',a=>a.bec||null);
adjG('A is more ~ than B','',a=>a.cmp?[a.cmp[0]+'のほうが'+a.cmp[1]+'より'+a.f+(a.k==='na'?'':'')+'です。',a.cmp[3]+' are '+a.cmp[2]+' than '+a.cmp[4]+'.']:null);
adjG('The most ~','',a=>a.sup||null);
adjG('The ~ one (の)','i',a=>a.one?['その'+a.f+'のをください。','Please give me the '+a.ea+' one.']:null);
adjG('Short (plain) forms','',a=>a.pre?[a.pre+a.f+(a.k==='na'?'だ':'')+'。',a.enP+' (Use plain form.)']:null);
adjG('Short past forms','',a=>a.pre?[(a.pj||a.pre)+(a.k==='i'?a.f.slice(0,-1)+'かった':a.f+'だった')+'。',(a.pe||a.enP.replace(' is ',' was '))+' (Use plain form.)']:null);
// body parts: "X は Y が ~"
EX.add('Describing features (X は Y が ~)',w=>{
  if(w==='手')return ['田中さんは手が大きいです。','Tanaka-san has big hands.'];
  if(w==='口')return ['子どもは口が小さいです。','The child has a small mouth.'];
  const a=AD[w];if(a&&a.w==='大きい')return ['田中さんは手が大きいです。','Tanaka-san has big hands.'];
  if(a&&a.w==='小さい')return ['子どもは手が小さいです。','The child has small hands.'];
  if(a&&a.w==='長い')return ['あの人は足が長いです。','That person has long legs.'];
  return null;});
EX.add('By / with (means: で)',w=>{
  if(w==='右手')return ['わたしは右手で書きます。','I write with my right hand.'];
  if(w==='左手')return ['わたしは左手で書きます。','I write with my left hand.'];
  if(w==='手')return ['すしは手で食べます。','I eat sushi with my hands.'];
  if(w==='電車')return ['電車で学校に行きます。','I go to school by train.'];
  if(w==='自転車')return ['自転車で学校に行きます。','I go to school by bicycle.'];
  if(w==='車')return ['車で会社に行きます。','I go to work by car.'];
  if(w==='地下鉄')return ['地下鉄で会社に行きます。','I go to work by subway.'];
  if(w==='新幹線')return ['新幹線で京都に行きます。','I go to Kyoto by bullet train.'];
  if(w==='電話')return ['電話で話しました。','I talked on the phone.'];
  if(w==='日本語')return ['日本語で話しました。','I spoke in Japanese.'];
  if(w==='英語')return ['英語で書きました。','I wrote it in English.'];
  if(w==='辞書')return ['辞書で調べました。','I looked it up in the dictionary.'];
  return null;});

// ───────── time words ─────────
const NUMEN={一:'one',二:'two',三:'three',四:'four',五:'five',六:'six',七:'seven',八:'eight',九:'nine',十:'ten'};
const HOURACT={1:[['昼ご飯を食べます','eat lunch']],2:[['勉強します','study']],3:[['勉強します','study']],4:[['うちに帰ります','go home']],5:[['うちに帰ります','go home']],
 6:[['晩ご飯を食べます','eat dinner'],['起きます','get up']],7:[['朝ご飯を食べます','eat breakfast'],['晩ご飯を食べます','eat dinner']],8:[['学校に行きます','go to school']],
 9:[['学校に行きます','go to school']],10:[['ねます','go to bed']]};
const WEEKDAY={月曜日:['Monday',1],火曜日:['Tuesday',1],水曜日:['Wednesday',1],木曜日:['Thursday',1],金曜日:['Friday',1],土曜日:['Saturday',0],日曜日:['Sunday',0]};
const MONTH={三月:'March',四月:'April',五月:'May',七月:'July',九月:'September',十月:'October',一月:'January'};
EX.add('At (a time) with に',w=>{
  let m=w.match(/^([一二三四五六七八九十]+)時$/);
  if(m){const h={一:1,二:2,三:3,四:4,五:5,六:6,七:7,八:8,九:9,十:10}[m[1]];const a=pickR(HOURACT[h]);return [w+'に'+a[0]+'。','I '+a[1]+' at '+NUMEN[m[1]]+'.'];}
  if(w==='三時半'){return ['三時半に勉強します。','I study at half past three.'];}
  if(WEEKDAY[w]){const d=WEEKDAY[w];const a=d[1]?['学校に行きます','go to school']:pickR([['買い物をします','go shopping'],['友だちに会います','meet my friends'],['テレビを見ます','watch TV']]);
    return [w+'に'+a[0]+'。','I '+a[1]+' on '+d[0]+'.'];}
  if(MONTH[w])return [w+'に日本へ行きます。','I will go to Japan in '+MONTH[w]+'.'];
  if(w==='正午')return ['正午に昼ご飯を食べます。','I eat lunch at noon.'];
  if(w==='午後')return ['午後に友だちに会います。','I meet a friend in the afternoon.'];
  if(w==='母の日')return ['母の日に花をあげます。','I give flowers to my mother on Mother’s Day.'];
  if(w==='元日')return ['元日に家族に会います。','I see my family on New Year’s Day.'];
  if(w==='お正月')return ['お正月に家族に会います。','I see my family at New Year.'];
  return null;});

// adverbial time words: [English, tense]  p present habit · f future · pa past · ing now
const TMW={毎日:['every day','p'],今日:['today','f'],明日:['tomorrow','f'],来週:['next week','f'],来年:['next year','f'],今晩:['tonight','f'],今夜:['tonight','f'],
 今朝:['this morning','pa'],先週:['last week','pa'],先月:['last month','pa'],毎週:['every week','p'],毎晩:['every night','p'],毎朝:['every morning','p'],
 毎年:['every year','p'],今月:['this month','f'],今年:['this year','p'],時々:['sometimes','p'],最近:['recently','pa'],今:['now','ing'],今度:['next time','f']};
const ACT_ANY=['日本語を勉強する|study Japanese|','!テレビを見る|watch TV|','本を読む|read a book|','友だちに会う|see my friends|'];
const ACT_MORNING=['!朝ご飯を食べる|eat breakfast|','コーヒーを飲む|drink coffee|','新聞を読む|read the newspaper|'];
const ACT_NIGHT=['!晩ご飯を食べる|eat dinner|','日本語を勉強する|study Japanese|','!テレビを見る|watch TV|','本を読む|read a book|'];
const ACT_YEAR=['日本に行く|go to Japan|','!家族に会う|see my family|'];
const actFor=w=>{const bank=/朝/.test(w)?ACT_MORNING:(/晩|夜/.test(w)?ACT_NIGHT:(/年/.test(w)&&w!=='今年'?ACT_YEAR:ACT_ANY));
  let s=pickR(bank);if(s[0]!=='!'&&/見る|会う|食べる/.test(s.split('|')[0]))s='!'+s;if(/家族に会う/.test(s)||/友だちに会う/.test(s))s=s.replace('!','');return EX.parseVP(s);};
const tmG=(label,tenses,build)=>EX.add(label,w=>{const t=TMW[w];if(!t||!tenses.includes(t[1]))return null;return build(w,t,actFor(w));});
const sentEN=(t,adv,v,form)=>adv==='sometimes'?'I sometimes '+EX.E(v,'base')+'.':'I '+form+' '+adv+'.';
tmG('Polite present verb',['p','f','ing'],(w,t,v)=>{
  if(t[1]==='ing')return ['今、'+v.J.te+'います。','I am '+EX.E(v,'ing')+' now.'];
  if(t[1]==='f')return [w+'、'+v.J.masu+'。','I will '+EX.E(v,'base')+' '+t[0]+'.'];
  if(t[0]==='sometimes')return [w+'、'+v.J.masu+'。','I sometimes '+EX.E(v,'base')+'.'];
  return [w+'、'+v.J.masu+'。','I '+EX.E(v,'base')+' '+t[0]+'.'];});
tmG('Polite past verb',['pa'],(w,t,v)=>[w+'、'+v.J.mashita+'。','I '+EX.E(v,'past')+' '+t[0]+'.']);
tmG('Short past forms',['pa'],(w,t,v)=>[w+'、'+v.J.ta+'。','I '+EX.E(v,'past')+' '+t[0]+'. (Use plain form.)']);
tmG('Short (plain) forms',['p','f'],(w,t,v)=>{
  const en=t[1]==='f'?'I will '+EX.E(v,'base')+' '+t[0]+'.':(t[0]==='sometimes'?'I sometimes '+EX.E(v,'base')+'.':'I '+EX.E(v,'base')+' '+t[0]+'.');
  return [w+'、'+v.J.dict+'。',en+' (Use plain form.)'];});
tmG("Invitation: won't you ~?",['f'],(w,t,v)=>[w+'、いっしょに'+v.J.masenka+'。','Would you like to '+EX.E(v,'base','your')+' with me '+t[0]+'?']);
tmG("Let's ~ / Shall we ~?",['f'],(w,t,v)=>[w+'、いっしょに'+v.J.mashou+'。',"Let's "+EX.E(v,'base','our')+' '+t[0]+'.']);
tmG('I think that ~',['f'],(w,t,v)=>['田中さんは'+w+'、'+v.J.dict+'と思います。','I think Tanaka-san will '+EX.E(v,'base','his')+' '+t[0]+'.']);
tmG('~ said that ~',['f'],(w,t,v)=>['田中さんは'+w+'、'+v.J.dict+'と言っていました。','Tanaka-san said that he would '+EX.E(v,'base','his')+' '+t[0]+'.']);

// ───────── durations ─────────
const DUR={一分:'one minute',六分:'six minutes',五分:'five minutes',十分:'ten minutes',二日間:'two days',三日:'three days',一か月:'one month',半年:'half a year',二時間:'two hours',一週間:'one week'};
EX.add('Duration (for ~ hours / minutes)',w=>{
  const d=DUR[w];if(!d)return null;
  if(/分$/.test(w))return ['友だちを'+w+'待ちました。','I waited for my friend for '+d+'.'];
  if(/時間$/.test(w))return pickR([['日本語を'+w+'勉強しました。','I studied Japanese for '+d+'.'],['本を'+w+'読みました。','I read a book for '+d+'.'],['テレビを'+w+'見ました。','I watched TV for '+d+'.']]);
  if(/日/.test(w))return [w+'京都を旅行しました。','I traveled around Kyoto for '+d+'.'];
  if(w==='一週間')return pickR([['一週間日本を旅行しました。','I traveled around Japan for one week.'],['一週間学校を休みました。','I missed school for one week.']]);
  return pickR([[w+'日本語を勉強しました。','I studied Japanese for '+d+'.'],[w+'日本に住みました。','I lived in Japan for '+d+'.']]);});

// ───────── counters ─────────
const TSU={一つ:['one',1],二つ:['two',2],三つ:['three',3],四つ:['four',4],五つ:['five',5],六つ:['six',6],七つ:['seven',7],八つ:['eight',8],九つ:['nine',9]};
const OBJ=[['りんご','apple'],['ケーキ','cake'],['かばん','bag'],['たまご','egg']];
const PEOPLE={七人:'seven',三人:'three'};
const PRICE={百円:['100 yen','このパンは','bread'],千円:['1,000 yen','このシャツは','shirt'],三千:['3,000 yen','この本は','book'],八千:['8,000 yen','このかばんは','bag'],
 一万:['10,000 yen','このかばんは','bag'],十万:['100,000 yen','このパソコンは','computer'],百万:['1,000,000 yen','この車は','car'],六百:['600 yen','この本は','book'],
 八百:['800 yen','この本は','book'],三百:['300 yen','このパンは','bread'],百:['100 yen','このパンは','bread'],千:['1,000 yen','このシャツは','shirt']};
const AGE={五歳:['five',''],八歳:['eight',''],九歳:['nine',''],十歳:['ten','']};
const priceJa=(w)=>/円$/.test(w)?w:(w+'円');
const cntBuild=(w)=>{
  if(TSU[w]){const n=TSU[w];const o=pickR(OBJ);return [o[0]+'を'+w+'買いました。','I bought '+n[0]+' '+o[1]+(n[1]>1?'s':'')+'.'];}
  if(PEOPLE[w])return ['教室に学生が'+w+'います。','There are '+PEOPLE[w]+' students in the classroom.'];
  if(w==='何人')return ['教室に学生は'+w+'いますか。','How many students are there in the classroom?'];
  if(AGE[w])return ['この子は'+w+'です。','This child is '+AGE[w][0]+' years old.'];
  if(PRICE[w]){const p=PRICE[w];return [p[1]+priceJa(w)+'です。','This '+p[2]+' is '+p[0]+'.'];}
  if(w==='三十度')return ['今日は三十度です。','It is 30 degrees today.'];
  return null;};
EX.add('Counters (~ sheets, etc.)',cntBuild);
EX.add('Counting people',w=>(PEOPLE[w]||w==='何人')?cntBuild(w):null);
EX.add('X is Y',w=>(PRICE[w]||AGE[w]||w==='三十度')?cntBuild(w):null);
EX.add('Yes/no question with か',w=>{const p=PRICE[w];if(!p)return null;return [p[1]+priceJa(w)+'ですか。','Is this '+p[2]+' '+p[0]+'?'];});
EX.add("Past of です (was / wasn't)",w=>{const p=PRICE[w];if(!p)return null;return [p[1]+priceJa(w)+'でした。','This '+p[2]+' was '+p[0]+'.'];});
})();
