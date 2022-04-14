# Application overview

## Application documents/parts
https://sametinget.no/stipend-og-tilskudd/tilskudd/sprak/tilskudd-til-samiske-sprakprosjekter/

* [ ] Prosjektets målsetting/faglig innhold med delmål
* [ ] Begrunnelse for søknaden
* [ ] Beskrivelse av gjennomføring av prosjektet med fremdriftsplan
* [ ] Prosjektets gjennomførbarhet / risikovurdering
* [ ] Beskrivelse av hvordan prosjektet får effekt utover prosjektperioden
* [ ] Beskrivelse av hvordan likestillingsperspektivet ivaretas i prosjektet
* [ ] Beskrivelse av hvordan prosjektresultatet skal synliggjøres/publiseres
* [ ] Eventuelle samarbeidspartnere
* [ ] Fullstendig budsjett som viser alle kostnadene og finansieringsplan
* [ ] Dersom der er andre finansieringspartnere, har disse behandlet søknaden og eventuelt bevilget tilskudd


# Stoppordlister for nordsamisk, lulesamisk og sørsamsik for bedre digital samisk språkforståelse

## Prosjektets målsetting/faglig innhold med delmål

Prosjektets målsettig er å kunne generere gode stoppordlister for nordsamisk, lulesamisk og sørsamsik under en åpen kildekode-lisens for alle som vil til å benytte seg av. Dette så hvem som helst skal kunne lage gode søkemotorer for de samiske språkene nordsamisk, lulesamisk og sørsamisk.

### Hva er en stoppordliste og hvordan kan den bedre digitale løsninger?
Stoppord er en svartelisting av ord. Dette er ord du ikke ønsker å bruke i digital analyse av en tekst.

Stoppord er ord som brukes ofte og har lite meningsbærende innhold. De er derfor lite egnet til bruk i digital tekstanalyse. Eksempler fra norsk kan være "og", "eller", "men", "for", "å", "en", "ei", "et", men også veldig mange andre ord. Det finnes ingen universell eller definitif liste over stoppord for et gitt språk. Ei heller gitte regler for hvordan identifisere dem. Hovedregelen er uansett at substantiver og de fleste verb ikke skal med i en stoppordsliste.

En stoppordliste er en liste med typiske stoppord for et gitt formål. Formålet kan være:
* En søkemotor
* En chatbot
* En eller annen form for maskinlæring basert på tekstlig innhold
* Plagiat-identifisering

### Hvorfor er det viktig å kunne identifisere stoppord?
For å ta en søkemotor som eksempel. Det er to hovedårsaker til at fjerning av stoppord er viktige for en søkemotor.

1. Ved å fjerne stoppord vil du få færre ord som skal lagres. Du lagrer bare de som er egnet til å identifisere enkelte dokumenter i steden for å lagre alle. Dette gir mindre behov for lagring og en raskere søkemotor.
2. Når du søker i en søkemotor vil du ha tilbake de mest relevante treffene. Vanlig er å tillate OR-søk. Resultatet blir da dokumenter med ett eller flere søkeord i seg. Er ett av søkeordene et typisk stoppord og dette ikke er fjernet vil du få veldig mange unødvendige svar fra søkemotoren. Det gir en dårlig brukeropplevelse.

For en chatbot er det viktig å skjønne hovedessensen av det som sies/skrives til den. Da hjelper det å fjerne alle ord som inneholder lite informasjon. Mye av det samme gjelder for maskinlæring basertpå tekstlig innhold.

### Hvordan genereres stoppordslistene
Hoveddelen av jobben har vært å sette opp en crawler som henter innhold fra [kortartiklene til NRK Sápmi](https://www.nrk.no/sapmi/samegillii/)

Innholdet blir så kjørt gjennom et program som kalkulerer hvor stoppords-aktig hvert ord er. Grunnlaget for denne kalkuleringen er hvor mange ganger et ord er brukt i et sett med dokumenter, kombinert med hvor mange dokumenter ordet finnes i.

Den spesifikke beregningen er:
```javaScript
stopWordiness = (termInCorpus / totDocs) * (1 / (Math.log(totDocs/(termInDocs - 1))))
```

* **termInCorpus** - Antall ganger et ord finnes i en samling av dokumenter
* **totDocs** - Totalt antall dokumenter i dokumentsamlingen
* **termInDocs** - Antall dokumenter et ord finnes i.

Programmet for dette er [stopword-trainer](https://github.com/eklem/stopword-trainer).

### Kvalitetssikring og -heving - Manuelt arbeid vi søker om penger til

#### Ikke alt innholdet er samsik
Som nevnt tidligere bruker vi [kortartiklene til NRK Sápmi](https://www.nrk.no/sapmi/samegillii/) som grunnlag for kalkulering. Vi har tidligere vurdert å bruke Wikipedia som grunnlag for ihvertfall en stoppordsliste for nordsamisk, men for mye av innholdet består av norske ord til at analysen blir spesielt bra. Uansett har også en liten del av innholdet til NRK Sápmi norske ord og setninger. Å identifisere disse og luke dem ut er endel av oppgaven.

#### Rødlisting av ord

Den automatiske genereringen av stoppord gir oss en rangering av ord fra mest stoppords-aktig til minst. Kanskje du ser at de 200 første ordene i hovedsak kan brukes som stoppord, men at 20-30 ord innimellom de andre helt klart ikke er stoppord. Disse kan legges til en rødliste, ord vi helt sikkert ikke vil svarteliste - altså vi vil ikke ha dem i en stoppordsliste.

Fordelene med å legge disse ordene til en rødliste, i steden for å bare fjerne de på slutten av prosjektet er at du kan fortsette den automatiske innhentingen av nytt innhold og forbedre stoppordslistene og samtidig holde de rødlistede ordene ute av sluttresultatet.

#### Hva er grensen for stoppord og ikke-stoppord - Hvor setter du grensa?

Det automatisk genererte resultatet er en liste fra mest til minst stoppords-aktig. Siste delen av arbeidet er å definere hvor grensen går for hver enkelt liste. Stoppordslistene kan godt gjøres ganske lange siden de er sortert etter mest til minst stoppordsaktige. Du kan da velge å bruke bare en liten del (toppen) av en stoppordsliste hvis du kun er ute etter å fjerne veldig mye brukte ord. Eller du kan velge en mer aggresiv tilnærming og fjerne mange ord for å sørge for en mindre søkeindeks (søkemotorens database) og en raskere søkemotor.

## Delmål

1. Rødlister over ord som helt sikkert ikke skal være med i stoppordlistene. En liste for hvert av språkene - nordsamisk, lulesamisk og sørsamisk.
2. Publisere stoppordslister for nordsamisk, lulesamisk og som kan tas i bruk. Det viktigste her er å definere hvor mange ord som skal tas med i listen og blir en diskusjon mellom prosjektansvarlig og språkfaglig ansvarlige.
3. Inkludering av stoppordlistene for nordsamisk, lulesamisk og sørsamisk i stoppordsbiblioteket - [stopword](https://github.com/fergiemcdowall/stopword).
4. (utenfor søknadens prosjektmandat) - Fortsette innhenting av mere innnhold i noen år for å se om det gir enda høyere kvalitet på stoppordslistene.

## Begrunnelse for søknaden

Mesteparten av programmeringen er allerede gjort. Dette gjelder:
* Innhenting av URL'er til tekst på nordsamisk, lulesamisk
* Innhenting av den faktiske teksten.
* Programatisk analyse av tekstinnholdet for å kalkulere hvor stoppords-aktig hvert ord er.

Koden til dette finnes her:
* [stopword-sami](https://github.com/eklem/stopword-sami) - Biblioteket som kommer til å inneholde de ferdige stoppordslistene, samt tekstgrunnlaget.
* [nrk-sapmi-crawler](https://github.com/eklem/nrk-sapmi-crawler) - Selve crawleren for å hente innhold fra NRK Sápmi.
* [stopword-trainer](https://github.com/eklem/stopword-trainer) - Programmet som kalkulerer hvor stoppords-aktig hvert ord er.
* [words-n-numbers](https://github.com/eklem/words-n-numbers) - Henter ut ord av tekststrenger.

Arbeidet som gjenstår:
* Gjennomgang av innhold hentet fra NRK og luke ut kort-artikler med norsk tekst.
* Finne mennesker som kan lulesamisk og sørsamisk. For nordsamisk har vi allerede en internt som kan bistå - Levi Sørum.
* Koordinere arbeidet med disse menneskene. Forklare hva stoppord er og få dem til å gå igjennom listene.
* Selve arbeidet med å gå igjennom automatisk genererte lister og melde tilbake ord som burde være rødlistede og hvor lange de ferdige listene kan være.
* Legge ord til rødlistene.
* Generere ferdige lister, klare til publisering.
* En siste kvalitetskontroll av listene.
* Publisere stoppordslistene på [stopword-sami](https://github.com/eklem/stopword-sami)
* Generere tester og publisere stoppordslistene på [stopword](https://github.com/fergiemcdowall/stopword)
* Bloggpost om prosjektet og hva det ferdige resultatet betyr på [Knowit blogg](https://blogg.knowit.no/).

## Fullstendig budsjett som viser alle kostnadene og finansieringsplan

Tidsbruk:
* Gjennomgang av innhold hentet fra NRK og luke ut kort-artikler med norsk tekst.
  (4 timer)
* Finne mennesker som kan lulesamisk og sørsamisk. For nordsamisk har vi allerede en internt som kan bistå - Levi Sørum.
  (8 timer)
* Koordinere arbeidet med disse menneskene. Forklare hva stoppord er og få dem til å gå igjennom listene.
  (6 timer)
* Selve arbeidet med å gå igjennom automatisk genererte lister og melde tilbake ord som burde være rødlistede og hvor lange de ferdige listene kan være.
  (9 timer) - 3 timer per person. Levi Sørum + 2 eksterne ressurser.
* Legge ord til rødlistene.
  (2 timer)
* Generere ferdige lister, klare til publisering.
  (1 time)
* En siste kvalitetskontroll av listene.
  (3 timer)
* Publisere stoppordslistene på [stopword-sami](https://github.com/eklem/stopword-sami)
  (1 time)
* Generere tester og publisere stoppordslistene på [stopword](https://github.com/fergiemcdowall/stopword)
  (3 timer)
* Bloggpost om prosjektet og hva det ferdige resultatet betyr. Spre på Linkedin, Facebook, Twitter og Reddit.
  (6)

Totalt: 43 timer * 1200 kr/t + MVA = 63984 kr
Vi søker derfor om 63984 kroner i støtte til prosjektet.

### Tidsplan
**fram til oktober**
* Gjennomgå innholdet og luke ut norsk tekst.
* Finne mennesker som kan bidra på kvalitetssikring av lulesamisk og sørsamisk.
* Starte koordinering av arbeidet Levi Sørum og to andre skal gjøre.

**Oktober / november**
* Gjennomgang av ordlistene, definere ord som skal rødlistes og melde tilbake til prosjektet.
* Legge inn ordene i rødlistene.
* Generere ferdige lister, klare for publisering.
* Siste kvalitetskontroll.
* Publisere lister til modulene/kode-bibliotekene [stopword-sami](https://github.com/eklem/stopword-sami) og [stopword](https://github.com/fergiemcdowall/stopword)
* Skrive bloggpost om prosjektet og spre

