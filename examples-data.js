/* Hand-written verb phrases for Part 5 Easy mode. Format: "日本語|English base phrase|flags"
   '!' before the Japanese = ichidan verb. {P} = my/your/his (filled in by the grammar template).
   flags: r request/permission · p prohibition · h offer help · k like/habit · x have-done-before ·
          l leisure · u lasts a while · w has a companion already · s state only · q only plan/want/experience */
(function(){
const V=window.EX.VP;
const add=(w,...a)=>{V[w]=(V[w]||[]).concat(a);};

// ── verbs ──
add('上る','階段を上る|go up the stairs|r');
add('見る','!テレビを見る|watch TV|rkl','!映画を見る|watch a movie|rklx');
add('行く','学校に行く|go to school|r0','日本に行く|go to Japan|rkx0');
add('食べる','!すしを食べる|eat sushi|rkx','!朝ご飯を食べる|eat breakfast|k','!ここで食べる|eat here|p');
add('飲む','コーヒーを飲む|drink coffee|rkl');
add('出る','!家を出る|leave the house|0');
add('出かける','!友だちと出かける|go out with a friend|w','!ちょっと出かける|go out for a bit|r');
add('出す','!手紙を出す|mail a letter|rh');
add('分ける','!ケーキを半分に分ける|divide the cake in half|rh');
add('学ぶ','日本語を学ぶ|learn Japanese|rku');
add('会う','友だちに会う|meet a friend|rkl');
add('帰る','国に帰る|go back to {P} country|r0');
add('入る','部屋に入る|enter the room|rp0');
add('入れる','!かばんに本を入れる|put a book in {P} bag|rh');
add('聞く','音楽を聞く|listen to music|rkl');
add('作る','ケーキを作る|make a cake|rhkl');
add('休む','学校を休む|miss school|p','ちょっと休む|take a short break|rhu');
add('読む','本を読む|read a book|rhklu','新聞を読む|read the newspaper|rk');
add('書く','手紙を書く|write a letter|rhkl');
add('話す','日本語を話す|speak Japanese|rkx');
add('知る','山田さんを知る|know Yamada-san|s');
add('来る','日本に来る|come to Japan|rx0');
add('住む','東京に住む|live in Tokyo|s');
add('売る','車を売る|sell {P} car|rh');
add('買う','本を買う|buy a book|rhk');
add('立つ','立つ|stand up|rp');
add('持つ','荷物を持つ|carry the bags|rh');
add('持ってくる','本を持ってくる|bring a book|rh');
add('歌う','歌を歌う|sing a song|rklx');
add('勉強する','日本語を勉強する|study Japanese|rklu');
add('働く','会社で働く|work at a company|ku');
add('起きる','!早く起きる|get up early|rk0');
add('起こす','子どもを起こす|wake the child up|rh');
add('使う','このペンを使う|use this pen|rhp');
add('早起きする','早起きする|get up early|k');
add('移住する','日本に移住する|move to Japan|qx');
add('上京する','上京する|move to Tokyo|q');

// ── nouns (things / abstract) ──
add('日本語','日本語を勉強する|study Japanese|rklu','日本語を話す|speak Japanese|rkx');
add('英語','英語を勉強する|study English|rklu','英語を話す|speak English|rkx');
add('水泳','水泳を習う|take swimming lessons|rku');
add('料金','料金を払う|pay the fee|rh');
add('半分','!ケーキを半分食べる|eat half of the cake|r');
add('富士山','富士山に登る|climb Mt. Fuji|rx');
add('地元','地元に帰る|go back to {P} hometown|r0');
add('見物','京都を見物する|go sightseeing in Kyoto|kx');
add('花見','公園で花見をする|enjoy cherry blossom viewing in the park|kx');
add('意見','先生に意見を聞く|ask the teacher for an opinion|r');
add('旅行','日本を旅行する|travel around Japan|kx');
add('出席','授業に出席する|attend class|r');
add('右折','ここで右折する|turn right here|rh');
add('左折','ここで左折する|turn left here|rh');
add('外','!外に出る|go outside|rp0');
add('会議','!会議に出る|attend the meeting|r');
add('敬語','敬語を使う|use polite language|rk');
add('文学','日本の文学を勉強する|study Japanese literature|rklu');
add('作文','作文を書く|write an essay|rh');
add('文化','日本の文化を勉強する|study Japanese culture|rklu');
add('文法','文法を勉強する|study grammar|rklu');
add('仕事','仕事を休む|miss work|p','仕事を探す|look for a job|k');
add('返事','返事を書く|write a reply|rh');
add('休み','休みを取る|take a day off|r');
add('言語学','言語学を勉強する|study linguistics|rklu');
add('方言','大阪の方言を話す|speak the Osaka dialect|rk');
add('言葉','!新しい言葉を覚える|learn new words|rku');
add('読書','読書をする|read books|kl');
add('名前','名前を書く|write {P} name|r');
add('氏名','氏名を書く|write {P} full name|r');
add('名字','名字を書く|write {P} family name|r');
add('家族','家族に会う|see {P} family|rklx');
add('話','話を聞く|listen to a story|r');
add('会話','会話を練習する|practice conversation|rklu');
add('中古','中古の車を買う|buy a used car|r');
add('住所','住所を書く|write {P} address|r');
add('買い物','買い物をする|go shopping|rkl');
add('道','道を聞く|ask for directions|r');
add('書道','書道を習う|learn calligraphy|rkux');
add('柔道','柔道を習う|learn judo|kux');
add('雪だるま','雪だるまを作る|make a snowman|rhkl');
add('手話','手話を勉強する|study sign language|rklu');
add('説明','説明を聞く|listen to the explanation|r');
add('映画','!映画を見る|watch a movie|rklx');
add('計画','計画を作る|make a plan|rhk');
add('歌','歌を歌う|sing a song|rklx');
add('国歌','国歌を歌う|sing the national anthem|rx');
add('歌舞伎','!歌舞伎を見る|watch Kabuki|rkx');
add('歌詞','!歌詞を覚える|learn the lyrics|r');
add('一人旅','一人旅をする|travel alone|kx');
add('昔話','昔話を聞く|listen to old tales|r');
add('お使い','お使いに行く|go on an errand|r0');
add('再起動','パソコンを再起動する|restart the computer|rh');
add('連休','連休に旅行する|travel during the long holiday|');
add('赤','赤を選ぶ|choose red|rh');
add('青','青を選ぶ|choose blue|rh');
add('白','白を選ぶ|choose white|rh');
add('景色','!景色を見る|look at the scenery|rkx');

// ── concrete things ──
add('時計','時計を買う|buy a watch|rh');
add('日記','日記を書く|write in {P} diary|rkl');
add('本','本を読む|read a book|rhklu','本を買う|buy a book|rhk');
add('花火','!花火を見る|watch the fireworks|rklx');
add('水','水を飲む|drink water|rhk');
add('水着','水着を買う|buy a swimsuit|rh');
add('木','木に登る|climb the tree|p');
add('お金','!お金をためる|save money|rk','お金を使う|spend money|rk');
add('地下鉄','地下鉄に乗る|take the subway|rkx');
add('電気','電気を消す|turn off the light|rh');
add('食べ物','食べ物を買う|buy food|rh');
add('食事','食事をする|have a meal|rkl');
add('朝食','!朝食を食べる|eat breakfast|rk');
add('飲み物','飲み物を買う|buy a drink|rh');
add('文字','文字を書く|write characters|rh');
add('新聞','新聞を読む|read the newspaper|rhk');
add('新幹線','新幹線に乗る|take the bullet train|rkx');
add('電車','電車に乗る|take the train|rk');
add('電話','!電話をかける|make a phone call|rh');
add('電子レンジ','電子レンジを使う|use the microwave|rhp');
add('車','車を買う|buy a car|rh','車を運転する|drive a car|rkux');
add('自転車','自転車に乗る|ride a bike|rkpx');
add('名刺','名刺を渡す|give {P} business card|rh');
add('白鳥','!白鳥を見る|see swans|x');
add('辞書','辞書を使う|use a dictionary|rhp');
add('教科書','教科書を読む|read the textbook|rh');
add('自動販売機','自動販売機で飲み物を買う|buy a drink from a vending machine|r');
add('雪','!雪を見る|see snow|rkx');
add('手紙','手紙を書く|write a letter|rhkl','!手紙を出す|mail a letter|rh');
add('紙','紙に名前を書く|write {P} name on the paper|r');
add('折り紙','折り紙を作る|make origami|rhkl');
add('漫画','漫画を読む|read manga|rhkl');
add('旅券','!旅券を見せる|show {P} passport|r');
add('牛乳','牛乳を飲む|drink milk|rhk');
add('牛肉','!牛肉を食べる|eat beef|rk');
add('口','!口を開ける|open {P} mouth|r');
add('手','手を洗う|wash {P} hands|rw');
add('右手','右手で書く|write with {P} right hand|k');
add('左手','左手で書く|write with {P} left hand|k');

// ── places: "go to X" for everything, plus a few typical activities ──
const PLACE={日本:'Japan',中国:'China',山:'a mountain',川:'the river',銀行:'the bank',食堂:'the cafeteria',東京:'Tokyo',関東:'the Kanto area',
 関西:'the Kansai area',南極:'Antarctica',東南アジア:'Southeast Asia',北極:'the North Pole',北海道:'Hokkaido',東北:'the Tohoku area',
 大使館:'the embassy',大学:'the university',学校:'school',外国:'a foreign country',韓国:'South Korea',京都:'Kyoto',小学校:'elementary school',
 会社:'the company',教会:'the church',神社:'the shrine',高校:'high school',中学校:'junior high school',中学:'junior high school',
 駐車場:'the parking lot',図書館:'the library',家:'home',売店:'the stand',町:'the town',国立大学:'the national university',
 私立高校:'the private high school',近所:'the neighborhood',病院:'the hospital',大学院:'graduate school',美容院:'the beauty parlor',
 映画館:'the movie theater',市役所:'city hall',市場:'the market',台所:'the kitchen',旅館:'the Japanese inn',私立大学:'the private university'};
for(const w in PLACE){
  const en=PLACE[w];
  const home=w==='家';
  if(home)continue;
  add(w,w+'に行く|go to '+en+'|'+(/^[A-Z]/.test(en)?'rx0':'r0'));
}
add('家','家で勉強する|study at home|rklu');
add('図書館','図書館で勉強する|study at the library|rklu');
add('大学','大学で日本語を勉強する|study Japanese at the university|rklu');
add('学校','学校で勉強する|study at school|ru');
add('食堂','!食堂で昼ご飯を食べる|eat lunch in the cafeteria|rk');
add('映画館','!映画館で映画を見る|watch a movie at the movie theater|rkl');
add('台所','台所で料理する|cook in the kitchen|rk');
add('駐車場','!駐車場に車を止める|park the car in the parking lot|rp');
add('売店','売店で飲み物を買う|buy a drink at the stand|r');
add('近所','近所を散歩する|take a walk in the neighborhood|rkl');
add('旅館','旅館に泊まる|stay at a Japanese inn|x');
add('山','山に登る|climb a mountain|rkx');
add('川','川で泳ぐ|swim in the river|kx');
add('会社','会社で働く|work at a company|ku');
add('銀行','銀行で働く|work at a bank|ku');
add('海外','海外に行く|go overseas|rkx0','海外に住む|live overseas|s');
add('国','国に帰る|go back to {P} country|r0');
for(const w of ['日本','中国','韓国','東京','京都','北海道','関西','関東','東北'])add(w,w+'に住む|live in '+PLACE[w]+'|s');
add('外国','外国に住む|live in a foreign country|s');
})();
