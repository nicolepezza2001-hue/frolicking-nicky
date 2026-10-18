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
    ['L’amie avec … je voyage.', 'qui / laquelle']
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
  ]
};
