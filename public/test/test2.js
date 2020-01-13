import sinon from '/node_modules/sinon/pkg/sinon-esm.js';
import {jsonOk, searchResultJson, searchSuggestJson, delay} from './helpers.js';

describe('Interaction', function() {
    beforeEach(() => {
        sinon.stub(window, 'fetch');
    });

    afterEach(() => {
        window.fetch.restore();
    });

    describe('history', function() {
        it('test history and suggestions', async function() {

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

            chai.assert.lengthOf(model.response.history, 0);
            chai.assert.lengthOf(model.response.results, 0);
            chai.assert.lengthOf(model.response.suggestions, 0);

            chai.assert.isNotOk(model.stateService.suggestionsVisible);

            window.fetch.returns(jsonOk(searchResultJson));
            await model.search('movies online 2019');
            chai.assert.lengthOf(model.response.results, 10);

            chai.assert.lengthOf(model.response.history, 0);
            chai.assert.lengthOf(model.response.suggestions, 0);
            window.fetch.returns(jsonOk(searchSuggestJson));
            await model.editIntent('123456');
            chai.assert.lengthOf(model.response.suggestions, 2);

        });

        it('test timeout', async function() {
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

            window.fetch.returns(jsonOk(searchResultJson));
            await model.search('movies online 2019'); //user clicks the search icon to run the search

            chai.assert.lengthOf(model.response.history, 0);
            model.editIntent('123');
            chai.assert.lengthOf(model.response.history, 0);
            await delay(100);
            chai.assert.lengthOf(model.response.history, 1);

        });

    });
});
