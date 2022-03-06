# stopword-sami
## What
WIP! Project to generate stopword lists for all the Sami languages:
* [ ] [Nordsamisk](https://snl.no/nordsamisk)
* [ ] [Lulesamisk](https://snl.no/lulesamisk)
* [ ] [Sørsamisk](https://snl.no/s%C3%B8rsamisk)
* [ ] Kildinsamisk
* [ ] Skoltesamisk/østsamisk
* [ ] Enaresamisk
* [ ] Pitesamisk
* [ ] Umesamisk

When the quality of the stopword lists are good enough they will be added to the [stopword](https://github.com/fergiemcdowall/stopword) module. Northern Sami will most likely be the first that reaches good enough quality. Then you'll have Lule Sami and South Sami.

## Install
If you can avoid crawling and just use the content from this repo, that's good. That means less unnecessary trafick on nrk.no. Content is here and will be updated every month, or more often if you need it and published to npm.

```console
npm install stopword-sami
```

## To crawl
To get more content, you first have to get more IDs, so first the `crawlIds`-command, then the `crawlContent`-command.

```console
npm run crawlIds && npm run crawlContent
```

## Work ahead

* [x] Generating lists of IDs to crawl
  Using `nrk-sapmi-crawler` to crawl lists of documents to crawl. These documents will later be crawled and the text content will be the basis for ongoing stopword training. The more content, the better lists.



* [x] Crawl content
  When lists of enough content, and the nrk-sapmi-crawler also can crawl documents, crawl the actual documents

* [ ] Start training stopword lists
  Run the `stopword-trainer` on the text that is crawled. From this we'll ask for help to manually verify the lists and also come with words to add to a red-list for each Sami language. The stopword lists are black-lists, words that you don't want. Every now and then, words you want sneak into a stopword list. Adding it to a red-list makes sure it won't end up in the finished stopword list.

### Help needed

We need help to [verify generated list](https://github.com/eklem/stopword-sami/issues/3) and help me [understand different traits of the different Sami languages](https://github.com/eklem/stopword-sami/issues/6) when that time comes.

Also, to generate/train stopword lists, we need text sources. For Northern Sami we will get what we need, but for Lulesami and South Sami it's a little thin. Maybe we just have to wait for NRK to create more content. For the rest of the languages, we have no source so far. If you know of a data-set or a source to generate a data set, please [give us a hint](https://github.com/eklem/stopword-sami/issues/new)!

## Why stopword lists for sami languages?
To i.e. be able to create good search engines or do machine learning based on content written in the different sami langauges.
