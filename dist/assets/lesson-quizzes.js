// A short quiz at the end of each French and Russian lesson, keyed by lesson id: [question, answer].
// Answers can list alternatives separated by " / "; the check ignores case, accents, stress marks and punctuation.
window.FN_LESSON_QUIZZES = {
  // French: Nicky's Notion subjects
  'french-present-continuous': [
    ['I’m (in the middle of) sleeping.', 'Je suis en train de dormir'],
    ['When you came, I was sleeping.', 'Quand tu es venu, j’étais en train de dormir / Quand tu es venue, j’étais en train de dormir'],
    ['When you come, I’ll be sleeping.', 'Quand tu vas venir, je serai en train de dormir / Quand tu viendras, je serai en train de dormir'],
    ['We’re eating (right now).', 'Nous sommes en train de manger / On est en train de manger'],
    ['Être en train de + …?', 'infinitif / infinitive']
  ],
  'french-just-did': [
    ['I just arrived.', 'Je viens d’arriver'],
    ['I just finished.', 'Je viens de terminer / Je viens de finir'],
    ['We just ate.', 'Nous venons de manger / On vient de manger'],
    ['She just left.', 'Elle vient de partir'],
    ['Venir de + …?', 'infinitif / infinitive']
  ],
  'french-futur-proche': [
    ['I’m going to eat.', 'Je vais manger'],
    ['We’re going to leave.', 'Nous allons partir / On va partir'],
    ['They’re going to sleep.', 'Ils vont dormir / Elles vont dormir'],
    ['Are you going to come? (tu)', 'Tu vas venir / Est-ce que tu vas venir'],
    ['Aller + …?', 'infinitif / infinitive']
  ],
  'french-subjunctive': [
    ['Il faut que tu … prudent. (être)', 'sois'],
    ['Il faut que je … (dormir)', 'dorme'],
    ['Il faut que nous … (partir)', 'partions'],
    ['The subjunctive endings, je to ils', '-e -es -e -ions -iez -ent'],
    ['although (two ways)', 'bien que / quoique'],
    ['unless', 'à moins que'],
    ['so that', 'pour que / afin que'],
    ['until', 'jusqu’à ce que / en attendant que'],
    ['for fear that', 'de peur que / de crainte que'],
    ['provided that', 'à condition que / pourvu que']
  ],
  'french-hypothesis': [
    ['Si + imparfait + …?', 'conditionnel présent'],
    ['Si + plus-que-parfait + … (a past that didn’t happen)', 'conditionnel passé'],
    ['If it’s nice today, I’ll go to the sea.', 'S’il fait beau aujourd’hui, j’irai à la mer'],
    ['If I had money, I would buy myself a Ferrari.', 'Si j’avais de l’argent, je m’achèterais une Ferrari'],
    ['If it had been nice, I would have gone to the sea.', 'S’il avait fait beau, je serais allé à la mer / S’il avait fait beau, je serais allée à la mer'],
    ['si + il = …', 's’il'],
    ['si + elle = …', 'si elle'],
    ['even if', 'même si'],
    ['as if', 'comme si'],
    ['unless (with si)', 'sauf si']
  ],
  'french-conditionnel-present': [
    ['I would speak.', 'je parlerais'],
    ['We would speak.', 'nous parlerions'],
    ['They would speak.', 'ils parleraient'],
    ['I would be.', 'je serais'],
    ['I would go.', 'j’irais'],
    ['I would like.', 'je voudrais'],
    ['I would see.', 'je verrais'],
    ['I would have.', 'j’aurais'],
    ['I could.', 'je pourrais'],
    ['I should.', 'je devrais']
  ],
  'french-conditionnel-passe': [
    ['I would have spoken.', 'J’aurais parlé'],
    ['I should have spoken.', 'J’aurais dû parler'],
    ['I would have gone. (a woman)', 'Je serais allée'],
    ['We would have eaten.', 'Nous aurions mangé / On aurait mangé'],
    ['Conditional of avoir or être + …?', 'participe passé / past participle']
  ],
  'french-pronouns': [
    ['to him / to her (indirect object)', 'lui'],
    ['to them (indirect object)', 'leur'],
    ['her (direct object)', 'la'],
    ['them (stressed, masculine)', 'eux'],
    ['myself', 'moi-même'],
    ['oneself', 'soi-même'],
    ['our (before a plural noun)', 'nos'],
    ['their (before a singular noun)', 'leur']
  ],
  'french-relative-pronouns': [
    ['La fille … parle.', 'qui'],
    ['Le livre … je lis.', 'que'],
    ['Le film … je parle.', 'dont'],
    ['Le jour … je suis arrivée.', 'où'],
    ['… j’ai besoin. (what I need)', 'ce dont'],
    ['… tu veux. (what you want)', 'ce que'],
    ['Le stylo avec … j’écris.', 'lequel'],
    ['La maison à côté de … j’habite.', 'laquelle'],
    ['à + lesquels = …', 'auxquels'],
    ['L’amie avec … je voyage.', 'qui / laquelle'],
    ['La décision … personne ne s’attendait.', 'à laquelle'],
    ['Le quartier au sein … se trouve le bureau.', 'duquel'],
    ['L’auteur … j’ai oublié le nom.', 'dont'],
    ['Des candidats, parmi … deux étrangers.', 'lesquels']
  ],
  // French: study notes
  'french-passe-compose-imparfait': [
    ['Je dormais quand le téléphone … (sonner)', 'a sonné'],
    ['Hier, j’… Marie. (voir)', 'ai vu'],
    ['Il … et j’étais fatiguée. (pleuvoir)', 'pleuvait'],
    ['Le dimanche, nous … chez ma grand-mère. (aller, a habit)', 'allions'],
    ['When I arrived, he had already left.', 'Quand je suis arrivée, il était déjà parti / Quand je suis arrivé, il était déjà parti'],
    ['After “tout à coup”: imparfait or passé composé?', 'passé composé'],
    ['After “d’habitude”: imparfait or passé composé?', 'imparfait'],
    ['If I had known, I would have come. (a woman)', 'Si j’avais su, je serais venue']
  ],
  'french-avoir-etre-agreement': [
    ['Je me suis … (lever, a woman)', 'levée'],
    ['Elle est … (partir)', 'partie'],
    ['La lettre que j’ai … (écrire)', 'écrite'],
    ['Elle s’est … les mains. (laver)', 'lavé'],
    ['Ils se sont … (parler)', 'parlé'],
    ['J’… sorti la poubelle.', 'ai'],
    ['Elle … montée.', 'est'],
    ['Tomber takes avoir or être?', 'être']
  ],
  'french-y-en': [
    ['Tu penses à ton voyage ? Oui, … pense.', 'j’y'],
    ['Je vais à Paris. … vais.', 'j’y'],
    ['J’ai besoin de ce livre. … ai besoin.', 'j’en'],
    ['Tu as des frères ? … ai deux.', 'j’en'],
    ['Je parle de Marie. Je parle …', 'd’elle'],
    ['I’m fed up.', 'J’en ai marre'],
    ['Don’t worry. (tu)', 'Ne t’en fais pas'],
    ['Let’s go!', 'On y va']
  ],
  'french-double-pronouns': [
    ['Il donne le livre à moi. Il … donne.', 'me le'],
    ['J’ai dit la vérité à Paul. Je … ai dite.', 'la lui'],
    ['Give it to me! (tu)', 'Donne-le-moi'],
    ['Tell it to him! (tu)', 'Dis-le-lui'],
    ['Don’t give it to me! (tu)', 'Ne me le donne pas'],
    ['Go away! (tu)', 'Va-t’en'],
    ['Give me some! (tu)', 'Donne-m’en'],
    ['There are some.', 'Il y en a']
  ],
  'french-futur-simple': [
    ['je … (parler)', 'parlerai'],
    ['tu … (finir)', 'finiras'],
    ['il … (prendre)', 'prendra'],
    ['nous … (être)', 'serons'],
    ['il … (falloir)', 'faudra'],
    ['j’… (envoyer)', 'enverrai'],
    ['When you come, we’ll go to the museum.', 'Quand tu viendras, on ira au musée / Quand tu viendras, nous irons au musée'],
    ['When I’ve finished, I’ll call you.', 'Quand j’aurai fini, je t’appellerai']
  ],
  'french-discours-indirect': [
    ['« Je suis fatiguée. » Elle a dit qu’elle … fatiguée.', 'était'],
    ['« Je viendrai. » Il a dit qu’il …', 'viendrait'],
    ['« J’ai perdu mes clés. » Elle a dit qu’elle … ses clés.', 'avait perdu'],
    ['« Est-ce que tu viens ? » Il demande … je viens.', 'si'],
    ['« Qu’est-ce que tu fais ? » Il demande … je fais.', 'ce que'],
    ['« Viens ! » Il m’a dit … venir.', 'de'],
    ['demain, in reported speech', 'le lendemain'],
    ['hier, in reported speech', 'la veille']
  ],
  'french-connecteurs': [
    ['although (+ subjonctif)', 'bien que'],
    ['whereas (+ indicatif)', 'alors que'],
    ['thanks to (a good cause)', 'grâce à'],
    ['because of (a bad cause)', 'à cause de'],
    ['so, as a result (spoken)', 'du coup'],
    ['in order that (+ subjonctif)', 'afin que / pour que'],
    ['however (formal)', 'cependant / pourtant / toutefois'],
    ['in short', 'bref / en somme']
  ],
  'french-slang': [
    ['money (slang)', 'le fric / la thune / le pognon / les sous / fric / thune / pognon'],
    ['work, a job (slang)', 'le boulot / boulot'],
    ['to work (slang)', 'bosser'],
    ['a guy', 'un mec / mec / un gars / gars'],
    ['clothes (slang)', 'des fringues / les fringues / fringues'],
    ['a mate', 'un pote / pote'],
    ['knackered', 'crevé / crevée'],
    ['to be starving', 'avoir la dalle'],
    ['can’t be bothered (avoir…)', 'avoir la flemme'],
    ['crazy, amazing (not verlan)', 'dingue / ouf'],
    ['fou, in verlan', 'ouf'],
    ['louche, in verlan', 'chelou'],
    ['lourd, in verlan', 'relou'],
    ['a party (verlan)', 'une teuf / teuf'],
    ['T’inquiète.', 'Don’t worry / No worries'],
    ['to stand someone up', 'poser un lapin / poser un lapin à quelqu’un'],
    ['to have a hangover', 'avoir la gueule de bois'],
    ['lol, in a French text', 'mdr'],
    ['That sucks.', 'Ça craint'],
    ['to get it, to understand (slang)', 'piger'],
    ['a car (slang)', 'une bagnole / une caisse / bagnole / caisse']
  ],
  // French: her class notes
  'french-past-lessons': [
    ['un remboursement', 'a refund / refund'],
    ['une arnaque', 'a scam / scam / scams'],
    ['faible', 'weak'],
    ['les effets secondaires', 'side effects'],
    ['une escale', 'a layover / layover'],
    ['les embouteillages', 'traffic / traffic jams'],
    ['un doctorat', 'a PhD / PhD / doctorate'],
    ['échapper', 'to escape / escape'],
    ['Pâques', 'Easter'],
    ['95, in letters', 'quatre-vingt-quinze'],
    ['la plupart', 'the majority / most'],
    ['jusqu’à', 'until'],
    ['l’ail', 'garlic'],
    ['les plats', 'dishes / the dishes']
  ],
  // Russian: Nicky's Notion pages
  'russian-wishes': [
    ['Have a good weekend!', 'Хороших выходных!'],
    ['Have a good day!', 'Хорошего дня!'],
    ['Have a good holiday! (to you)', 'Хороших вам каникул! / Хороших каникул!'],
    ['Have a good time in Moscow!', 'Хорошо провести время в Москве! / Наслаждайся Москвой!'],
    ['Наслаждаться takes which case?', 'instrumental / творительный / inst']
  ],
  'russian-describing-a-picture': [
    ['The painting depicts…', 'На картине изображено'],
    ['In the photo you can see…', 'На фотографии видно'],
    ['In front of us (is)…', 'Перед нами'],
    ['In the foreground…', 'На переднем плане'],
    ['In the background…', 'На заднем плане'],
    ['In the center there is…', 'В центре расположен'],
    ['On the right there is…', 'Справа находится'],
    ['The composition is built around…', 'Композиция построена вокруг']
  ],
  'russian-discourse-words': [
    ['You did go there, after all. (with ведь)', 'Ты ведь туда ходил'],
    ['But you wrote it down, didn’t you? (with ведь)', 'Ты ведь его записывал / Ты ведь записывал'],
    ['Filler words are often called…', 'слова-паразиты'],
    ['Which ancient people began almost every sentence with «ну»?', 'the Hittites / Hittites / хетты / древние хетты']
  ],
  // Russian: study notes
  'russian-participles': [
    ['читать: active present participle', 'читающий'],
    ['читать: active past participle', 'читавший'],
    ['прочитать: passive past participle', 'прочитанный'],
    ['любить: passive present participle', 'любимый'],
    ['Девушка, сидящая у окна = девушка, которая … у окна.', 'сидит'],
    ['The shop is closed.', 'Магазин закрыт'],
    ['The tickets are sold.', 'Билеты проданы'],
    ['former (a participle that became an adjective)', 'бывший']
  ],
  'russian-verbal-adverbs': [
    ['читать: imperfective verbal adverb', 'читая'],
    ['говорить: imperfective verbal adverb', 'говоря'],
    ['учиться: imperfective verbal adverb', 'учась'],
    ['прочитать: perfective verbal adverb', 'прочитав'],
    ['вернуться: perfective verbal adverb', 'вернувшись'],
    ['прийти: perfective verbal adverb', 'придя'],
    ['honestly speaking', 'честно говоря'],
    ['judging by', 'судя по']
  ],
  'russian-motion-figurative': [
    ['to marry (of a woman)', 'выйти замуж'],
    ['to come to, to come round', 'прийти в себя'],
    ['to switch to ты', 'перейти на ты'],
    ['to retire', 'уйти на пенсию'],
    ['It finally sank in. (for me)', 'До меня дошло'],
    ['That suits me.', 'Это мне подходит / Мне это подходит'],
    ['to do without', 'обойтись без'],
    ['I was lucky.', 'Мне повезло'],
    ['to behave', 'вести себя'],
    ['to give an example', 'привести пример']
  ],
  'russian-aspect': [
    ['Close the door! (one request, ты)', 'Закрой дверь'],
    ['Don’t close the door. (ты)', 'Не закрывай дверь'],
    ['Don’t be late! (a warning, ты)', 'Не опоздай'],
    ['Come in! (an invitation, вы)', 'Входите'],
    ['You can’t smoke here.', 'Здесь нельзя курить'],
    ['We shouldn’t have gone.', 'Не надо было нам идти'],
    ['Which aspect after перестать?', 'imperfective / несовершенный / несовершенный вид'],
    ['I’m not going to do it. (стать)', 'Я не стану это делать']
  ],
  'russian-modality': [
    ['I must go.', 'Я должна идти / Я должен идти / Мне надо идти / Мне нужно идти / Мне пора идти / Я должна уйти / Я должен уйти / Мне надо уйти / Мне нужно уйти'],
    ['Мне ___ новое пальто. (I need a new coat)', 'нужно'],
    ['Ей ___ помощь. (She needs help)', 'нужна'],
    ['Нам ___ билеты. (We need tickets)', 'нужны'],
    ['I needed a dictionary.', 'Мне был нужен словарь / Мне нужен был словарь / Словарь был мне нужен / Мне был нужен словарик / Мне нужен был словарик'],
    ['I should have taken an umbrella.', 'Надо было взять зонт / Надо было взять зонтик / Мне надо было взять зонт / Мне надо было взять зонтик / Нужно было взять зонт / Нужно было взять зонтик / Мне нужно было взять зонт / Мне нужно было взять зонтик / Следовало взять зонт / Следовало взять зонтик / Мне следовало взять зонт / Мне следовало взять зонтик / Я должна была взять зонт / Я должна была взять зонтик / Я должен был взять зонт / Я должен был взять зонтик / Зря я не взяла зонт / Зря я не взял зонт'],
    ['He was supposed to come at five.', 'Он должен был прийти в пять / Он должен был прийти в пять часов / Он должен был прийти к пяти / Он должен был прийти в 5 / Он должен был приехать в пять'],
    ['We had to leave.', 'Нам пришлось уйти / Нам пришлось уехать / Нам надо было уйти / Нам нужно было уйти / Мы должны были уйти / Мы должны были уехать'],
    ['You’ll have to wait.', 'Тебе придётся подождать / Тебе придется подождать / Тебе придётся ждать / Тебе нужно будет подождать / Тебе надо будет подождать / Вам придётся подождать / Вам придется подождать / Вам придётся ждать / Вам нужно будет подождать / Вам надо будет подождать / Ты должен будешь подождать / Ты должна будешь подождать / Вы должны будете подождать'],
    ['You ought to apologise.', 'Тебе следует извиниться / Тебе следовало бы извиниться / Тебе стоит извиниться / Тебе стоило бы извиниться / Тебе надо извиниться / Тебе нужно извиниться / Вам следует извиниться / Вам следовало бы извиниться / Вам стоит извиниться / Вам стоило бы извиниться / Вам надо извиниться / Вам нужно извиниться / Ты должен извиниться / Ты должна извиниться / Вы должны извиниться'],
    ['You shouldn’t have said that.', 'Не стоило тебе этого говорить / Не стоило тебе это говорить / Тебе не стоило этого говорить / Тебе не стоило это говорить / Не стоило этого говорить / Не стоило это говорить / Не надо было этого говорить / Не надо было это говорить / Тебе не надо было этого говорить / Тебе не надо было это говорить / Не нужно было этого говорить / Не нужно было это говорить / Тебе не нужно было этого говорить / Тебе не нужно было это говорить / Не следовало этого говорить / Не следовало это говорить / Тебе не следовало этого говорить / Тебе не следовало это говорить / Ты не должен был этого говорить / Ты не должен был это говорить / Ты не должна была этого говорить / Ты не должна была это говорить / Зря ты это сказал / Зря ты это сказала / Зря ты сказал это / Зря ты сказала это'],
    ['I shouldn’t have said that.', 'Зря я это сказала / Зря я это сказал / Зря я сказала это / Зря я сказал это / Я зря это сказала / Я зря это сказал / Не надо было мне этого говорить / Не надо было мне это говорить / Мне не надо было этого говорить / Мне не надо было это говорить / Не нужно было мне этого говорить / Не нужно было мне это говорить / Мне не нужно было этого говорить / Мне не нужно было это говорить / Мне не стоило этого говорить / Мне не стоило это говорить / Не стоило мне этого говорить / Не стоило мне это говорить / Мне не следовало этого говорить / Мне не следовало это говорить / Я не должна была этого говорить / Я не должна была это говорить / Я не должен был этого говорить / Я не должен был это говорить'],
    ['You could have called!', 'Ты мог бы позвонить / Ты могла бы позвонить / Мог бы позвонить / Могла бы позвонить / Вы могли бы позвонить / Мог бы и позвонить / Могла бы и позвонить / Ты мог бы и позвонить / Ты могла бы и позвонить'],
    ['He must be tired.', 'Он, должно быть, устал / Должно быть, он устал / Он, наверное, устал / Наверное, он устал / Он, наверно, устал / Он, видимо, устал / Видимо, он устал'],
    ['You don’t have to come.', 'Тебе не обязательно приходить / Тебе не нужно приходить / Тебе не надо приходить / Тебе не обязательно прийти / Вам не обязательно приходить / Вам не нужно приходить / Вам не надо приходить / Вам не обязательно прийти'],
    ['Which aspect after нельзя means “impossible”?', 'perfective / совершенный / совершенный вид']
  ],
  'russian-word-building': [
    ['to eat your fill', 'наесться'],
    ['to burst out laughing', 'засмеяться'],
    ['to have a little sleep', 'поспать'],
    ['to finish reading', 'дочитать'],
    ['to count again', 'пересчитать'],
    ['to underestimate', 'недооценить'],
    ['childhood', 'детство'],
    ['trusting (from доверять)', 'доверчивый'],
    ['a little house', 'домик']
  ],
  'russian-numerals': [
    ['two roubles', 'два рубля'],
    ['five roubles', 'пять рублей'],
    ['twenty-one books', 'двадцать одна книга'],
    ['with two friends', 'с двумя друзьями'],
    ['both brothers', 'оба брата'],
    ['a year and a half', 'полтора года'],
    ['about five years', 'лет пять'],
    ['There were three of us.', 'Нас было трое']
  ],
  'russian-register': [
    ['является, in speech', 'это'],
    ['приобрести, in speech', 'купить'],
    ['данный, in speech', 'этот'],
    ['в настоящее время, in speech', 'сейчас'],
    ['проживать, in speech', 'жить'],
    ['трудиться, in speech', 'работать'],
    ['I did say so! (a woman, with же)', 'Я же сказала!'],
    ['Did you really not know? (surprise)', 'Неужели ты не знал? / Неужели ты не знала? / Разве ты не знал?']
  ],
  // Linguistics: study notes
  'ling-phonetics': [
    ['[b]: voicing, place and manner', 'voiced bilabial plosive / voiced bilabial stop'],
    ['[ʃ]: voicing, place and manner', 'voiceless postalveolar fricative'],
    ['The symbol for a voiced velar nasal (sing)', 'ŋ'],
    ['Russian ы, in the IPA', 'ɨ'],
    ['French tu has which vowel symbol?', 'y'],
    ['What does [ʲ] mark?', 'palatalisation / palatalization'],
    ['The puff of air in English pin is called…', 'aspiration'],
    ['Square brackets or slashes for phonemic transcription?', 'slashes'],
    ['The mid central vowel is called…', 'schwa'],
    ['The IPA mark for a long sound', 'ː']
  ],
  'ling-phonology': [
    ['Two words that differ in one sound only', 'a minimal pair / minimal pair'],
    ['Predictable variants of one phoneme are called…', 'allophones'],
    ['Two sounds that never occur in the same place are in … distribution', 'complementary'],
    ['Russian город ends in [t]. The process?', 'final devoicing'],
    ['in + possibile → impossibile. The process?', 'assimilation'],
    ['Latin hominem → Spanish hombre (b added). The process?', 'epenthesis'],
    ['The rules for which sound clusters a language allows', 'phonotactics'],
    ['In cat, [t] is the syllable’s…', 'coda'],
    ['In Hindi, [p] and [pʰ] are separate…', 'phonemes']
  ],
  'ling-morphology': [
    ['The smallest unit with meaning', 'morpheme / a morpheme'],
    ['How many morphemes in unbreakable?', '3 / three'],
    ['A variant of a morpheme, like [s] [z] [ɪz]', 'allomorph / an allomorph'],
    ['read → reader: inflection or derivation?', 'derivation'],
    ['go, went: the process?', 'suppletion'],
    ['sing, sang, sung: the process?', 'ablaut'],
    ['Latin pe-pul-ī: the process?', 'reduplication'],
    ['German ge-spiel-t: the process?', 'circumfixation'],
    ['Turkish ev-ler-im-de: which type of language?', 'agglutinative'],
    ['One ending, several meanings at once (Russian -ам)', 'fusional']
  ],
  'ling-syntax': [
    ['The word that gives a phrase its type', 'head / the head'],
    ['The most common word order in the world’s languages', 'SOV'],
    ['Irish and Welsh word order', 'VSO'],
    ['Russian без + genitive: agreement or government?', 'government'],
    ['le case bianche, all feminine plural: agreement or government?', 'agreement'],
    ['OV languages tend to have prepositions or postpositions?', 'postpositions'],
    ['Optional detail like quickly in eat quickly', 'adjunct / an adjunct'],
    ['A group of words that works as a unit', 'constituent / a constituent / phrase']
  ],
  'ling-alignment': [
    ['The four alignment types in Harris & Campbell', 'ergative, active, accusative, double oblique / ergative active accusative double oblique'],
    ['In an ergative language the verb agrees with the … argument', 'absolutive'],
    ['A split by tense or aspect: the ergative is always in the…', 'past / perfect / past tense or perfect aspect / perfective'],
    ['Dyirbal: pronouns behave … , common nouns ergatively', 'accusatively / accusative'],
    ['Assigning a new structure to a sentence without changing its form', 'reanalysis'],
    ['Iranian ergativity comes from the reanalysis of…', 'passives / the passive / perfective passives'],
    ['Kartvelian: the imperfective became accusative through the…', 'antipassive'],
    ['I shot at the deer is an English…', 'antipassive'],
    ['Proto-Cariban ergativity came from…', 'nominalizations / nominalisations'],
    ['Hittite ergative neuters came from the reanalysis of…', 'instrumentals / the instrumental / ablative as instrumental'],
    ['Tabassaran verb accusativity came from…', 'topic-copying pronouns / topic copy pronouns'],
    ['Du Bois’s tendency to avoid new information in A', 'Preferred Argument Structure / PAS'],
    ['The Mayan language Du Bois studied', 'Sacapultec'],
    ['Rošani (Pamir): subject and object of transitives both oblique', 'double oblique'],
    ['Choctaw: accusative case marking, … verb agreement', 'active'],
    ['Sₐ is the subject of an … intransitive verb', 'active / agentive / active/agentive']
  ],
  'ling-comparative-syntax': [
    ['The argument that children learn rules they never hear evidence for', 'poverty of the stimulus / the poverty of the stimulus'],
    ['Fixed principles plus switches with a few settings', 'principles and parameters'],
    ['Italian Parla, with no subject: the parameter?', 'null subject / pro-drop / null-subject'],
    ['Chinese leaves question words in place. This is called…', 'wh in situ / wh-in-situ / in situ'],
    ['German Gestern habe ich…: the verb is…', 'second / V2 / verb second'],
    ['French Jean embrasse souvent Marie shows the verb has…', 'moved / verb movement / raised'],
    ['Comparing close dialects one difference at a time (Kayne)', 'microparameters / microparametric syntax'],
    ['All variation lies in functional features of the lexicon: the … conjecture', 'Borer-Chomsky / Borer Chomsky'],
    ['The one operation of Minimalism', 'Merge'],
    ['Unstressed clitics in second position: … law', 'Wackernagel’s / Wackernagel']
  ],
  'ling-semantics-pragmatics': [
    ['Rose is a … of flower', 'hyponym'],
    ['Wheel is a … of car', 'meronym'],
    ['One word, related meanings (the mouth of a river)', 'polysemy'],
    ['Same reference, different sense: the morning star and…', 'the evening star / evening star'],
    ['The king of France is bald takes for granted there is a king. This is a…', 'presupposition'],
    ['Words like I, here, now, whose meaning depends on the situation', 'deixis / deictics'],
    ['Can you pass the salt? is an … speech act', 'indirect'],
    ['Grice’s maxim: be relevant', 'relation'],
    ['Grice’s maxim: say as much as is needed', 'quantity'],
    ['Some of the students passed suggests not all did. This inference is an…', 'implicature']
  ],
  'ling-historical': [
    ['PIE *p → Germanic …', 'f'],
    ['The law that explains Gothic fadar beside broþar', 'Verner’s law / Verner'],
    ['*s → š after r, u, k, i', 'the ruki rule / ruki rule / ruki'],
    ['Latin vita → Spanish vida [ˈbiða]: the change?', 'lenition'],
    ['Old English brid → bird: the change?', 'metathesis'],
    ['helpan, healp → help, helped: sound change or analogy?', 'analogy'],
    ['Who said sound laws have no exceptions (1870s)?', 'the Neogrammarians / Neogrammarians'],
    ['Latin cantare habeo → Italian canterò: the process?', 'grammaticalisation / grammaticalization'],
    ['deer once meant any animal: broadening or narrowing?', 'narrowing'],
    ['The symbol that marks a reconstructed form', '*']
  ],
  'ling-families-typology': [
    ['The family of Swahili, Yoruba and Zulu', 'Niger-Congo'],
    ['The family of Finnish and Hungarian', 'Uralic'],
    ['The family of Malay, Tagalog and Māori', 'Austronesian'],
    ['A language with no known relatives', 'isolate / an isolate / language isolate'],
    ['A European isolate', 'Basque'],
    ['The branch of Hittite', 'Anatolian'],
    ['Latin centum, Avestan satəm: the two groups', 'centum and satem'],
    ['Unrelated languages grown alike through contact', 'Sprachbund / a Sprachbund'],
    ['A pidgin that children learn as a first language becomes a…', 'creole'],
    ['If a language is VSO, it has…', 'prepositions']
  ],
  'ling-sociolinguistics': [
    ['A variety tied to a region', 'dialect / a dialect'],
    ['A variety tied to a social group', 'sociolect / a sociolect'],
    ['A variety tied to a situation (formal, casual)', 'register / a register'],
    ['Who studied r in New York department stores?', 'Labov / William Labov'],
    ['Non-standard forms valued for solidarity have … prestige', 'covert'],
    ['Two varieties with separate jobs, high and low', 'diglossia'],
    ['Moving between languages in one conversation', 'code-switching / code switching'],
    ['“A language is a dialect with an army and navy.” Who?', 'Max Weinreich / Weinreich'],
    ['Pronouns like tu / vous, ты / вы are called…', 'T-V pronouns / TV pronouns / T and V pronouns / T-V / T and V']
  ],
  'ling-writing-systems': [
    ['A script of consonants only, vowels optional', 'abjad / an abjad'],
    ['A consonant with an inherent vowel, changed by marks (Devanagari)', 'abugida / an abugida'],
    ['Japanese kana and Linear B are…', 'syllabaries / syllabary / a syllabary'],
    ['Korean Hangul is a … script', 'featural'],
    ['Who deciphered Linear B?', 'Michael Ventris / Ventris'],
    ['Linear B turned out to be…', 'Mycenaean Greek / Greek'],
    ['Who deciphered Egyptian hieroglyphs?', 'Champollion / Jean-François Champollion'],
    ['Who showed Hittite was Indo-European?', 'Hrozný / Bedřich Hrozný / Hrozny'],
    ['The script behind Devanagari and the Tocharian script', 'Brāhmī / Brahmi'],
    ['Alternating direction, like an ox ploughing', 'boustrophedon']
  ],
  // Silver Age poetry: Nicky's lessons
  'silver-age-lesson-1': [
    ['Roughly when was the Silver Age?', '1890s–1920s / 1890s to 1920s / 1890-1920s'],
    ['The age of Pushkin and Gogol', 'the Golden Age / Golden Age'],
    ['Who made the term Silver Age established, in the 1920s–1930s?', 'émigré critics / emigre criticism / émigré criticism'],
    ['Acmeism comes from the Greek akmē, meaning…', 'peak / highest point / peak or highest point'],
    ['The most radical movement, breaking with the past', 'Futurism'],
    ['The Futurist manifesto of 1912', 'A Slap in the Face of Public Taste'],
    ['Literacy among people aged ten and over in 1897', '26.5% / 26.5 / about a quarter'],
    ['Fyodor Sologub’s novel of the darker psyche', 'The Petty Demon'],
    ['Andreyev’s story inspired by real political executions', 'The Seven Who Were Hanged'],
    ['The year Bunin emigrated', '1920']
  ],
  'silver-age-lesson-2': [
    ['Symbolism challenged the dominance of…', 'Realism'],
    ['Four French Symbolists', 'Baudelaire, Verlaine, Rimbaud, Mallarmé / Baudelaire Verlaine Rimbaud Mallarme'],
    ['Symbolists rejected utilitarian art for…', 'art for the sake of art / pure art / art for art’s sake'],
    ['Merezhkovsky’s essay of 1893 was On the Causes of the…', 'Decline / Decline and on the New Trends in Contemporary Russian Literature'],
    ['Who brought French Symbolism over to Russia?', 'Bryusov / Valery Bryusov'],
    ['Balmont’s collection of 1903', 'Let Us Be Like the Sun'],
    ['Whom did Balmont introduce in Russia?', 'Edgar Allan Poe / Poe'],
    ['The theorist of collective memory, with gatherings at the Tower', 'Vyacheslav Ivanov / Ivanov'],
    ['Westernisers vs …', 'Slavophiles'],
    ['Decadence is resistance to…', 'bourgeois respectability']
  ],
  // Silver Age poetry: study notes
  'silver-age-bely-ivanov': [
    ['Ivanov’s salon on Tavricheskaya Street was called…', 'the Tower / Башня / Tower'],
    ['The philosopher behind the younger Symbolists', 'Vladimir Solovyov / Solovyov'],
    ['The Greek god Ivanov saw as a forerunner of Christ', 'Dionysus'],
    ['Andrei Bely’s real name', 'Boris Bugaev / Bugaev'],
    ['Bely’s novel with a bomb in a sardine tin', 'Petersburg / Петербург'],
    ['Bely followed Rudolf Steiner’s…', 'anthroposophy'],
    ['“A realibus ad realiora”: whose motto?', 'Ivanov / Vyacheslav Ivanov']
  ],
  'silver-age-gumilev': [
    ['The movement Gumilev founded', 'Acmeism / акмеизм'],
    ['The group he founded in 1911', 'Guild of Poets / Цех поэтов / the Guild of Poets'],
    ['The journal that printed the Acmeist manifestos (1913)', 'Apollon / Аполлон'],
    ['His poem about an animal by Lake Chad', 'The Giraffe / Жираф / Giraffe'],
    ['Where he travelled several times', 'Abyssinia / Africa / East Africa / Ethiopia'],
    ['The year he was shot', '1921'],
    ['Заблудившийся трамвай in English', 'The Lost Tram / Lost Tram']
  ],
  'silver-age-akhmatova': [
    ['Akhmatova’s real surname', 'Gorenko'],
    ['Her first book (1912)', 'Evening / Вечер'],
    ['Her cycle for the women outside the Leningrad prisons', 'Requiem / Реквием'],
    ['“А это вы можете описать?” Her answer', 'Могу / I can'],
    ['The party official who called her “half nun, half harlot”', 'Zhdanov / Андрей Жданов / Andrei Zhdanov'],
    ['The painter who drew her in Paris', 'Modigliani'],
    ['The long poem she rewrote for twenty-five years', 'Poem without a Hero / Поэма без героя']
  ],
  'silver-age-mandelstam': [
    ['Mandelstam’s definition of Acmeism: nostalgia for…', 'world culture'],
    ['His first book (1913)', 'Stone / Камень'],
    ['His second book, titled after Ovid', 'Tristia'],
    ['The poem that led to his arrest was an epigram on…', 'Stalin'],
    ['The town of his exile and its notebooks', 'Voronezh'],
    ['His widow, who kept his poems by heart', 'Nadezhda Mandelstam / Nadezhda'],
    ['His essay on the Italian poet', 'Conversation about Dante / Разговор о Данте']
  ],
  'silver-age-tsvetaeva': [
    ['Tsvetaeva’s father founded which museum?', 'the Pushkin Museum / Pushkin Museum of Fine Arts / Pushkin Museum'],
    ['Her first book (1910)', 'Evening Album / Вечерний альбом'],
    ['Her husband', 'Sergei Efron / Efron'],
    ['The year she emigrated', '1922'],
    ['The town where she died in 1941', 'Yelabuga / Елабуга / Elabuga'],
    ['The punctuation mark her poems are known for', 'the dash / dash / dashes'],
    ['The German poet she wrote to in 1926', 'Rilke / Rainer Maria Rilke']
  ],
  'silver-age-futurists': [
    ['The 1912 manifesto: A Slap in the Face of…', 'Public Taste'],
    ['Throw Pushkin off the steamship of…', 'modernity'],
    ['Beyond-sense language', 'zaum / заумь'],
    ['“Дыр бул щыл”: whose lines?', 'Kruchenykh / Alexei Kruchenykh'],
    ['Khlebnikov’s poem built on смех', 'Incantation by Laughter / Заклятие смехом'],
    ['Mayakovsky’s A Cloud in…', 'Trousers'],
    ['The 1913 Futurist opera', 'Victory over the Sun / Победа над Солнцем'],
    ['The leader of the Ego-Futurists', 'Igor Severyanin / Severyanin']
  ],
  'silver-age-pasternak': [
    ['Pasternak’s 1917 book: My Sister…', 'Life / Сестра моя — жизнь'],
    ['The German university where he studied philosophy', 'Marburg'],
    ['The composer who encouraged his music', 'Scriabin'],
    ['The publisher of Doctor Zhivago in Milan', 'Feltrinelli / Giangiacomo Feltrinelli'],
    ['The year of his Nobel Prize', '1958'],
    ['“Свеча горела на столе…”: the poem’s title', 'Зимняя ночь / Winter Night'],
    ['Two works he translated', 'Hamlet / Faust / King Lear / Hamlet and Faust']
  ],
  'silver-age-stray-dog': [
    ['Бродячая собака in English', 'The Stray Dog / Stray Dog'],
    ['When it opened', 'New Year’s Eve 1911 / 1911 / 1912 / 31 December 1911'],
    ['The actor who ran it', 'Boris Pronin / Pronin'],
    ['What artists called the rich guests', 'pharmacists / фармацевты'],
    ['The book where guests wrote verses', 'the Pig Book / Свиная книга / pig-leather book'],
    ['Mayakovsky’s insulting poem read there in 1915', 'Вам! / To You!'],
    ['Its successor (1916–1919)', 'The Comedians’ Halt / Привал комедиантов']
  ],
  'silver-age-one-poem': [
    ['бессонница', 'insomnia'],
    ['тугие паруса', 'taut sails / tight sails'],
    ['список кораблей', 'the catalogue of ships / catalogue of ships / list of ships'],
    ['журавлиный клин', 'a wedge of cranes / wedge of cranes'],
    ['Когда бы не Елена…', 'if it were not for Helen / if not for Helen'],
    ['изголовье', 'the head of a bed / head of the bed'],
    ['“Всё движется любовью” echoes which poet?', 'Dante'],
    ['The metre of the poem', 'iambic hexameter']
  ],
  // Tocharian: study notes
  'tocharian-big-picture': [
    ['Who showed in 1908 that Tocharian was Indo-European?', 'Sieg and Siegling / Sieg & Siegling'],
    ['Centum or satem?', 'centum'],
    ['“hundred” in Tocharian B', 'kante'],
    ['Roughly which centuries are the manuscripts from?', '5th to 8th / 5th–8th / fifth to eighth'],
    ['Another name for Tocharian A', 'Agnean'],
    ['Another name for Tocharian B', 'Kuchean'],
    ['The steppe culture often linked with Tocharian', 'Afanasievo']
  ],
  'tocharian-brahmi': [
    ['The script variety', 'North Turkestan Brāhmī / slanting Brāhmī / North Turkestan Brahmi'],
    ['The extra signs for consonant + ä', 'Fremdzeichen'],
    ['The vowel every consonant sign carries', 'a'],
    ['A script where vowels are marks on consonants', 'abugida'],
    ['ṣ is a … s', 'retroflex'],
    ['ś is a … s', 'palatal']
  ],
  'tocharian-a-b': [
    ['“father” in A', 'pācar'],
    ['“father” in B', 'pācer'],
    ['“horse” in B', 'yakwe'],
    ['“horse” in A', 'yuk'],
    ['“two” in B', 'wi'],
    ['“name” in B', 'ñem'],
    ['Which one was probably no longer spoken?', 'A / Tocharian A'],
    ['Whose dictionary covers B?', 'Adams / Douglas Q. Adams']
  ],
  'tocharian-sound-changes': [
    ['PIE *p, *b and *bʰ all give…', 'p'],
    ['PIE *ḱ in Tocharian becomes…', 'k'],
    ['t before an old front vowel becomes…', 'c'],
    ['k before an old front vowel becomes…', 'ś'],
    ['s before an old front vowel becomes…', 'ṣ'],
    ['The new central vowel found everywhere', 'ä'],
    ['Which variety drops more unstressed vowels?', 'A / Tocharian A']
  ],
  'tocharian-nouns': [
    ['The three primary cases', 'nominative, oblique, genitive / nominative oblique genitive'],
    ['Secondary cases are built on the…', 'oblique'],
    ['B comitative ending', '-mpa / mpa'],
    ['B locative ending', '-ne / ne'],
    ['B perlative ending', '-sa / sa'],
    ['The case ending put only on the last of joined nouns', 'Gruppenflexion / group inflection'],
    ['The gender masculine in the singular, feminine in the plural', 'alternating / genus alternans / alternans'],
    ['B’s number for natural pairs', 'paral']
  ],
  'tocharian-verbs': [
    ['The three main stems to learn', 'present, subjunctive, preterite / present subjunctive preterite'],
    ['The mediopassive ending of the 3rd person singular', '-tär / tär'],
    ['The B gerundive suffix', '-lle / lle'],
    ['The infinitive ending', '-tsi / tsi'],
    ['“to make someone do”: the … form', 'causative'],
    ['The standard elementary book (Krause and Thomas)', 'Tocharisches Elementarbuch']
  ],
  'tocharian-b-text': [
    ['The online edition of Tocharian texts', 'CEToM'],
    ['“daughter” in B', 'tkācer'],
    ['“teacher” in B', 'käṣṣi'],
    ['“who” in B', 'kuse'],
    ['Short secular B documents from Kucha, good for beginners', 'caravan passes / the caravan passes'],
    ['The B ending for “in”', '-ne / ne']
  ],
  'tocharian-punyavanta': [
    ['Puṇyavant argues that the best quality is…', 'merit / puṇya / punya'],
    ['Which language is the jātaka in?', 'A / Tocharian A'],
    ['The brother of skill in the arts', 'Śilpavant / Silpavant'],
    ['The brother of wisdom', 'Prajñāvant / Prajnavant'],
    ['Who is Puṇyavant in a past life?', 'the Buddha / Buddha / the future Buddha'],
    ['Whose dictionary is for A?', 'Carling / Gerd Carling']
  ],
  'tocharian-manuscripts': [
    ['The Berlin collection is called the … collection', 'Turfan'],
    ['The Paris collection, from Kucha', 'Pelliot / the Pelliot collection'],
    ['The British Library collections', 'Stein and Hoernle / Stein / Hoernle'],
    ['The online archive of Silk Road manuscripts', 'IDP / International Dunhuang Programme'],
    ['The long, narrow Indian page format', 'pothi']
  ],
  // Avestan: study notes
  'avestan-big-picture': [
    ['The religion of the Avesta', 'Zoroastrianism'],
    ['The five hymns attributed to Zarathustra', 'the Gāthās / Gathas / Gāthās'],
    ['Old Avestan or Young Avestan: the Yashts?', 'Young Avestan / Young'],
    ['Under which dynasty were the texts written down?', 'Sasanian / the Sasanians / Sassanian'],
    ['Who brought the manuscripts to Paris in 1762?', 'Anquetil-Duperron / Anquetil'],
    ['The date of the oldest manuscript', '1323'],
    ['The other attested Old Iranian language', 'Old Persian']
  ],
  'avestan-script': [
    ['Direction of writing', 'right to left'],
    ['The script it was made from', 'Book Pahlavi / Pahlavi'],
    ['About how many letters?', '53'],
    ['What Pahlavi did not write, but Avestan does', 'vowels / every vowel'],
    ['What separates words', 'a dot / dot / dots']
  ],
  'avestan-sounds': [
    ['Vedic sóma in Avestan', 'haoma'],
    ['Vedic ásura in Avestan', 'ahura'],
    ['Vedic hásta in Avestan', 'zasta'],
    ['Vedic dáśa in Avestan', 'dasa'],
    ['Vedic mitrá in Avestan', 'miθra / mithra'],
    ['PII *s before a vowel becomes…', 'h'],
    ['Vedic bhávati in Avestan', 'bauuaiti / bavaiti']
  ],
  'avestan-vedic': [
    ['Vedic yajñá in Avestan', 'yasna'],
    ['Vedic ṛtá in Avestan', 'aša / asha'],
    ['Vedic devá means god; Avestan daēuua means…', 'demon'],
    ['The Wise Lord', 'Ahura Mazdā / Ahura Mazda'],
    ['Vedic áśva in Avestan', 'aspa / asp-'],
    ['Vedic átharvan, the fire priest, in Avestan', 'āθrauuan / athravan'],
    ['Vedic bhrā́tar in Avestan', 'brātar']
  ],
  'avestan-nouns-verbs': [
    ['How many cases?', '8 / eight'],
    ['How many numbers?', '3 / three'],
    ['“I” in Avestan', 'azəm / azem'],
    ['The tenseless form common in Old Avestan', 'injunctive'],
    ['The Avestan for Vedic bhárati', 'baraiti'],
    ['The suffix of the passive', '-ya- / ya']
  ],
  'avestan-ahuna-vairya': [
    ['The first words: yaθā ahū…', 'vairiiō / vairyo'],
    ['ratu-', 'judge / spiritual leader / time'],
    ['aša-', 'truth / order'],
    ['xšaθra-', 'power / rule'],
    ['vohu- manah-', 'good thought'],
    ['drigu-', 'poor'],
    ['How many words, said to match the books of the Avesta?', '21 / twenty-one']
  ],
  'avestan-gathas': [
    ['mainiiu-', 'spirit'],
    ['yə̄ma-', 'twin'],
    ['xᵛafna-', 'sleep / dream'],
    ['The Zoroastrian triad: thought, word and…', 'deed'],
    ['Good thoughts, good words, good deeds in Avestan', 'humata, hūxta, huuaršta / humata hukhta hvarshta'],
    ['Syllables per line in the Ahunauuaitī Gāθā', '16 / sixteen']
  ],
  'avestan-yasht': [
    ['How many Yashts?', '21 / twenty-one'],
    ['Yašt 5 praises the goddess of the waters', 'Anāhitā / Arədvī Sūrā Anāhitā / Anahita'],
    ['The god of the contract (Yašt 10)', 'Miθra / Mithra'],
    ['Tištriia is the star…', 'Sirius'],
    ['The demon of drought', 'Apaoša / Apaosha'],
    ['The Persian epic that retells the kings of Yašt 19', 'Shāhnāmeh / Shahnameh'],
    ['“I will worship”', 'yazāi / yazai']
  ],
  // Opera: study notes
  'opera-study-orfeo': [
    ['Where and when was L’Orfeo first performed?', 'Mantua, 1607 / Mantua 1607 / Mantua'],
    ['Who wrote the libretto?', 'Alessandro Striggio / Striggio'],
    ['What did Monteverdi call it?', 'favola in musica / a tale in music'],
    ['Acting in song, the Florentine ideal', 'recitar cantando'],
    ['The first Florentine opera on the same myth (1600)', 'Peri’s Euridice / Euridice / Peri'],
    ['Who sings the prologue?', 'La Musica / Music'],
    ['Orfeo’s showpiece to charm the ferryman', 'Possente spirto'],
    ['The ferryman of the Underworld', 'Caronte / Charon'],
    ['The condition Pluto sets', 'not to look back / he must not look back / don’t look back'],
    ['Who takes Orfeo to heaven?', 'Apollo']
  ],
  'opera-study-figaro': [
    ['Year and city of the premiere', '1786, Vienna / Vienna 1786 / 1786'],
    ['The librettist', 'Lorenzo Da Ponte / Da Ponte'],
    ['The playwright of the original', 'Beaumarchais'],
    ['Which emperor banned the play on stage?', 'Joseph II'],
    ['The trouser role', 'Cherubino'],
    ['Cherubino’s aria to the Countess', 'Voi che sapete / Non so più'],
    ['The Countess’s two arias', 'Porgi, amor and Dove sono / Porgi amor / Dove sono'],
    ['The letter duet', 'Sull’aria / Sull’aria… che soave zeffiretto'],
    ['How the Count asks forgiveness at the end', 'Contessa, perdono / Contessa perdono'],
    ['Which city’s success led to Don Giovanni?', 'Prague']
  ],
  'opera-study-barbiere': [
    ['Year and city of the premiere', '1816, Rome / Rome 1816 / 1816'],
    ['The librettist', 'Cesare Sterbini / Sterbini'],
    ['Whose fans are blamed for the fiasco?', 'Paisiello / Paisiello’s'],
    ['Almaviva’s disguise as a poor student', 'Lindoro'],
    ['Figaro’s entrance aria', 'Largo al factotum'],
    ['Rosina’s aria', 'Una voce poco fa'],
    ['Basilio’s aria about slander', 'La calunnia / La calunnia è un venticello'],
    ['Fast runs, trills and leaps', 'coloratura'],
    ['A phrase repeated louder and louder', 'Rossini crescendo / crescendo'],
    ['The style of Rossini, Donizetti and Bellini', 'bel canto']
  ],
  'opera-study-traviata': [
    ['Year and theatre of the premiere', '1853, La Fenice / La Fenice / 1853'],
    ['The librettist', 'Piave / Francesco Maria Piave'],
    ['The play it is based on', 'La Dame aux camélias / The Lady of the Camellias'],
    ['The real woman behind Violetta', 'Marie Duplessis'],
    ['The drinking song', 'Libiamo / Libiamo ne’ lieti calici / Brindisi'],
    ['The cabaletta that ends Act 1', 'Sempre libera'],
    ['Germont’s aria', 'Di Provenza / Di Provenza il mar, il suol'],
    ['Violetta’s outburst in Act 2', 'Amami, Alfredo / Amami Alfredo'],
    ['Violetta’s farewell in Act 3', 'Addio del passato'],
    ['What does Violetta die of?', 'consumption / tuberculosis']
  ],
  'opera-study-carmen': [
    ['Year and theatre of the premiere', '1875, Opéra-Comique / Opéra-Comique / 1875'],
    ['The author of the novella', 'Prosper Mérimée / Mérimée'],
    ['Opéra comique means opera with…', 'spoken dialogue / dialogue'],
    ['Who set the dialogue as recitative?', 'Ernest Guiraud / Guiraud'],
    ['Carmen’s voice type', 'mezzo-soprano / mezzo'],
    ['Carmen’s entrance song', 'Habanera / L’amour est un oiseau rebelle'],
    ['Escamillo’s song', 'Toreador Song / Votre toast'],
    ['Don José’s aria', 'Flower Song / La fleur que tu m’avais jetée'],
    ['The girl from José’s village', 'Micaëla / Micaela'],
    ['How old was Bizet when he died?', '36']
  ],
  'opera-study-boheme': [
    ['Year and city of the premiere', '1896, Turin / Turin 1896 / 1896'],
    ['Who conducted it?', 'Toscanini / Arturo Toscanini'],
    ['The two librettists', 'Illica and Giacosa / Illica & Giacosa'],
    ['The author of the source', 'Henri Murger / Murger'],
    ['Opera about ordinary people and real life', 'verismo'],
    ['Rodolfo’s aria', 'Che gelida manina'],
    ['Mimì’s aria', 'Sì, mi chiamano Mimì / Mi chiamano Mimì'],
    ['The duet that ends Act 1', 'O soave fanciulla'],
    ['The café in Act 2', 'Café Momus / Momus'],
    ['Colline’s farewell to his coat', 'Vecchia zimarra']
  ],
  'opera-study-tristan': [
    ['Year and city of the premiere', '1865, Munich / Munich 1865 / 1865'],
    ['Who conducted it?', 'Hans von Bülow / von Bülow / Bulow'],
    ['The king who paid for it', 'Ludwig II / Ludwig'],
    ['The philosopher Wagner was reading', 'Schopenhauer'],
    ['The notes of the Tristan chord', 'F, B, D sharp, G sharp / F B D# G# / F–B–D♯–G♯'],
    ['A musical idea tied to a person or feeling', 'leitmotif / Leitmotiv'],
    ['Who swaps the poison for a love potion?', 'Brangäne / Brangane'],
    ['The love duet', 'O sink hernieder / O sink hernieder, Nacht der Liebe'],
    ['Isolde’s final song', 'Liebestod / Mild und leise'],
    ['Tristan’s voice type', 'Heldentenor / heroic tenor']
  ],
  'opera-study-rosenkavalier': [
    ['Year and city of the premiere', '1911, Dresden / Dresden 1911 / 1911'],
    ['The librettist', 'Hugo von Hofmannsthal / Hofmannsthal'],
    ['Strauss’s name for it', 'Komödie für Musik / comedy for music'],
    ['In whose reign is it set?', 'Maria Theresa'],
    ['The trouser role', 'Octavian'],
    ['The Marschallin’s cousin', 'Baron Ochs / Ochs'],
    ['What does the cavalier carry?', 'a silver rose / the silver rose / silver rose'],
    ['The Act 3 trio', 'Hab mir’s gelobt'],
    ['The final duet', 'Ist ein Traum'],
    ['Why are the waltzes an anachronism?', 'Maria Theresa’s Vienna had no waltzes / no waltzes then']
  ],
  'opera-study-grimes': [
    ['Year and theatre of the premiere', '1945, Sadler’s Wells / Sadler’s Wells / 1945'],
    ['The librettist', 'Montagu Slater / Slater'],
    ['The poem it comes from', 'The Borough'],
    ['The poet', 'George Crabbe / Crabbe'],
    ['Who sang Grimes?', 'Peter Pears / Pears'],
    ['Whose article led Britten to Crabbe?', 'E. M. Forster / Forster'],
    ['The schoolmistress who stands by Grimes', 'Ellen Orford / Ellen'],
    ['The four Sea Interludes', 'Dawn, Sunday Morning, Moonlight, Storm / Dawn Sunday Morning Moonlight Storm'],
    ['Grimes’s aria in the pub', 'Now the Great Bear and Pleiades'],
    ['Who tells Grimes to sink his boat?', 'Captain Balstrode / Balstrode']
  ],
  'opera-study-live': [
    ['The opera house in Mexico City', 'Palacio de Bellas Artes / Bellas Artes'],
    ['What is its curtain made of?', 'Tiffany glass / glass'],
    ['A cheap way into the Vienna State Opera', 'standing places / standing tickets / standing room'],
    ['The Met’s cinema broadcasts', 'Live in HD'],
    ['Free full productions online', 'OperaVision'],
    ['The translation above the stage', 'surtitles'],
    ['What do you shout for a woman?', 'Brava'],
    ['And for everyone?', 'Bravi'],
    ['Whose operas often run past five hours?', 'Wagner’s / Wagner']
  ],
  // Proto-Indo-European: study notes
  'pie-study-pronouns': [
    ['PIE “I”', '*h₁eǵ(h₂) / h1eg / *h₁eǵ / h₁eǵh₂'],
    ['PIE “you” (singular)', '*tú / tu / *tuH'],
    ['The interrogative stem behind quis, tís and who', '*kʷi- / kwi / *kʷo- / kʷi'],
    ['The demonstrative behind Sanskrit sá, sā́, tád', '*so, *seh₂, *tod / so seh2 tod / *so'],
    ['PIE “three”', '*tréyes / treyes'],
    ['PIE “five”', '*pénkʷe / penkwe / pénkʷe'],
    ['PIE “ten”', '*déḱm̥(t) / dekm / *déḱm̥'],
    ['PIE “hundred”', '*ḱm̥tóm / kmtom'],
    ['The superlative suffix behind -est', '*-isto- / isto'],
    ['Different roots in one paradigm (good, better)', 'suppletion']
  ],
  'pie-study-syntax': [
    ['The neutral PIE word order', 'SOV / subject object verb'],
    ['Clitics in second position: whose law?', 'Wackernagel’s / Wackernagel'],
    ['When did Wackernagel publish it?', '1892'],
    ['A preverb standing apart from its verb', 'tmesis'],
    ['Heavier information comes later: whose law?', 'Behaghel’s / Behaghel'],
    ['A relative clause picked up by a demonstrative', 'correlative / a correlative'],
    ['Neuter plural subjects take a … verb', 'singular'],
    ['Why? The neuter plural began as a…', 'collective / collective noun'],
    ['The PIE prohibitive particle', '*meh₁ / meh1 / mē'],
    ['A modern language that still obeys Wackernagel’s law', 'Serbo-Croatian / Czech']
  ],
  'pie-study-grimm': [
    ['Who first noticed the shift (1818)?', 'Rasmus Rask / Rask'],
    ['PIE *p becomes in Germanic…', 'f'],
    ['PIE *t becomes…', 'θ / th / þ'],
    ['PIE *k becomes…', 'h'],
    ['PIE *d becomes…', 't'],
    ['PIE *bʰ becomes…', 'b'],
    ['Latin centum, English…', 'hundred'],
    ['Why does father have d but brother þ?', 'the accent / Verner’s law / where the PIE accent fell'],
    ['When did Verner publish?', '1875'],
    ['was / were is an example of…', 'Grammatischer Wechsel / Verner’s law']
  ],
  'pie-study-indo-iranian': [
    ['The three Indo-Iranian groups', 'Indic, Iranian, Nuristani / Indic Iranian Nuristani'],
    ['The kingdom whose treaty names Mitra and Varuṇa', 'Mitanni'],
    ['Whose horse-training manual has Indic numerals?', 'Kikkuli'],
    ['PIE e, o, a all become…', 'a'],
    ['Avestan “hundred”, the name of the group', 'satəm / satem'],
    ['*s becomes ṣ after r, u, k, i', 'the ruki rule / ruki'],
    ['*o in an open syllable becomes ā', 'Brugmann’s law / Brugmann'],
    ['*ǵónu “knee” in Sanskrit', 'jā́nu / janu'],
    ['A laryngeal between consonants gives … in Indic', 'i'],
    ['Two aspirates in a root, the first loses it', 'Grassmann’s law / Grassmann']
  ],
  'pie-study-greek': [
    ['The script of Mycenaean Greek', 'Linear B'],
    ['Who deciphered it, and when?', 'Michael Ventris, 1952 / Ventris 1952 / Ventris'],
    ['wa-na-ka', 'wánax / wanax / king'],
    ['PIE *septḿ̥ in Greek', 'heptá / hepta'],
    ['PIE *bʰérō in Greek', 'phérō / phero'],
    ['*h₂ before a consonant gives Greek…', 'a'],
    ['*h₃ before a consonant gives Greek…', 'o'],
    ['*kʷis “who” in Greek', 'tís / tis'],
    ['The lost letter that shows in Homer’s metre', 'digamma / w'],
    ['kléos áphthiton', 'imperishable fame']
  ],
  'pie-study-italic': [
    ['The two groups of Italic', 'Latino-Faliscan and Sabellic / Latino-Faliscan and Osco-Umbrian'],
    ['The Umbrian bronze tablets', 'the Iguvine Tables / Iguvine Tables'],
    ['Where were they found?', 'Gubbio'],
    ['Oscan “who”', 'pis'],
    ['*bʰréh₂tēr in Latin', 'frāter / frater'],
    ['Intervocalic s becomes r in Latin', 'rhotacism'],
    ['Valesius became…', 'Valerius'],
    ['Why cōnficiō beside faciō?', 'early first-syllable stress / vowel weakening'],
    ['Latin merged the aorist and the…', 'perfect'],
    ['The Latin passive ending, shared with Celtic and Hittite', '-r / r']
  ],
  'pie-study-celtic': [
    ['The script of notches on standing stones', 'Ogham'],
    ['Which PIE consonant disappeared in all Celtic?', 'p / *p'],
    ['Latin pater in Old Irish', 'athir'],
    ['“Five” in Welsh', 'pump'],
    ['“Five” in Old Irish', 'cóic / coic'],
    ['The Gaulish for “king”, as in Vercingetorix', '-rīx / rix'],
    ['First consonants changing after certain words', 'initial mutations / mutations'],
    ['The usual Insular Celtic word order', 'VSO / verb subject object'],
    ['Irish agam', 'at me'],
    ['The Gaulish bronze calendar', 'Coligny / the Coligny calendar']
  ],
  'pie-study-germanic': [
    ['Who translated the Bible into Gothic?', 'Wulfila / Ulfilas'],
    ['The silver manuscript of it, at Uppsala', 'Codex Argenteus'],
    ['The oldest runic alphabet', 'Elder Futhark / Futhark'],
    ['Where is Germanic stress fixed?', 'on the first syllable / first syllable'],
    ['sing, sang, sung: which kind of verb?', 'strong'],
    ['love, loved: the past is made with a … suffix', 'dental'],
    ['can, may, shall: old perfects with present meaning', 'preterite-presents'],
    ['foot / feet, mouse / mice', 'umlaut'],
    ['water / Wasser shows the … sound shift', 'second / Second (High German)'],
    ['Finnish kuningas', 'king']
  ],
  'pie-study-balto-slavic': [
    ['The Baltic language that died out in the 18th century', 'Old Prussian'],
    ['The first Slavic literary language', 'Old Church Slavonic'],
    ['Its two alphabets', 'Glagolitic and Cyrillic / Glagolitic, Cyrillic'],
    ['*ḱm̥tóm in Lithuanian', 'šim̃tas / simtas / šimtas'],
    ['In Slavic, the ruki *s goes on to…', 'x / kh'],
    ['Lithuanian ẽsti beside Sanskrit…', 'ásti / asti'],
    ['Every syllable comes to end in a vowel', 'the law of open syllables / open syllables'],
    ['Perfective and imperfective pairs', 'aspect / verbal aspect'],
    ['Lithuanian galvà, Russian…', 'голова / golova'],
    ['A vowel lengthened before an old voiced stop: whose law?', 'Winter’s / Winter']
  ],
  'pie-study-armenian-albanian': [
    ['Who created the Armenian alphabet?', 'Mesrop Mashtots / Mashtots'],
    ['Classical Armenian', 'Grabar'],
    ['Who showed Armenian is its own branch (1875)?', 'Hübschmann / Heinrich Hübschmann'],
    ['Armenian “two”', 'erku'],
    ['Armenian “father”', 'hayr'],
    ['The first full Albanian text (1555)', 'Buzuku’s Meshari / Meshari / Gjon Buzuku'],
    ['The two Albanian dialects', 'Gheg and Tosk / Gheg, Tosk'],
    ['Albanian natë', 'night'],
    ['Albanian motër comes from PIE “mother” but means…', 'sister'],
    ['A shared feature of a language area, not of descent', 'Sprachbund / Balkan Sprachbund']
  ],
  'pie-study-schleicher': [
    ['When did Schleicher write the fable?', '1868'],
    ['Avis akvāsas ka', 'The sheep and the horses'],
    ['PIE “sheep” today', 'h₂óu̯is / h2owis'],
    ['PIE “horse” today', 'h₁éḱu̯os / h1ekwos'],
    ['PIE “wool” today', 'h₂u̯l̥h₁náh₂ / h2wlh1neh2'],
    ['Who wrote the 2013 version?', 'Andrew Byrd / Byrd'],
    ['Which language did Schleicher model PIE on?', 'Sanskrit'],
    ['Who predicted the laryngeals in 1879?', 'Saussure / Ferdinand de Saussure'],
    ['Byrd’s tense for “saw”', 'aorist'],
    ['Where does the sheep flee?', 'into the plain / the plain']
  ]
};

Object.assign(window.FN_LESSON_QUIZZES, {
  "tocharian-notes-tarim": [
    [
      "Where were the Tarim Basin mummies found?",
      "Xinjiang / Tarim Basin"
    ],
    [
      "Which culture is associated with an early eastward expansion of Proto-Tocharian speakers in these notes?",
      "Afanasievo"
    ],
    [
      "Were the earliest Tarim mummies necessarily Tocharian speakers?",
      "no"
    ]
  ],
  "tocharian-notes-silk-road": [
    [
      "Which religion shaped the historical Tocharian kingdoms?",
      "Buddhism"
    ],
    [
      "Which script was used for literacy?",
      "Brahmi / Brāhmī"
    ],
    [
      "Name one Tocharian oasis kingdom mentioned here.",
      "Kucha / Turfan"
    ]
  ],
  "tocharian-notes-prehistory": [
    [
      "Which culture is associated here with light chariots with spoked wheels?",
      "Sintashta"
    ],
    [
      "Does the Rigveda celebrate chariots or cavalry?",
      "chariots"
    ],
    [
      "Which came later: chariots or mounted cavalry?",
      "mounted cavalry / cavalry"
    ]
  ],
  "tocharian-notes-origins": [
    [
      "Which branch is shown as the earliest split?",
      "Anatolian"
    ],
    [
      "Which two Tocharian languages appear in the written sources?",
      "A and B / Tocharian A and B"
    ],
    [
      "Which expansion carries Proto-Tocharian east in the diagram?",
      "Afanasievo"
    ]
  ],
  "tocharian-notes-reading": [
    [
      "Who wrote The Tocharian Languages (2024) in your reading list?",
      "Michael Peyrot / Peyrot"
    ],
    [
      "Who wrote A Biography of the Tocharian Languages?",
      "Douglas Q. Adams / Adams"
    ],
    [
      "Which kingdom appears in the title listed under Victor H. Mair?",
      "Kucha"
    ]
  ],
  "avestan-notes-periods": [
    [
      "Which three stages represent the same language in these notes?",
      "Old Persian, Middle Persian, New Persian / Old Middle New Persian"
    ],
    [
      "Which period follows Middle Iranian?",
      "New Iranian / Modern Iranian"
    ],
    [
      "Is Avestan classified as Old Iranian?",
      "yes"
    ]
  ],
  "avestan-notes-old-iranian": [
    [
      "What is the name of the religious collection written in Avestan?",
      "Avesta"
    ],
    [
      "Which empire used Old Persian as a royal language?",
      "Achaemenid / Achaemenid empire"
    ],
    [
      "What does spaka mean in the Median example?",
      "female dog"
    ]
  ],
  "avestan-notes-middle-west": [
    [
      "Which state used Middle Persian as an official language?",
      "Sasanian / Sasanian state / Sasanian empire"
    ],
    [
      "Which modern language is linked to Alanic?",
      "Ossetic"
    ],
    [
      "The Parthian script descended from which script?",
      "Imperial Aramaic / Aramaic"
    ]
  ],
  "avestan-notes-middle-east": [
    [
      "Which language mainly used Greco-Bactrian script?",
      "Bactrian"
    ],
    [
      "Which language is associated with the Ancient Letters?",
      "Sogdian"
    ],
    [
      "Which Brāhmī tradition was used for Khotanese?",
      "Southern Brahmi / Southern Brāhmī"
    ]
  ],
  "avestan-notes-modern-northwest": [
    [
      "Is Ossetic linguistically Eastern or Western Iranian?",
      "Eastern / Eastern Iranian"
    ],
    [
      "Name one of the two main Ossetic varieties.",
      "Digoron / Iron"
    ],
    [
      "What other name is used for Māzandarāni?",
      "Tabari"
    ]
  ],
  "avestan-notes-kurdish-central": [
    [
      "Name the three main Kurdish groups listed here.",
      "Northern Central Southern / Northern, Central and Southern"
    ],
    [
      "Which Kurdish group includes Sorāni?",
      "Central / Central Kurdish"
    ],
    [
      "Lori and Bakhtiāri are closely related to which language?",
      "Persian"
    ]
  ],
  "avestan-notes-persian": [
    [
      "New Persian descends from which language?",
      "Middle Persian"
    ],
    [
      "Which major Persian variety is associated with Afghanistan?",
      "Dari / Afghan Dari"
    ],
    [
      "Which alphabet is used for Tajik in these notes?",
      "Cyrillic"
    ]
  ],
  "avestan-notes-southeast": [
    [
      "Which peninsula is associated with Kumzari?",
      "Musandam / Musandam Peninsula"
    ],
    [
      "Name one country where Balochi is spoken.",
      "Iran / Pakistan / Afghanistan"
    ],
    [
      "Which script tradition is used for Balochi here?",
      "Arabo-Persian / Arabo Persian"
    ]
  ],
  "avestan-notes-eastern": [
    [
      "Which language belongs to the same subgroup as Sogdian?",
      "Yaghnobi"
    ],
    [
      "Which language belongs to the same subgroup as Khotanese?",
      "Wakhi"
    ],
    [
      "Which two places are associated with major standard Pashto varieties?",
      "Kandahar and Peshawar / Kandahar Peshawar"
    ]
  ]
});
