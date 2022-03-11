const { readFile, writeFile } = require('fs/promises')
const path = require('path')
const wnn = require('words-n-numbers')
const swt = require('stopword-trainer')

const southSami = {
  readFrom: '../datasets/content.southSami.json',
  writeTo: '../stopwords/stopword-sma.json',
  testFile: './testFile.json',
  options: {
    redList: [],
    cutOff: 200
  }
}

const documents = [
  'er et amerikansk band som ble dannet i 1996 Medlemmene kom fra bandene The Yah Mos Black Liquorice og Popesmashers Etter en turne sammen bestemte Black Liquorice og Popesmashers seg for å blande førstnevntes disco og funkstil med sistnevntes støyende aggressivitet og slik ble født Bandets navn var inspirert av tekstingen på filmen Gudene må være gale hvor klikkelydene som buskmennene lagde ble skrevet med et  I det internasjonale fonetiske alfabetet er postalveolære klikkkonsonanter representert med  som ikke er et utropstegn men et pipetegn med en prikk under Deres selvtitulerte debutalbum kom ut i 2000 Oppfølgeren kom i 2003 er kjent for sine katarsiske liveshow',
  'Do you want some action  Live From Barcelona 1990 er en video med Tina Turner som ble gitt ut i 19901 Videoen inneholder en konsert som var en del av henns Foreign Affair Farewell Tour',
  'FrankA er et musikkalbum utgitt av Frank Aleksandersen i 1982',
  'Love and Theft er det 31 studioalbumet til Bob Dylan og ble gitt ut gjennom Columbia Records i september 2001 Albumet fortsatte det kunstneriske comebacket etter Time out of Mind i 1997 og fekk enda bedre mottakelse enn det forrige Den korrekte tittelen på albumet er Love and Theft med engelske anførselstegn Tittelen var visstnok inspirert av en bok skrevet av historikeren Eric Lott Love  Theft Blackface Minstrelsy and the American Working Class som kom ut i 1993 I 2003 var albumet plassert på 467plass på listen til Rolling Stone over de 500 største albumene noensinne mens Newsweek kåret det til det nest beste albumet det tiåret5 Albumet gikk til topps i Norge Noen utgaver av CDen ble gitt ut med en bonusplate med to spor som ikke var utgitt før',
  'Ringo1 er det tredje soloalbumet til Ringo Starr gitt ut i 1973 Det er generelt sett på som Starrs beste og mest populære album og det er hans høyestrangerte og bestselgende album i løpet av hans solokarriere Ringo har et stort antall gjestestjerner inkludert eksbandkompiser fra The Beatles noe som kom til å bli en signatur for Starr på mange av hans fremtidige soloalbum Etter utgivelsen av coveralbumet Sentimental Journey og country og westerncoveralbumet Beaucoups of Blues begge i 1970 spilte Starr bare inn og ga ut noen få singler i mellomtiden blant annet It Dont Come Easy i 1971 og Back Off Boogaloo i 1972 Begge var store suksesser men Starr takket nei til å følge opp med albuminnspillinger da han konsentrerte seg om sin skuespillerkarriere i denne perioden Starr bestemte seg for at tiden var inne for å starte innspillingen av  etter hans egen mening  sitt første ordentlige soloalbum i mars 1973 selv om han allerede hadde gitt ut to album Siden han allerede hadde brukt Richard Perry til å arrangere en av sangene på Sentimental Journey spurte Starr Perry om å produsere innspillingene Etter at Starr spurte alle musikervennene om å hjelpe han med det nye prosjektet var responsen veldig positiv De som tok del i innspillingene var Marc Bolan medlemmer av The Band Billy Preston Klaus Voormann Nicky Hopkins Harry Nilsson og Jim Keltner Ytterligere så dukket alle tre av hans tidligere bandkompiser John Lennon George Harrison og Paul McCartney opp på albumet og komponerte musikk til Ringo og Starr Lennon og Harrison spiller sammen med Voormann og Preston på den Lennonskrevne sangen Im the Greatest Ikke overraskende begynte rykter om en gjenforening av Beatles den første av mange å spre seg Dette kom til å bli det nærmeste en Beatlesgjenforening fram til The Beatles Anthology prosjektet i 1995 Ringo var en positiv opplevelse for Starr og alle involvert og utgivelsen ble godt mottatt av kritikerne Ringo var nummer 1 på albumlisten i Canada i 3 uker nummer 7 i Storbritannia og nummer 2 i USA hvor den solgte til platina Singlene Photograph og Starrs cover av Youre Sixteen gikk begge til nummer 1 i USA mens den ble en Top 10hit i Storbritannia Ringo ble remastered og gjenutgitt på CD i 1991 med tre bonusspor Starrs debutsingle fra 1971 It Dont Come Easy og dens Bside Early 1970 samt Photographs Bside Down and Out',
  'Still Life American Concert 1981 er et konsertalbum av The Rolling Stones utgitt i juni 1982 Det ble spilt inn under den amerikanske turneen deres i 1981 mot slutten av året og kom ut før den europeiske delen av turneen startet sommeren 1982 Før albumet kom ut gav bandet ut Going to a GoGo  på singel Det var en hit for The Miracles i 1965 Bsiden på singelen Beast of Burden kom ikke med på albumet men finnes på samlealbumet Rarities 19712003 Still Life kom ut et par uker før Stones tok turen innom Skandinavia Mange nordmenn reiste til konserten i Gteborg 19 og 20 juni 1982 Hampton Coliseum Live 1981 fra samme turn ble TVsendt direkte på Keith Richards fødselsdag 18 desember  1981 og utgitt som nedlasting i 2012 Lets Spend the Night Together Shattered og Time Is on My Side  er fra denne konserten1 Still Life ble en kommersiell suksess og nådde fjerdeplassen i Storbritannia femteplassen i USA og tredjeplassen i Norge2 Det fikk derimot ikke så god kritikk og det ble trukket frem at albumet hørtes for glatt ut og manglet de røffe kantene en kunne forvente under en Rolling Stoneskonsert Alle låter skrevet av Mick Jagger og Keith Richards med mindre noe annet er oppgitt',
  'Them er det tredje studioalbumet til det danske heavy metalbandet King Diamond Albumet ble utgitt i 1988 på Roadrunner Records Det er det første av to konseptalbumet om King Diamond og hans mentalt syke bestemor det andre er albumet Conspiracy 1989 Albumet åpner med at en ung King og hans søster Missy og deres mor ønsker bestemoren tilbake fra mentalsykehuset Samme natt oppdager King at bestemoren har et teselskap sammen med usynlige gjester Bestemoren forteller senere om Amon som er huset de bor i og Them som holder til der Bestemoren blander blod fra den sovende datteren sin i teen og stemmer i huset opptrer og King blir nærmest dopet Søsteren Missy prøver å få King med seg til å tilkalle hjelp men King er under husets forbannelse og nekter Missy knuser tekjelen og Them dreper Missy og kaster henne på peisen som hevn King kommer ut av forbannelsen og bestemmer seg for å angripe bestemoren Han har skjønt at Them har mindre krefter utenfor huset så han lurer bestemoren ut og dreper henne Stemmene til Amon plager fremdeles King når han blir avhørt av politiet og han blir innlagt på et asyl Flere år senere kommer han ut og returnerer til huset hvor både Them og bestemoren fremdeles er i live All tekst av King Diamond  Musikk skrevet av King Diamond unntatt hvor annet er nevnt',
  'dollar eller pesotegnet er en typografisk forkortelse for pengeenhetene dollar og peso Symbolet finnes i varianter med både n og to streker Denne forskjellen er blitt mindre tydelig etter at det ble vanlig med datamaskiner siden de fleste tastaturer bare har den ene varianten tilgjengelig',
  'Kuppet eller Dollar på tynn is 1 Originaltittel  også kjent som Dollars og The Heist er en amerikansk krimkomedie fra 1971 med Goldie Hawn og Warren Beatty i hovedrollene Regi er ved Richard Brooks En ekspert på bankers sikkerhetssystemer Beatty robber sammen med en prostituert Hawn en bank i Hamburg for svarte penger Dermed kan ingen melde ham til politiet Dette forhindrer likevel ikke at han får diverse personer på nakken når innbruddet blir oppdaget Utvalg',
  'Sushi x Kobe er en rapgruppe fra Bergen Gruppen består av rapperene Onge ushimane og KobeWan Kenobi Guttene med de originale artistnavnene har holdt på med musikk lenge men startet ikke som gruppe før i desember 2013 De beskriver seg selv som to karakterer som lager fet musikk1 Deres aller første konsert holdt de på UKEN til NHH med over 300 publikummereDe har også avholdt konserter både på byLarm og Roskildefestivalen'
]

async function countWordsNow (fileRead, fileWrite, options) {
  // read JSON. IF JSON doesn't exist: const wordsCounted = { docs: 0, words: [] }
  let dataIn = await readIfExists(fileRead)
  // joining when several strings in body-array
  dataIn = dataIn.map(function (obj) {
    if (obj.body.length > 1) {
      obj.body = obj.body.join(' ')
    }
    return obj.body
  })

  // console.log(dataIn.length)
  dataIn = dataIn.filter(arr => arr.length !== 0)

  // console.log(dataIn.length)

  dataIn.forEach(arr => {
    if (arr.length > 1) {
      // console.log(arr)
    }
  })

  // create array with only content from options.key
  let docsWordsArray = []
  const wordsCounted = { docs: 0, words: [] }

  // console.log(dataIn[383])

  dataIn.forEach(document => {
    if (document !== undefined) {
      document = wnn.extract(...document, { regex: [wnn.words], toLowercase: true })
      docsWordsArray.push(document)
    }
  })

  // console.log(docsWordsArray)

  await writeFile(southSami.testFile, JSON.stringify(docsWordsArray))

  docsWordsArray = docsWordsArray.filter(arr => arr !== null)
  docsWordsArray.forEach((document) => {
    if (document !== undefined) {
      // console.log(document)
      swt.countWords(document, wordsCounted)
    }
  })

  swt.stopwordienessCalc(wordsCounted)

  console.log(wordsCounted.words.slice(0, 6))

  // transform array of paragraphs for each document into one string
  // console.log array length when joining.
  // transform into array of words
  // push to documents/corpus
}

async function readIfExists (fileName) {
  try {
    fileName = (path.resolve(__dirname, fileName))
    const dataIn = JSON.parse(await readFile(fileName))
    return dataIn
  } catch (err) {
    console.error('File doesn\'t exist. Creating it. Error: ' + err)
    return { docs: 0, words: [] }
  }
}

countWordsNow(southSami.readFrom, southSami.writeTo, southSami.options)
