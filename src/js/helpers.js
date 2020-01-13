'use strict';

export function clearString(str) {
    if (typeof str === 'string') {
        return str.trim().replace(/\s\s+/g, ' ');
    }
    else {
        return str;
    }
}
