# stopword-sami

[![NPM version](http://img.shields.io/npm/v/stopword-sami.svg)](https://npmjs.org/package/stopword-sami)
[![NPM downloads](http://img.shields.io/npm/dm/stopword-sami.svg)](https://npmjs.org/package/stopword-sami) 
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## What

WIP! Project to generate stopword lists for all the Sami languages:

* [ ] [Nordsamisk](https://snl.no/nordsamisk)
* [ ] [Lulesamisk](https://snl.no/lulesamisk)
* [ ] [Sørsamisk](https://snl.no/s%C3%B8rsamisk)

## Grant from the Sami Parliament

[The Sami Parliament](https://sametinget.no/) is financially supporting the project. Hooray! This will make it possible to finish the project.

| Sámediggi  | Sámedigge  | Saemiedigkie  |
| ---------  | ---------  | ------------  |
| ![The Sami Parliament](./project_documents/Sametingets%20logo%20-%20nordsamisk.png)  | ![The Sami Parliament](./project_documents/Sametingets%20logo%20-%20lulesamisk.png)  | ![The Sami Parliament](./project_documents/Sametingets%20logo%20-%20s%C3%B8rsamisk.png)  |


## Other Sami languages

These are not planned as of now, but could be if we find text sources and someone to help us verify the lists.

* [ ] Kildinsamisk
* [ ] Skoltesamisk/østsamisk
* [ ] Enaresamisk
* [ ] Pitesamisk
* [ ] Umesamisk

When the quality of the stopword lists are good enough they will be added to the [stopword](https://github.com/fergiemcdowall/stopword) module. Northern Sami will most likely be the first that reaches good enough quality. Then you'll have Lule Sami and South Sami.

## Why stopword lists for Sami languages?

To i.e. be able to create good search engines or do machine learning based on content written in the different Sami langauges.

## Install

If you can avoid crawling and just use the content from this repo, that's good. That means less unnecessary trafick on nrk.no. Content is here and will be updated every month, or more often if you need it and published to npm.

```console
npm install stopword-sami
```

## To crawl and calculate
To get more content, you first have to get more IDs, so first the `crawlIds`-command, then the `crawlContent`-command and then the `calcStopwords`-command.

```console
npm run crawlIds && npm run crawlContent && npm run calcStopwords
```

## Work ahead

* [x] Generating lists of IDs to crawl
  Using `nrk-sapmi-crawler` to crawl lists of documents to crawl. These documents will later be crawled and the text content will be the basis for ongoing stopword training. The more content, the better lists.



* [x] Crawl content (work in progress)
  When lists of enough content, and the nrk-sapmi-crawler also can crawl documents, crawl the actual documents

* [X] Start training stopword lists
  Run the `stopword-trainer` on the text that is crawled. From this we'll ask for help to manually verify the lists and also come with words to add to a red-list for each Sami language. The stopword lists are black-lists, words that you don't want. Every now and then, words you want sneak into a stopword list. Adding it to a red-list makes sure it won't end up in the finished stopword list.

* [X] Application for funding last part of the project.
* [ ] Find people that knows Lule- and South Sami languages to verify lists. North Sami already covered.
* [ ] Verifying lists and generating redlists
  Need help to generate redlists so the lists can be cleaned and cut off.
* [ ] Decide cutoff. How many words to keep in each list.
* [ ] Add lists that have beta quality to [stopword](https://github.com/fergiemcdowall/stopword/) module.
* [ ] Update [daq-proc](https://github.com/eklem/daq-proc) and [daq-proc demo](https://eklem.github.io/daq-proc/demo/document-processing/) to showcase new stopword lists.
* [X] Lightning talk at NDC Oslo
* [ ] Blog posts to market lits

### Help needed

We need help to [verify generated list](https://github.com/eklem/stopword-sami/issues/3) and help me [understand different traits of the different Sami languages](https://github.com/eklem/stopword-sami/issues/6) when that time comes.

Also, to generate/train stopword lists, we need text sources. For Northern Sami we will get what we need, but for Lulesami and South Sami it's a little thin. Maybe we just have to wait for NRK to create more content. For the rest of the languages, we have no source so far. If you know of a data-set or a source to generate a data set, please [give us a hint](https://github.com/eklem/stopword-sami/issues/new)!

## Applications: Markdown to Word/PDF conversion

So far, [Pandoc](https://pandoc.org/getting-started.html#step-6-converting-a-file) has worked well:

```console
pandoc application-draft-02.md -f markdown -s -o application-draft.docx
```
