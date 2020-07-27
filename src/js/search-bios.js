'use strict';

import ShortUniqueId from 'short-unique-id';
import Promise from 'promise-polyfill';
import merge from 'lodash.merge';
import stripTags from 'underscore.string/stripTags';

/**
    @class SearchBIOS
    @summary Search BIOS, the brains of the operation
    @param {Object} data - Supplied configuration for the BIOS this.
    @param {String} data.id - The human friendly id to identify the instance.
    @param {ResultDataService} data.resultDataService - A data service instance to retrieve search results.
    @param {Request} [data.request] - The initial model request.
    @param {Config} [data.config] - The UI configuration for the instance.
    @param {HistoryDataService} [data.historyDataService] - A data service instance to retrieve user search history. Required when history is enabled.
    @param {SuggestionsDataService} [data.suggestionsDataService] - A data service instance to retrieve search suggestions. Required when suggestions are enabled.
    @param {Object} [data.callbacks] - User supplied functions to execute at given stages of the component lifecycle
    @param {Function} data.callbacks.preEditIntent
    @param {Function} data.callbacks.preOutsideTrigger
    @param {Function} data.callbacks.prePresentHistory
    @param {Function} data.callbacks.prePresentSuggestions
    @param {Function} data.callbacks.preDismissIntent
    @param {Function} data.callbacks.preDismissHistory
    @param {Function} data.callbacks.preDismissSuggestions
    @param {Function} data.callbacks.preClearHistory
    @param {Function} data.callbacks.preFetchSuggestions
    @param {Function} data.callbacks.preApplyHistoryItem
    @param {Function} data.callbacks.preSearch
    @param {Function} data.callbacks.preEsc
    @param {Function} data.callbacks.preEnter
    @param {Function} data.callbacks.preArrowDown
    @param {Function} data.callbacks.preArrowUp
    @param {Function} data.callbacks.preSetActiveDescendant
    @param {Function} data.callbacks.preLimit
    @param {Function} data.callbacks.preSort
    @param {Function} data.callbacks.postEditIntent
    @param {Function} data.callbacks.postOutsideTrigger
    @param {Function} data.callbacks.postPresentHistory
    @param {Function} data.callbacks.postPresentSuggestions
    @param {Function} data.callbacks.postDismissIntent
    @param {Function} data.callbacks.postDismissHistory
    @param {Function} data.callbacks.postDismissSuggestions
    @param {Function} data.callbacks.postClearHistory
    @param {Function} data.callbacks.postFetchSuggestions
    @param {Function} data.callbacks.postApplyHistoryItem
    @param {Function} data.callbacks.postSearch
    @param {Function} data.callbacks.postEsc
    @param {Function} data.callbacks.postEnter
    @param {Function} data.callbacks.postArrowDown
    @param {Function} data.callbacks.postArrowUp
    @param {Function} data.callbacks.postSetActiveDescendant
    @param {Function} data.callbacks.postLimit
    @param {Function} data.callbacks.postSort
*/
export default class SearchBIOS {

    constructor(data) {
        if (data === undefined) {
            data = {};
        }

        /** @private */
        const defaults = {};
        const suid = new ShortUniqueId();

        /**
         @typedef {Object} Request
         @memberOf SearchBIOS
         @property {String} q What the user has typed in the search field
         @property {Number} limit How many search results per page?
         @property {Number} offset Which page am I on?
         @property {Number} focusedHistoryItem Which history item am I considering selecting?
         @property {Number} focusedSuggestionItem Which suggestion item am I considering selecting?
         @property {String} activeDescendant HTML id of the selected suggestion or history item - used for ARIA
         */
        defaults.request = {};
        defaults.request.q = '';
        defaults.request.fq = '';
        defaults.request.limit = 25;
        defaults.request.offset = 0;
        defaults.request.focusedHistoryItem = -1;
        defaults.request.focusedSuggestionItem = -1;
        defaults.request.activeDescendant = '';

        /**
         @typedef {Object} Response
         @memberOf SearchBIOS
         @property {Array} history History list the user can select from
         @property {Array} suggestions Suggestions list the user can select from
         @property {Array} results The search results themselves
         @property {Array} facets The search facets themselves
         @property {Array} sort The search sort options themselves
         @property {Array} displayType The search displayType options themselves
         @property {String} resultsError The error message from results. If no error, an empty string.
         @property {String} historyError The error message from history. If no error, an empty string.
         @property {String} suggestionsError The error message from suggestions. If no error, an empty string.
         */
        defaults.response = {};
        defaults.response.history = [];
        defaults.response.suggestions = [];
        defaults.response.results = [];
        defaults.response.facets = [];
        defaults.response.sort = [];
        defaults.response.displayType = [];

        defaults.response.historyCount = 0;
        defaults.response.suggestionsCount = 0;

        defaults.response.resultsError = '';
        defaults.response.historyError = '';
        defaults.response.suggestionsError = '';

        /**
         @typedef {Object} Config
         @memberOf SearchBIOS
         @property {Number[]} [limitOptions] What are the choices the user can pick for _results per page_. Not required if you don’t have a limit (page size) UI control.
         @property {SortOption[]} [sortOptions] What are the choices the user can choose from to _sort the search results_. Not required if you don’t have a sort UI control.
         @property {SortOption[]} [displayTypeOptions] What are the choices the user can choose from to _present the search results display_. Not required if you don’t have a displayType UI control.
         @property {Boolean} [historyEnabled=false] You must define a `historyDataService` to use history
         @property {Boolean} [suggestionsEnabled=false] You must define a `suggestionsDataService` to use suggestions
         @property {Boolean} [autoSubmitAfterTyping=false] Execute the search without having to press `Enter` or click “Submit”
         @property {Boolean} [autoSubmitAfterSelectingSuggestionOrHistory=true] Execute the search without having to press `Enter` or click “Submit” after suggestion or history item is chosen
         @property {Number} [autoCollapseThreshold=700] When the viewport is less than this many pixels, the field is collapsed and hidden. To reveal it, the user activates a button.
         @property {Number} [delaySignificantKeyUp=600] How long to wait for _trailing_ significant keyup event
         @property {Number} [delayArrowUpKey=50] How long to wait for _leading_ arrow up keyup event
         @property {Number} [delayArrowDownKey=50] How long to wait for _leading_ arrow down keyup event
         @property {Number} [delayEnterKey=100] How long to wait for _leading_ enter keyup event
         @property {Number} [delayDismissIntent=500] How long to wait for _leading_ tab keydown event
         @property {Number} [delayAutoSubmit=600] How many milliseconds for _trailing_ key event to automatically submit the search?
         @property {Number} [delayResize=100] How long to delay on _trailing_ resize event for auto collapse logic
         @property {Number} [delayKeepOnScreen=50] How long to delay on _trailing_ resize and scroll events for positioning history and suggestions
         @property {Number} [delayFocusExpandButton=20]
         @property {Number} [delayFocusSearchField=20]
         @property {Number} [historyToSuggestionsCharThreshold=3] How many input characters before history switches to suggestions?
         @property {Number} [historyLoadingPlaceholderCount=10] How many placeholder bars to show in the history loading state?
         @property {Number} [suggestionsLoadingPlaceholderCount=10] How many placeholder bars to show in the suggestions loading state?
         @property {Number} [comboGroupMinHeight=250] The smallest history/suggestions dropdown height before flipping to the top
         */
        defaults.config = {
            historyEnabled: false,
            suggestionsEnabled: false,
            autoSubmitAfterTyping: false,
            autoSubmitAfterSelectingSuggestionOrHistory: true,
            autoCollapseThreshold: 700, //px
            delaySignificantKeyUp: 600,
            delayArrowUpKey: 50,
            delayArrowDownKey: 50,
            delayEnterKey: 100,
            delayDismissIntent: 500,
            delayAutoSubmit: 600,
            delayResize: 100,
            delayKeepOnScreen: 50,
            delayFocusExpandButton: 20,
            delayFocusSearchField: 20,
            historyToSuggestionsCharThreshold: 3,
            limitOptions: [],
            sortOptions: [],
            displayTypeOptions: [],
            historyLoadingPlaceholderCount: 10,
            suggestionsLoadingPlaceholderCount: 10,
            comboGroupMinHeight: 250
        };

        /**
         @typedef {Object} ResultDataService
         @memberOf SearchBIOS
         @summary Required
         */

        /**
         @typedef {Object} HistoryDataService
         @memberOf SearchBIOS
         */

        /**
         @typedef {Object} SuggestionsDataService
         @memberOf SearchBIOS
         */

        /**
         @typedef {Object} stateService
         @memberOf SearchBIOS
         @property {Boolean} [searchPristine=true]
         @property {Boolean} searchPending
         @property {Boolean} historyPending
         @property {Boolean} historyVisible
         @property {Boolean} suggestionsPending
         @property {Boolean} suggestionsVisible
         @property {Boolean} mobileZoomed
         */
        defaults.stateService = {};
        defaults.stateService.searchPristine = true;

        /**
         @typedef {Object} SortOption
         @memberOf SearchBIOS
         @property {String} text The text visible to the user for this type of results sorting.
         @property {String} value The internal system value for the result sort option that gets passed to the back-end within a query.
         */

        /**
         @property {String} sid Unique ID of the model instance
         @memberOf SearchBIOS
         @protected
         */
        defaults.sid = suid.randomUUID(6);

        //take the user’s configuration and apply it atop the default configuration
        merge(this, defaults, data);
    }

    /**
     * @method outsideTrigger
     * @memberOf SearchBIOS
     * @instance
     * @summary user has moved outside of the search field
     * @param {String} val - mobile zoomed value
     */
    async outsideTrigger(val) {
        this.callCustom('preOutsideTrigger');

        this.stateService.mobileZoomed = val;
        await this.dismissIntent('click away');

        this.callCustom('postOutsideTrigger');
    }

    /**
     * @method presentHistory
     * @memberOf SearchBIOS
     * @instance
     * @summary show search history to user
     */
    async presentHistory() {
        this.callCustom('prePresentHistory');
        this.request.focusedHistoryItem = -1;
        this.setActiveDescendant();
        this.stateService.historyVisible = true;
        this.stateService.historyPending = true;
        await this.fetchHistory();
        this.callCustom('postPresentHistory');
    }

    /**
     * @method presentSuggestions
     * @memberOf SearchBIOS
     * @instance
     * @summary show search suggestions to the user
     * @param {String} val - what to suggest
     */
    async presentSuggestions(val) {
        this.callCustom('prePresentSuggestions');
        this.request.focusedSuggestionItem = -1;
        this.setActiveDescendant();
        this.stateService.suggestionsVisible = true;
        this.stateService.suggestionsPending = true;
        await this.fetchSuggestions(val);
        this.callCustom('postPresentSuggestions');
    }

    /**
     * @method cleanQuery
     * @memberOf SearchBIOS
     * @instance
     * @summary remove extraneous whitespace from the query
     */
    cleanQuery(q) {
        return q.trim().replace(/\s\s+/g, ' ');
    }

    /**
     * @method toShowHistory
     * @memberOf SearchBIOS
     * @instance
     * @summary determine if history should be shown
     * @param {String} val - cleaned query string
     * @private
     */
    toShowHistory(val) {
        return ((this.config.historyEnabled && !this.config.suggestionsEnabled) || (this.config.historyEnabled &&
            this.config.suggestionsEnabled && val.length <= this.config.historyToSuggestionsCharThreshold));
    }

    /**
     * @method toShowSuggestions
     * @memberOf SearchBIOS
     * @instance
     * @summary determine if suggestions should be shown
     * @param {String} val - cleaned query string
     * @private
     */
    toShowSuggestions(val) {
        return (this.config.suggestionsEnabled && val.length > this.config.historyToSuggestionsCharThreshold);
    }

    /**
     * @method editIntent
     * @memberOf SearchBIOS
     * @instance
     * @summary user has shown intent to edit the search query - now do something
     * @param {String} val - dirty query string
     */
    async editIntent(val) {
        const cleanedQuery = this.cleanQuery(val);
        const willShowHistory = this.toShowHistory(cleanedQuery);
        const willShowSuggestions = this.toShowSuggestions(cleanedQuery);

        this.callCustom('preEditIntent', val, cleanedQuery, cleanedQuery.length, willShowHistory, willShowSuggestions);

        if (willShowHistory) {
            //time to show history

            if (this.config.suggestionsEnabled && this.stateService.suggestionsVisible) {
                this.dismissSuggestions('showHistoryInsteadOfSuggestionsEditIntent');
            }

            if (!this.stateService.historyVisible) {
                await this.presentHistory();
            }
        }
        else if (willShowSuggestions) {
            //time to show suggestions

            if (this.config.historyEnabled && this.stateService.historyVisible) {
                this.dismissHistory('showSuggestionsInsteadOfHistoryEditIntent');
            }

            await this.presentSuggestions(cleanedQuery);
        }

        this.callCustom('postEditIntent', val, cleanedQuery, cleanedQuery.length, willShowHistory, willShowSuggestions);

        return Promise.resolve();
    }

    /**
     * @method dismissIntent
     * @memberOf SearchBIOS
     * @instance
     * @summary user has shown intent end the search experience in some way - now do something
     * @param {String} reason - reason why this is happening
     */
    dismissIntent(reason) {
        this.callCustom('preDismissIntent', reason);

        if (this.stateService.historyVisible) {
            this.dismissHistory('dismissIntent');
        }

        if (this.stateService.suggestionsVisible) {
            this.dismissSuggestions('dismissIntent');
        }

        this.callCustom('postDismissIntent', reason);
    }

    /**
     * @method dismissHistory
     * @memberOf SearchBIOS
     * @instance
     * @summary dismiss search history
     * @param {String} reason - reason why this is happening
     */
    dismissHistory(reason) {
        this.callCustom('preDismissHistory', reason);
        this.request.focusedHistoryItem = -1;
        this.stateService.historyVisible = false;
        this.stateService.historyPending = false;
        this.response.historyCount = 0;
        this.callCustom('postDismissHistory', reason);
    }

    /**
     * @method dismissSuggestions
     * @memberOf SearchBIOS
     * @instance
     * @summary dismiss search suggestions
     * @param {String} reason - reason why this is happening
     */
    dismissSuggestions(reason) {
        this.callCustom('preDismissSuggestions', reason);
        this.request.focusedSuggestionItem = -1;
        this.setActiveDescendant();
        this.stateService.suggestionsVisible = false;
        this.stateService.suggestionsPending = false;
        this.response.suggestionsCount = 0;
        this.callCustom('postDismissSuggestions', reason);
    }

    /**
     * @method clearHistory
     * @memberOf SearchBIOS
     * @instance
     * @summary clear the search history buffer and call the data service’s clear history method
     */
    async clearHistory() {
        this.callCustom('preClearHistory');
        await this.historyDataService.clearHistory(this);
        this.response.history = [];
        this.callCustom('postClearHistory');
    }

    /**
     * @method fetchHistory
     * @memberOf SearchBIOS
     * @instance
     * @summary get the search history from the data service and set the results to the local buffer
     */
    fetchHistory() {
        this.callCustom('preFetchHistory');

        return new Promise((resolve, reject) => {
            this.stateService.historyPending = true;

            const dataServicePromise = this.historyDataService.fetchHistory(this);

            dataServicePromise.then((res) => {
                this.stateService.historyPending = false;
                this.response.history = res;
                this.response.historyError = '';
                this.callCustom('resolveFetchHistory', res);
                resolve();
            }, (err) => {
                this.stateService.historyPending = false;
                this.response.historyError = err;
                this.callCustom('rejectFetchHistory', err);
                reject();
            }).catch((err) => {
                this.stateService.historyPending = false;
                this.response.historyError = '';
                this.callCustom('catchFetchHistory', err);
                reject();
            });

            this.callCustom('postFetchHistory');
        });
    }

    /**
     * @method fetchSuggestions
     * @memberOf SearchBIOS
     * @instance
     * @summary fetch the search suggestions from the data service and set the results to the local buffer
     * @param {String} val - what to suggest upon
     */
    fetchSuggestions(val) {
        this.callCustom('preFetchSuggestions');

        return new Promise((resolve, reject) => {
            this.stateService.suggestionsPending = true;

            const dataServicePromise = this.suggestionsDataService.fetchSuggestions(this, val);

            dataServicePromise.then((res) => {
                this.stateService.suggestionsPending = false;
                this.response.suggestionsCount = 0;

                this.response.suggestions = res;

                if (Array.isArray(this.response.suggestions)) { //groups

                    this.response.suggestions = this.response.suggestions.map((item) => {

                        if (typeof (item.groupId) === 'undefined') { //flat
                            item.suggestionIndex = ++this.response.suggestionsCount;
                        }
                        else if (Array.isArray(item.suggestions)) { //grouped
                            item.suggestions = item.suggestions.map((suggestion) => {
                                suggestion.suggestionIndex = ++this.response.suggestionsCount;
                                return suggestion;
                            });
                        }

                        return item;
                    });
                }

                this.response.suggestionsError = '';
                this.callCustom('resolveFetchSuggestions', res);
                resolve();
            }, (err) => {
                this.stateService.suggestionsPending = false;
                this.response.suggestionsError = err;
                this.callCustom('rejectFetchSuggestions', err);
                reject();
            }).catch((err) => {
                this.stateService.suggestionsPending = false;
                this.response.suggestionsError = err;
                this.callCustom('catchFetchSuggestions', err);
                reject();
            });

            this.callCustom('postFetchSuggestions');
        });
    }

    /**
     * @method applyHistoryItem
     * @memberOf SearchBIOS
     * @instance
     * @summary add a history item by calling the history data service’s method
     */
    async applyHistoryItem() {
        this.callCustom('preApplyHistoryItem');
        await this.historyDataService.applyHistoryItem(this);
        this.callCustom('postApplyHistoryItem');
    }

    /**
     * @method clickHistoryItem
     * @memberOf SearchBIOS
     * @instance
     * @summary user has clicked a history item
     */
    async clickHistoryItem(idx) {
        const newQuery = this.response.history[idx];
        if (newQuery !== undefined) {
            this.request.q = newQuery;
            if (this.config.autoSubmitAfterSelectingSuggestionOrHistory) {
                await this.search(this.request.q, 'clickHistoryItem');
            }
        }

        await this.dismissHistory('clickHistoryItem');
    }

    /**
     * @method clickSuggestionsItem
     * @memberOf SearchBIOS
     * @instance
     * @summary user has clicked a suggestion item
     */
    async clickSuggestionsItem(suggestionId) {
        const flatSuggestions = this.suggestionsToFlatSuggestions();
        const haystack = flatSuggestions.find(suggestion => suggestion.suggestionId === suggestionId);

        if (haystack && haystack.term) {
            const newQuery = stripTags(haystack.term);
            this.request.q = newQuery;
            if (this.config.autoSubmitAfterSelectingSuggestionOrHistory) {
                await this.search(this.request.q, 'clickSuggestionsItem');
            }
        }

        this.dismissSuggestions('clickSuggestionsItem');
    }

    /**
     * @method search
     * @memberOf SearchBIOS
     * @instance
     * @summary execute a search for what is in the search field
     */
    async search(val, reason) {
        if (this.callbacks !== undefined && this.callbacks.validate !== undefined && typeof this.callbacks.validate === 'function') {
            const validateResult = await this.callbacks.validate.apply(this, [val]);
            if (!validateResult) {
                return Promise.resolve();
            }
        }

        this.callCustom('preSearch', val, reason);
        this.request.q = val;

        this.stateService.searchPristine = false;
        this.stateService.historyVisible = false;
        this.stateService.suggestionsVisible = false;

        return new Promise(async (resolve, reject) => {
            this.stateService.searchPending = true;
            const dataServicePromise = this.resultDataService.fetchResults(this);

            if (this.config.historyEnabled) {
                //user executed search, add to history - I don’t care how the service implements history! :)
                await this.applyHistoryItem();
            }

            dataServicePromise.then((res) => {
                this.stateService.searchPending = false;
                this.response.results = res;
                this.response.resultsError = '';
                this.callCustom('resolveSearch', res);
                resolve();
            }, (err) => {
                this.stateService.searchPending = false;
                this.response.resultsError = err;
                this.callCustom('rejectSearch', err);
                reject();
            }).catch((err) => {
                this.stateService.searchPending = false;
                this.response.resultsError = err;
                this.callCustom('catchSearch', err);
                reject();
            });

            this.callCustom('postSearch', val, reason);
        });
    }

    /**
     * @method esc
     * @memberOf SearchBIOS
     * @instance
     * @summary user has typed the ESC key
     */
    esc() {
        this.callCustom('preEsc');
        if (this.stateService.historyVisible) {
            this.dismissHistory('esc');
        }
        else if (this.stateService.suggestionsVisible) {
            this.dismissSuggestions('esc');
        }
        else if (this.stateService.mobileZoomed) {
            this.stateService.mobileZoomed = false;
        }

        this.callCustom('postEsc');
    }

    /**
     * @method enter
     * @memberOf SearchBIOS
     * @instance
     * @summary user has typed the Enter key
     */
    async enter(val) {
        this.callCustom('preEnter');

        if (this.stateService.historyVisible && this.request.focusedHistoryItem > -1) {
            this.request.q = this.response.history[this.request.focusedHistoryItem];
            if (this.config.autoSubmitAfterSelectingSuggestionOrHistory) {
                await this.search(this.request.q, 'enterKeyHistory');
            }
            await this.dismissHistory('enter');
        }
        else if (this.stateService.suggestionsVisible && this.request.focusedSuggestionItem > -1) {
            const flatSuggestions = this.suggestionsToFlatSuggestions();
            const haystack = flatSuggestions.find(suggestion => suggestion.suggestionIndex === this.request.focusedSuggestionItem + 1);

            if (haystack && haystack.term) {
                const newQuery = stripTags(haystack.term);
                this.request.q = newQuery;
                if (this.config.autoSubmitAfterSelectingSuggestionOrHistory) {
                    await this.search(this.request.q, 'enterKeySuggestions');
                }
            }

            //console.log('focused suggestion item', this.request.focusedSuggestionItem, newQuery);

            this.dismissSuggestions('enter');
        }
        else {
            await this.search(val, 'enterKeyPlain');
        }
        this.callCustom('postEnter');
    }

    /**
     * @method suggestionsToFlatSuggestions
     * @memberOf SearchBIOS
     * @instance
     * @summary convert suggestions into flat list
     */
    suggestionsToFlatSuggestions() {
        let flatSuggestions = [];

        if (Array.isArray(this.response.suggestions)) {
            this.response.suggestions.forEach((item) => {
                if (Array.isArray(item.suggestions)) { //grouped
                    flatSuggestions = flatSuggestions.concat(item.suggestions);
                }
            });
        }

        return flatSuggestions;
    }

    /**
     * @method arrowUp
     * @memberOf SearchBIOS
     * @instance
     * @summary user has typed the Arrow Up key
     */
    async arrowUp(val) {
        const cleanedQuery = this.cleanQuery(val);
        const willShowHistory = this.toShowHistory(cleanedQuery);
        const willShowSuggestions = this.toShowSuggestions(cleanedQuery);

        this.callCustom('preArrowUp', val, cleanedQuery, cleanedQuery.length, willShowHistory, willShowSuggestions);

        if (
            willShowHistory &&
            this.stateService.historyVisible &&
            !this.stateService.historyPending &&
            this.response.history.length > 0
        ) {
            if (this.request.focusedHistoryItem === -1) {
                this.request.focusedHistoryItem = this.response.history.length - 1;
            }
            else if (this.request.focusedHistoryItem - 1 > this.response.history.length - 1) {
                this.request.focusedHistoryItem = -1; //nothing is selected
            }
            else {
                this.request.focusedHistoryItem--;
            }

            this.setActiveDescendant();
        }
        else if (
            willShowSuggestions &&
            this.stateService.suggestionsVisible &&
            !this.stateService.suggestionsPending &&
            this.response.suggestionsCount > 0
        ) {
            if (this.request.focusedSuggestionItem === -1) {
                this.request.focusedSuggestionItem = this.response.suggestionsCount - 1;
            }
            else if (this.request.focusedSuggestionItem - 1 > this.response.suggestionsCount) {
                this.request.focusedSuggestionItem = -1; //nothing is selected
            }
            else {
                this.request.focusedSuggestionItem--;
            }
            this.setActiveDescendant();
        }
        else if (willShowHistory) {
            //time to show history

            if (this.config.suggestionsEnabled && this.stateService.suggestionsVisible) {
                this.dismissSuggestions('showHistoryInsteadOfSuggestionsArrowUp');
            }

            if (!this.stateService.historyVisible) {
                await this.presentHistory();
            }
        }
        else if (willShowSuggestions) {
            //time to show suggestions

            if (this.config.historyEnabled && this.stateService.historyVisible) {
                this.dismissHistory('showSuggestionsInsteadOfHistoryArrowUp');
            }

            await this.presentSuggestions(cleanedQuery);
        }

        this.callCustom('postArrowUp', val, cleanedQuery, cleanedQuery.length, willShowHistory, willShowSuggestions);
    }

    /**
     * @method arrowDown
     * @memberOf SearchBIOS
     * @instance
     * @summary user has typed the Arrow Down key
     */
    async arrowDown(val) {
        const cleanedQuery = this.cleanQuery(val);
        const willShowHistory = this.toShowHistory(cleanedQuery);
        const willShowSuggestions = this.toShowSuggestions(cleanedQuery);

        this.callCustom('preArrowDown', val, cleanedQuery, cleanedQuery.length, willShowHistory, willShowSuggestions);

        if (
            willShowHistory &&
            this.stateService.historyVisible &&
            !this.stateService.historyPending &&
            this.response.history.length > 0
        ) {
            if (this.request.focusedHistoryItem === -1) {
                this.request.focusedHistoryItem = 0;
            }
            else if (this.request.focusedHistoryItem + 1 === this.response.history.length) {
                this.request.focusedHistoryItem = -1; //nothing is selected
            }
            else {
                this.request.focusedHistoryItem++;
            }
            this.setActiveDescendant();
        }
        else if (
            willShowSuggestions &&
            this.stateService.suggestionsVisible &&
            !this.stateService.suggestionsPending &&
            this.response.suggestionsCount > 0
        ) {
            if (this.request.focusedSuggestionItem === -1) {
                this.request.focusedSuggestionItem = 0;
            }
            else if (this.request.focusedSuggestionItem + 1 === this.response.suggestionsCount) {
                this.request.focusedSuggestionItem = -1; //nothing is selected
            }
            else {
                this.request.focusedSuggestionItem++;
            }
            this.setActiveDescendant();
        }
        else if (willShowHistory) {
            //time to show history

            if (this.config.suggestionsEnabled && this.stateService.suggestionsVisible) {
                this.dismissSuggestions('showHistoryInsteadOfSuggestionsArrowDown');
            }

            if (!this.stateService.historyVisible) {
                await this.presentHistory();
            }
        }
        else if (willShowSuggestions) {
            //time to show suggestions

            if (this.config.historyEnabled && this.stateService.historyVisible) {
                this.dismissHistory('showSuggestionsInsteadOfHistoryArrowDown');
            }

            await this.presentSuggestions(cleanedQuery);
        }

        this.callCustom('postArrowDown', val, cleanedQuery, cleanedQuery.length, willShowHistory, willShowSuggestions);
    }

    /**
     * @method setActiveDescendant
     * @memberOf SearchBIOS
     * @instance
     * @summary set the active descendent ARIA value based on what item has focus
     */
    setActiveDescendant() {
        this.callCustom('preSetActiveDescendant');
        if (this.request.focusedHistoryItem !== -1) {
            this.request.activeDescendant = this.sid + '-search-history-result-item-' + this.request.focusedHistoryItem;
        }
        else if (this.request.focusedSuggestionItem !== -1) {
            this.request.activeDescendant = this.sid + '-search-suggestion-result-item-' + this.request.focusedSuggestionItem;
        }
        else {
            this.request.activeDescendant = '';
        }
        this.callCustom('postSetActiveDescendant');
    }

    /**
     * @method trackEventGA
     * @memberOf SearchBIOS
     * @instance
     * @summary standard function interface for different Google Analytics implementations
     * @private
     */
    trackEventGA(category, action, label, value) {
        if (value === undefined) {
            value = 0;
        }

        if (typeof window !== 'undefined') {
            if (typeof (window._gaq) !== 'undefined') {
                window._gaq.push(['_trackEvent', category, action, label, value]);
            }
            else if (typeof (window.gtag) !== 'undefined') {
                // jscs:disable
                window.gtag('event', action, {
                    event_category: category, // jshint ignore:line
                    event_label: label // jshint ignore:line
                });
                // jscs:enable
            }
            else if (typeof (window.ga) !== 'undefined') {
                window.ga('send', 'event', category, action, label, value);
            }
        }
    }

    /**
     * @method callCustom
     * @memberOf SearchBIOS
     * @instance
     * @summary execute an implementation defined callback on a certain action
     * @private
     */
    callCustom(userFn) {
        const sliced = Array.prototype.slice.call(arguments, 1);

        const action = arguments[0];

        this.trackEventGA('SearchBIOS', action);

        if (this.callbacks !== undefined && this.callbacks[userFn] !== undefined && typeof this.callbacks[userFn] === 'function') {
            this.callbacks[userFn].apply(this, sliced);
        }
    }

    /**
     * @method setRequestLimit
     * @memberOf SearchBIOS
     * @instance
     * @summary set the search model limit variable
     */
    setRequestLimit(val) {
        this.callCustom('preLimit');
        this.request.limit = val;
        this.callCustom('postLimit');
    }

    /**
     * @method setRequestSort
     * @memberOf SearchBIOS
     * @instance
     * @summary set the search model sort variable
     */
    setRequestSort(val) {
        this.callCustom('preSort');
        this.request.sort = val;
        this.callCustom('postSort');
    }

    /**
     * @method setRequestDisplayType
     * @memberOf SearchBIOS
     * @instance
     * @summary set the search model sort variable
     */
    setRequestDisplayType(val) {
        this.callCustom('preDisplayType');
        this.request.displayType = val;
        this.callCustom('postDisplayType');
    }

    /**
     * @method setMobileZoomed
     * @memberOf SearchBIOS
     * @instance
     * @summary set the search mobile zoomed state
     */
    setMobileZoomed(val) {
        this.callCustom('preMobileZoomed');
        this.stateService.mobileZoomed = val;
        this.callCustom('postMobileZoomed');
    }

}
