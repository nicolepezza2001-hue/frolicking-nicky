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
    ['The single argument of an intransitive verb', 'S'],
    ['The agent of a transitive verb', 'A'],
    ['S = A, P different', 'nominative-accusative / accusative'],
    ['S = P, A different', 'ergative-absolutive / ergative'],
    ['S, A and P all different', 'tripartite'],
    ['The case of the transitive agent in Basque', 'ergative'],
    ['The case shared by S and P in an ergative language', 'absolutive'],
    ['Hindi is ergative only in the perfective past: this is called…', 'split ergativity / split ergative'],
    ['Which Hittite nouns take an ergative ending as transitive subjects?', 'neuter / neuters / neuter nouns'],
    ['S marked like A when in control, like P when not', 'active-stative / split-S / active']
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
  ]
};
