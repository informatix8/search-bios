'use strict';

import Promise from 'promise-polyfill';
import {SearchHistoryDataService} from './interfaces';
import _ from 'lodash';

export default class SearchHistoryDataServiceLocalStorage extends SearchHistoryDataService {

    constructor (opts) {
        super();
        var dataService = this;
        var defaults = {};
        defaults.maxHistory = 200;
        _.merge(dataService, defaults, opts);
        return dataService;
    }

    add (array, value) {
        if (array.indexOf(value) === -1) {
            array.push(value);
        }
    }

    clearHistory (model) {
        var localStorageId = model.id + '-' + 'search-history';
        localStorage.removeItem(localStorageId);
    }

    fetchHistory (model) {
        return new Promise((resolve) => {
            const localStorageId = model.id + '-' + 'search-history';
            let storageContents = JSON.parse(localStorage.getItem(localStorageId));
            if (storageContents === null) {
                storageContents = [];
            }
            resolve(storageContents.slice(0, this.maxHistory));
        });
    }

    async applyHistoryItem (model) {
        //TODO expand to accommodate multiple fields
        const localStorageId = model.id + '-' + 'search-history';
        let storageContents = JSON.parse(localStorage.getItem(localStorageId));

        if (storageContents === null) {
            storageContents = [];
        }

        const newStorageContents = storageContents;
        let cleanedQuery = model.request.q;
        cleanedQuery = cleanedQuery.trim().replace(/\s\s+/g, ' ');

        if (cleanedQuery !== ' ' && cleanedQuery !== '') {
            this.add(newStorageContents, cleanedQuery);
        }

        localStorage.setItem(localStorageId, JSON.stringify(newStorageContents));
    }

}
