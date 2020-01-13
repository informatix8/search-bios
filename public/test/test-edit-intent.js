import sinon from '/node_modules/sinon/pkg/sinon-esm.js';
import {jsonOk, searchResultJson, searchSuggestJson} from './helpers.js';

describe('Array', function() {
    beforeEach(() => {
        sinon.stub(window, 'fetch');
    });

    afterEach(() => {
        window.fetch.restore();
    });

    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', async function() {

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
            await model.editIntent('movies'); //user types 'movies'

            console.log(model);

            chai.assert(callbackPreEditIntent.called);
            chai.assert(callbackPostEditIntent.called);

            // await model.clickSuggestionsItem(2); //user clicks suggestion item #2
            // await model.editIntent('movies 2018'); //user amends query to ' 2018'



        });
    });
});
