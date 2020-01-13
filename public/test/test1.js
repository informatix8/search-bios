import sinon from '/node_modules/sinon/pkg/sinon-esm.js';
import {jsonOk, searchResultJson, searchSuggestJson} from './helpers.js';

describe('Interaction', function() {
    beforeEach(() => {
        sinon.stub(window, 'fetch');
    });

    afterEach(() => {
        window.fetch.restore();
    });

    describe('basics', function() {
        it('test basic flow', async function() {

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
                historyDataService: new SearchHistoryDataServiceMemory(),
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

            window.fetch.returns(jsonOk(searchSuggestJson));

            chai.assert.lengthOf(model.response.history, 0);
            chai.assert.lengthOf(model.response.results, 0);
            chai.assert.lengthOf(model.response.suggestions, 0);

            chai.assert.isNotOk(model.stateService.suggestionsVisible);
            await model.editIntent('movies'); //user types 'movies'
            chai.assert.isOk(model.stateService.suggestionsVisible);

            chai.assert.lengthOf(model.response.history, 0);
            chai.assert.lengthOf(model.response.results, 0);
            chai.assert.lengthOf(model.response.suggestions, 2);

            chai.assert.isEmpty(model.request.q);
            window.fetch.returns(jsonOk(searchResultJson));
            await model.clickSuggestionsItem(model.response.suggestions[1].suggestions[1].suggestionId); //user clicks suggestion item #2
            chai.assert.include(model.request.q, model.response.suggestions[1].suggestions[1].term.replace(/<\/?[^>]+>/g, ''));

            chai.assert.lengthOf(model.response.history, 0);
            chai.assert.lengthOf(model.response.results, 10);
            chai.assert.lengthOf(model.response.suggestions, 2);

            window.fetch.returns(jsonOk(searchSuggestJson));
            chai.assert.isNotOk(model.stateService.suggestionsVisible);
            await model.editIntent('movies 2018'); //user amends query to ' 2018'
            chai.assert.isOk(model.stateService.suggestionsVisible);

            await model.enter('movies 2018'); //user presses the `enter` key

            await model.editIntent('movies online 2019'); //user edits search field to be 'movies online 2019'
            await model.esc(); //user presses the `esc` key

            window.fetch.returns(jsonOk(searchResultJson));
            await model.search('movies online 2019'); //user clicks the search icon to run the search

            chai.assert.lengthOf(model.response.history, 0);
            chai.assert.lengthOf(model.response.results, 10);
            chai.assert.lengthOf(model.response.suggestions, 2);

            chai.assert.isNotOk(model.stateService.historyVisible);
            chai.assert.isNotOk(model.stateService.suggestionsVisible);
        });

        it('test search on enter', async function () {

            var callbackPreSearch = sinon.fake();

            const model = new SearchBIOS({
                id: 'theta',
                request: {
                    limit: 25,
                    sort: 'relevancy'
                },
                config: {
                    limitOptions: [10, 25, 100],
                    sortOptions: [
                        {text: 'Most Relevant', value: 'relevancy'},
                        {text: 'Most Recent', value: 'chronological'},
                        {text: 'Most Popular', value: 'popularity'}
                    ],
                    historyEnabled: true,
                    suggestionsEnabled: true
                },
                resultDataService: new SearchResultDataServiceTheta(),
                historyDataService: new SearchHistoryDataServiceMemory(),
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
                    },
                    preSearch: callbackPreSearch
                }
            });

            window.fetch.returns(jsonOk(searchResultJson));
            chai.assert.isNotOk(callbackPreSearch.called);
            await model.enter('movies 2018'); //user presses the `enter` key
            chai.assert.isOk(callbackPreSearch.called);
        })
    });

});
