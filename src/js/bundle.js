'use strict';

import SearchBIOS from './search-bios';
import SearchHistoryDataServiceLocalStorage from './search-history-data-service-local-storage';
import SearchHistoryDataServiceMemory from './search-history-data-service-memory';

import {SearchResultDataService, SearchHistoryDataService, SearchSuggestDataService} from './interfaces';
import {clearString} from './helpers';

export {
    SearchBIOS,
    SearchHistoryDataServiceLocalStorage,
    SearchHistoryDataServiceMemory,
    SearchResultDataService,
    SearchHistoryDataService,
    SearchSuggestDataService,
    clearString
};
