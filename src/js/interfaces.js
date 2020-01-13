'use strict';

/**
 @interface SearchHistoryDataService
 @summary Base class for history service
**/
export class SearchHistoryDataService {

    /**
     * @method clearHistory
     * @memberOf SearchHistoryDataService
     * @instance
     * @summary clears history
     * @param {SearchBIOS} model - instance of SearchBIOS
     */
    clearHistory(model) {
        throw 'Not implemented';
    }

    /**
     * @method fetchHistory
     * @memberOf SearchHistoryDataService
     * @instance
     * @summary fetches all history
     * @param {SearchBIOS} model - instance of SearchBIOS
     */
    fetchHistory(model) {
        throw 'Not implemented';
    }

    /**
     * @method applyHistoryItem
     * @memberOf SearchHistoryDataService
     * @instance
     * @summary add an item to history
     * @param {SearchBIOS} model - instance of SearchBIOS
     */
    async applyHistoryItem(model) {
        throw 'Not implemented';
    }
}

/**
 @interface SearchResultDataService
 @summary Base class for results service
 **/
export class SearchResultDataService {

    /**
     * @method fetchResults
     * @memberOf SearchResultDataService
     * @instance
     * @summary performs actual search
     * @param {SearchBIOS} model - instance of SearchBIOS
     */
    async fetchResults(model) {
        throw 'Not implemented';
    }
}

/**
 @interface SearchSuggestDataService
 @summary Base class for suggest service
 **/
export class SearchSuggestDataService {

    /**
     * @method fetchSuggestions
     * @memberOf SearchSuggestDataService
     * @instance
     * @summary fetches suggestion
     * @param {SearchBIOS} model - instance of SearchBIOS
     * @param {SearchBIOS} val - query string
     */
    fetchSuggestions(model, val) {
        throw 'Not implemented';
    }
}

