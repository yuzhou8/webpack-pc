import Vue from 'vue'
import compositionApi from '@vue/composition-api'
import App from './app.vue'
import router from './router/router.js'
import './public/index.css'

Vue.use(compositionApi)

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	render: h => h(App)
});