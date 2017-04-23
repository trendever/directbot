import {app} from './app'
import FastClick from 'fastclick';

import Promise from 'promise-polyfill'

window.Promise = window.Promise || Promise

for (var i = 0; i < localStorage.length; i++){
    let key = localStorage.key(i);
    console.log(key)
    if(localStorage.getItem(key).indexOf('scroll'  -1)){
      localStorage.removeItem(key);
    }
}

app.$mount('#app')

// window.onmessage = (msg) => {
//   console.log(msg )
// };

FastClick.attach(document.body, {});



