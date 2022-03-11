import { crawlContentAndWrite } from 'nrk-sapmi-crawler'
const appropriateTime = 2000

const northSami = {
  idFile: './datasets/list.northSami.json',
  contentFile: './datasets/content.northSami.json'
}

const southSami = {
  idFile: './datasets/list.southSami.json',
  contentFile: './datasets/content.southSami.json'
}

const luleSami = {
  idFile: './datasets/list.luleSami.json',
  contentFile: './datasets/content.luleSami.json'
}

async function crawl () {
  await crawlContentAndWrite(southSami.idFile, southSami.contentFile, appropriateTime)
  await crawlContentAndWrite(luleSami.idFile, luleSami.contentFile, appropriateTime)
  await crawlContentAndWrite(northSami.idFile, northSami.contentFile, appropriateTime)
}

crawl()
