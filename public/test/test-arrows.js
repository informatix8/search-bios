import sinon from '/node_modules/sinon/pkg/sinon-esm.js';
import {jsonOk, searchResultJson, searchSuggestJson} from './helpers.js';

describe('Interaction', function() {
    beforeEach(() => {
        sinon.stub(window, 'fetch');
    });

    afterEach(() => {
        window.fetch.restore();
    });

    describe('arrows', function() {
        it('test arrow up and down', async function() {

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
                    preArrowDown: function (val, cleanedQuery, length, willShowHistory, willShowSuggestions) {
                        console.log('preArrowDown', val, cleanedQuery, length, willShowHistory, willShowSuggestions);
                    },
                    postPresentSuggestions: function () {
                        console.log(this.id + ' suggestions presented');
                    }
                }
            });


            window.fetch.returns(jsonOk(searchSuggestJson));
            await model.editIntent('123456');
            chai.assert.lengthOf(model.response.suggestions, 2);
            chai.assert.isOk(model.stateService.suggestionsVisible);

            chai.assert.equal(model.request.focusedSuggestionItem, -1);
            model.arrowUp('123456');
            chai.assert.equal(model.request.focusedSuggestionItem, 12);
            model.arrowUp('123456');
            chai.assert.equal(model.request.focusedSuggestionItem, 11);
            model.arrowUp('123456');
            chai.assert.equal(model.request.focusedSuggestionItem, 10);
            model.arrowUp('123456');
            chai.assert.equal(model.request.focusedSuggestionItem, 9);

            model.esc();
            chai.assert.equal(model.request.focusedSuggestionItem, -1);

            model.arrowDown('123456');
            chai.assert.equal(model.request.focusedSuggestionItem, -1);

            await model.editIntent('123456');

            model.arrowDown('123456');
            chai.assert.equal(model.request.focusedSuggestionItem, 0);
            model.arrowDown('123456');
            chai.assert.equal(model.request.focusedSuggestionItem, 1);
            model.arrowDown('123456');
            chai.assert.equal(model.request.focusedSuggestionItem, 2);
            model.arrowDown('123456');
            chai.assert.equal(model.request.focusedSuggestionItem, 3);

            model.esc();
            chai.assert.equal(model.request.focusedSuggestionItem, -1);
        });
    });
});
