import {app} from './app'
import FastClick from 'fastclick';

import Promise from 'promise-polyfill'

window.Promise = window.Promise || Promise

app.$mount('#app')

// window.onmessage = (msg) => {
//   console.log(msg )
// };

FastClick.attach(document.body, {});

