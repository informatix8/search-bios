'use strict';

import Promise from 'promise-polyfill';
import 'whatwg-fetch';

// jscs:disable validateIndentation
//                                                               .8OOII+=~O8=.
//                                                               ?8OZDNNDD8O8 .
//                                                          ...DNN8OD$DNNDDNDOM,
//                                                         ..+DDND88NDNNDD+8ON8
//                                                       . 8DDDNNND888O8D8NNNMN8 .
//                           ..... ....    .       ....Z8DDDDDNND88D88O88D8NDNNNZ.
//                                ..... .  ..     . .8D8DDDDNDND8DNDOZO8O8D8DNNN8.
//                           ...$O8OOOO8O8O8OOO888888D88DNNNNN8DD8DNNOOO8OO8ZDN8I.
//                       ....,888DD8D88DDDDDDDDDDNDDDD88DNNDDN8DDNMMNDDI~,I8OOO.
//                       ..Z8D8DDDD8D8DDDDDDDDDDNNMNDDD88DDDDNM8DNNND...   .....
//                       .8D8DDDDDD888DDDDDDDDNDDNNND888888DNN888DN8O..
//                  .. ..8DD8DDDDDDD888DDDDDDDDDDNNMNDDD88D8NNNDDND8?..
//                  .. .D8DDDDDDDDDDDD8DD88D8DDDDDDN8DDDD8DDNNMNMNO8$..
//                  .. .888DDNNDDDDDDDDD8888DDDDDDDNDNDDDDD8NMNND88O~..
//                  . .88DD8DNDDNDNNDDDDDDDDD888DDDNDN8DDDDNDDD88DO8. .
//                  . .DN8D88DDDDDDDDN88DDDDD888D8DNNNDDDDNNMND8D88O. .
//                  . .8N8D88DDDDDDDDDDD8DDDD888DDDNND88DDNMMN8DDN8Z. .
//                  ..8DM88888DDDDDDDNNND8D8888888DDDD8NNNMMD8NNNND....
//                  ..8DD88DDDDDDNDDDDNDNND8D88D8D8NDNNNNMMNDNNMNNN....
//                  .8DN88888DDDDDDDNNNNNNDDD8888DDDNNNNMMNNNMNMMN.....
//                  D8NM88888888NN$MNNNNNND88DD88D8DNMNDNNI~NNNMN8. .
//               .:88DD8O8888D88O..DNNNNNDD....788DNNNNND...NNNDDD
//               NDDNNMD888DD88D...DDDDDDM=........ZNNMND,..N8DDDD
//8DD    ....+DODDNNN.M8D8D88D+. .:DDDNND?.        .88DDDD..DDDN8D
//NN88888D88D88ODNN,DND888ODO...  Z8DDDD8..         ?8DNDD..N8DD8?
//.OND8O888O8DD7....DOD8O8Z.... ..8DDDDN. .         .DD88D..:DNND.
//...$8Z$+......  ..8DN8I .    ..ZD88DN .           .~888DD..DMND.
//    .....         8D8$.      .?NDNDN.              .D8D88=.NDDO.
//. ..              ONN8.      ..ODNDN.              .,8888Z.8D8...
//                  :DNN~..      .IDDND8........    ...88NN8INNDI...
//                  .DNND8?..     ..ZONNNNN8DO.     ....DMNNNNNNNN8O. .
//                  .$O88D8..       ...8888NN= .     ...8DN888NDDD8D.
//                  ..... ..          .....  .       ...OZZ?:,....  .
// jscs:enable validateIndentation

import {clearString} from './helpers';
import {SearchSuggestDataService} from './interfaces';

export default class SearchSuggestDataServiceEpsilon extends SearchSuggestDataService {

    constructor() {
        super();
        this.contract = {
            groupName: 'string',
            suggestions: [
                {
                    term: 'string',
                    weight: 'number',
                    payload: 'string'
                }
            ]
        };
    }

    fetchSuggestions(model, val) {
        console.log(val, 'was typed for suggestions');

        return new Promise((resolve, reject) => {
            const params = new URLSearchParams();
            params.set('q', clearString(val));

            fetch('/api/v1/search/epsilon/summarySuggest?' + params.toString(), {
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                .then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response;
                    } else {
                        const error = new Error(response.statusText);
                        error.response = response;
                        throw error;
                    }
                })
                .then(response => response.clone().json())
                .then(json => {
                    resolve(json.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

}
