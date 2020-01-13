import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const config = [

    //
    // DEV BUNDLE
    //

    {
        input: 'src/js/search-bios.js',
        output: {
            name: 'SearchBIOS',
            file: 'public/generated/search-bios.js',
            format: 'iife', // immediately-invoked function expression — suitable for <script> tags
            sourcemap: true
        },
        plugins: [
            resolve(),
            commonjs()
        ]
    },
    {
        input: 'src/js/search-result-data-service-theta.js',
        output: {
            name: 'SearchResultDataServiceTheta',
            file: 'public/generated/search-result-data-service-theta.js',
            format: 'iife', // immediately-invoked function expression — suitable for <script> tags
            sourcemap: true
        },
        plugins: [
            resolve(),
            commonjs()
        ]
    },
    {
        input: 'src/js/search-history-data-service-local-storage.js',
        output: {
            name: 'SearchHistoryDataServiceLocalStorage',
            file: 'public/generated/search-history-data-service-local-storage.js',
            format: 'iife', // immediately-invoked function expression — suitable for <script> tags
            sourcemap: true
        },
        plugins: [
            resolve(),
            commonjs()
        ]
    },
    {
        input: 'src/js/search-suggest-data-service-epsilon.js',
        output: {
            name: 'SearchSuggestDataServiceEpsilon',
            file: 'public/generated/search-suggest-data-service-epsilon.js',
            format: 'iife', // immediately-invoked function expression — suitable for <script> tags
            sourcemap: true
        },
        plugins: [
            resolve(),
            commonjs()
        ]
    },
    {
        input: 'src/js/search-history-data-service-memory.js',
        output: {
            name: 'SearchHistoryDataServiceMemory',
            file: 'public/generated/search-history-data-service-memory.js',
            format: 'iife', // immediately-invoked function expression — suitable for <script> tags
            sourcemap: true
        },
        plugins: [
            resolve(),
            commonjs()
        ]
    },

    //
    // PROD BUNDLE
    //

    {
        input: 'src/js/bundle.js',
        output: {
            name: 'SearchBIOS',
            file: 'dist/search-bios.umd.js',
            format: 'umd',
            compact: true,
            sourcemap: true
        },
        external: [
            'lodash.debounce',
            'lodash.merge',
            'underscore.string',
            'short-unique-id',
            'what-input'
        ],
        plugins: [
            resolve(),
            commonjs(),
            terser({
                ecma: 5
            }),
            filesize()
        ]
    },
    {
        input: 'src/js/bundle.js',
        output: {
            name: 'SearchBIOS',
            file: 'dist/search-bios.all.umd.js',
            format: 'umd',
            compact: true,
            sourcemap: true
        },
        plugins: [
            resolve(),
            commonjs(),
            terser({
                ecma: 5
            }),
            filesize()
        ]
    },
    {
        input: 'src/js/bundle.js',
        external: [
            'lodash.debounce',
            'lodash.merge',
            'underscore.string',
            'short-unique-id',
            'what-input'
        ],
        output: [
            {
                file: pkg.main,
                compact: true,
                format: 'cjs',
                sourcemap: true
            },
            {
                file: pkg.module,
                compact: true,
                format: 'es',
                sourcemap: true
            }
        ],
        plugins: [
            terser({
                ecma: 5
            }),
            filesize()
        ]
    }
];

/*
const globby = require('globby');
globby.sync('test/js/!*.js').forEach(inputFile => {
    config.push({
        input: inputFile,
        output: {
            name: inputFile,
            file: 'public/generated/'+inputFile,
            format: 'iife', // immediately-invoked function expression — suitable for <script> tags
            sourcemap: true
        },
        plugins: [
            resolve(),
            commonjs(),
            json()
        ]
    })

});
*/

export default config;
