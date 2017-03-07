import {app} from './app'
import FastClick from 'fastclick';


app.$mount('#app')


// window.onmessage = (msg) => {
//   console.log(msg )
// };

FastClick.attach(document.body, {});

