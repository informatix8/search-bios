import sinon from '/node_modules/sinon/pkg/sinon-esm.js';
import {jsonOk, searchResultJson, searchSuggestJson} from './helpers.js';

describe('Suggestions', function() {
    beforeEach(() => {
        sinon.stub(window, 'fetch');
    });

    afterEach(() => {
        window.fetch.restore();
    });

    describe('fetch/dismiss', function() {
        it('test suggestion', async function() {

            var callbackPreEditIntent = sinon.fake();
            var callbackPostEditIntent = sinon.fake();

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
                    },
                    preEditIntent: callbackPreEditIntent,
                    postEditIntent: callbackPostEditIntent
                }
            });

            window.fetch.returns(jsonOk(searchSuggestJson));

            chai.assert.lengthOf(model.response.suggestions, 0);
            chai.assert.equal(model.response.suggestionsCount, 0);

            await model.fetchSuggestions('test');

            chai.assert.lengthOf(model.response.suggestions, 2);
            chai.assert.equal(model.response.suggestionsCount, 13);

            await model.dismissSuggestions('test');

            chai.assert.equal(model.response.suggestionsCount, 0);
            chai.assert.lengthOf(model.response.suggestions, 2); // TODO should be 0 ?
        });
    });
});
