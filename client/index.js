import {app} from './app'
import FastClick from 'fastclick';


app.$mount('#app')


window.onmessage = (msg) => {
	app.$emit('postMessage',msg)
};

FastClick.attach(document.body, {});

