import { fetchIds, crawlHeaders, readIfExists, calculateListAndWrite } from 'nrk-sapmi-crawler'

const southSami = {
  id: '1.13572943',
  languageName: 'Åarjelsaemien',
  url: 'https://www.nrk.no/serum/api/content/json/1.13572943?v=2&limit=1000&context=items',
  file: './datasets/list.southSami.json'
}

const luleSami = {
  id: '1.13572946',
  languageName: 'Julevsábmáj',
  url: 'https://www.nrk.no/serum/api/content/json/1.13572946?v=2&limit=1000&context=items',
  file: './datasets/list.luleSami.json'
}

const northSami = {
  id: '1.13572949',
  languageName: 'Davvisámegillii',
  url: 'https://www.nrk.no/serum/api/content/json/1.13572949?v=2&limit=1000&context=items',
  file: './datasets/list.northSami.json'
}

// Fetch South Sami
Promise.all([fetchIds(southSami.url, crawlHeaders), readIfExists(southSami.file).catch(e => e)])
  .then((data) => {
    calculateListAndWrite(data, southSami.id, southSami.file, southSami.languageName)
  })
  .catch(function (err) {
    console.log('Error: ' + err)
  })

// Fetch Lule Sami
Promise.all([fetchIds(luleSami.url, crawlHeaders), readIfExists(luleSami.file).catch(e => e)])
  .then((data) => {
    calculateListAndWrite(data, luleSami.id, luleSami.file, luleSami.languageName)
  })
  .catch(function (err) {
    console.log('Error: ' + err)
  })

// Fetch North Sami
Promise.all([fetchIds(northSami.url, crawlHeaders), readIfExists(northSami.file).catch(e => e)])
  .then((data) => {
    calculateListAndWrite(data, northSami.id, northSami.file, northSami.languageName)
  })
  .catch(function (err) {
    console.log('Error: ' + err)
  })
