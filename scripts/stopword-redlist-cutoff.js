const { readFile, writeFile } = require('fs/promises')
const path = require('path')
const wnn = require('words-n-numbers')
const swt = require('stopword-trainer')

const northSami = {
  stopwordsCalculation: '../stopwords/stopword-sme-calculation.json',
  stopwords: '../stopwords/stopword-sme.json',
  redList: '../redlists/'
  options: {
    redList: [],
    cutOff: 200
  }
}

const luleSami = {
  dataset: '../datasets/content.luleSami.json',
  stopwords: '../stopwords/stopword-smj.json',
  stopwordsCalc: '../stopwords/stopword-smj-calculation.json',
  options: {
    redList: [],
    cutOff: 200
  }
}

const southSami = {
  dataset: '../datasets/content.southSami.json',
  stopwords: '../stopwords/stopword-sma.json',
  stopwordsCalc: '../stopwords/stopword-sma-calculation.json',
  options: {
    redList: [],
    cutOff: 200
  }
}

async function countWordsNow (dataset, stopwordsFile, stopwordsCalcFile, options) {
  // read JSON. IF JSON doesn't exist: const wordsCounted = { docs: 0, words: [] }
  let dataIn = await readIfExists(dataset)
  // joining when several strings in body-array
  // create array with only content from body
  dataIn = dataIn.map(function (obj) {
    if (obj.body.length > 1) {
      obj.body = obj.body.join(' ')
    }
    return obj.body
  })

  // removing empty articles (body field)
  dataIn = dataIn.filter(arr => arr.length !== 0)

  // setting some arrays for processing
  let docsWordsArray = []
  const wordsCounted = { docs: 0, words: [] }

  dataIn.forEach(document => {
    if (document !== undefined) {
      document = wnn.extract(...document, { regex: [wnn.words], toLowercase: true })
      docsWordsArray.push(document)
    }
  })

  // Filtering out empty word arrays
  docsWordsArray = docsWordsArray.filter(arr => arr !== null)
  // Counting words
  docsWordsArray.forEach((document) => {
    if (document !== undefined) {
      swt.countWords(document, wordsCounted)
    }
  })

  // Calculating stopwordiness
  swt.stopwordienessCalc(wordsCounted)

  const fileName = (path.resolve(__dirname, stopwordsCalcFile))

  await writeFile(fileName, JSON.stringify(wordsCounted, null, 2))
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

countWordsNow(northSami.dataset, northSami.stopwords, northSami.stopwordsCalc, northSami.options)
countWordsNow(luleSami.dataset, luleSami.stopwords, luleSami.stopwordsCalc, luleSami.options)
countWordsNow(southSami.dataset, southSami.stopwords, southSami.stopwordsCalc, southSami.options)
