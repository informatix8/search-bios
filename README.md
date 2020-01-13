# Search BIOS
  
Search Model and Services

A model handling search state, fetching 

## Features

- Result fetching
- Customizable services which can be overridden
- Fetches suggestions as user types query
- Shows suggestions
- Dismiss suggestions on keyboard esc or click outside
- LocalStorage history save
- Suggestions from LocalStorage for short phrases
- HTML tags stripping

## Usage

### Install

```shell
npm install @informatix8/search-bios --save-dev
```

### CDN

```html
<script src="https://unpkg.com/@informatix8/search-bios/dist/search-bios.all.umd.js"></script>
```

### Vanilla Javascript

```javascript
import SearchBIOS from './search-bios';
import SearchResultDataServiceTheta from './search-result-data-service-theta';
import SearchHistoryDataServiceLocalStorage from './search-history-data-service-local-storage';
import SearchSuggestDataServiceEpsilon from './search-suggest-data-service-epsilon';

const model = new SearchBIOS({
    id: 'theta',
    request: {
        limit: 25,
        sort: 'relevancy'
    },
    config: {
        limitOptions: [10, 25, 100],
        sortOptions: [
            { text: 'Most Relevant', value: 'relevancy' },
            { text: 'Most Recent', value: 'chronological' },
            { text: 'Most Popular', value: 'popularity' }
        ],
        historyEnabled: true,
        suggestionsEnabled: true
    },
    resultDataService: new SearchResultDataServiceTheta(),
    historyDataService: new SearchHistoryDataServiceLocalStorage(),
    suggestionsDataService: new SearchSuggestDataServiceEpsilon(),
    stateService: {
        searchPending: false,
        historyPending: false,
        historyVisible: false,
        suggestionsPending: false,
        suggestionsVisible: false,
        mobileZoomed: false
    },
    callbacks: {
        postPresentHistory: function () {
            console.log(this.id + ' history presented');
        },
        postPresentSuggestions: function () {
            console.log(this.id + ' suggestions presented');
        }
    }
});

model.editIntent('movies'); //user types 'movies'
model.clickSuggestionsItem(2); //user clicks suggestion item #2
model.editIntent('movies 2018'); //user amends query to ' 2018'
model.enter('movies 2018'); //user presses the `enter` key
model.editIntent('movies online 2019'); //user edits search field to be 'movies online 2019'
model.esc(); //user presses the `esc` key
model.search('movies online 2019'); //user clicks the search icon to run the search
```

## Development

```shell
npm run dev
```

## Build

```shell
npm run build
```

## Release

```shell
npm run build
git tag -a vX.Y.Z
git push origin master
git push origin --tags
npm publish --access=public .
