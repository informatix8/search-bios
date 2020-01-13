'use strict';

import Promise from 'promise-polyfill';
import {SearchHistoryDataService} from './interfaces';
import _ from 'lodash';

export default class SearchHistoryDataServiceMemory extends SearchHistoryDataService {

    constructor (opts) {
        super();
        this.items = {};
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
        const storageId = model.id + '-' + 'search-history';
        this.items[storageId] = null;
    }

    fetchHistory (model) {
        return new Promise((resolve) => {
            const storageId = model.id + '-' + 'search-history';
            let storageContents = this.items[storageId];
            if (storageContents === null) {
                storageContents = [];
            }
            resolve(storageContents.slice(0, this.maxHistory));
        });
    }

    async applyHistoryItem (model) {
        const storageId = model.id + '-' + 'search-history';
        let storageContents = this.items[storageId];

        if (!Array.isArray(storageContents)) {
            storageContents = [];
        }

        const newStorageContents = storageContents;
        let cleanedQuery = model.request.q;
        cleanedQuery = cleanedQuery.trim().replace(/\s\s+/g, ' ');

        if (cleanedQuery !== ' ' && cleanedQuery !== '') {
            this.add(newStorageContents, cleanedQuery);
        }

        this.items[storageId] = newStorageContents;
    }

}
