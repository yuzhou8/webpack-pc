import Vue from 'vue'
import App from './app.vue'
import router from './router/router.js'
import './public/index.css'


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	render: h => h(App)
});