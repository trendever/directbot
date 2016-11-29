import {app} from './app'

app.$mount('#app')

window.onmessage = (msg) => {
	app.$emit('postMessage',msg)
};