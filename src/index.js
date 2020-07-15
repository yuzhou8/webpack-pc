import Vue from 'vue'
import compositionApi from '@vue/composition-api'
import Plugin from 'yu-vue'
import App from './app.vue'
import router from './router/router.js'
import './public/index.css'

Vue.use(compositionApi)
Vue.use(new Plugin('//at.alicdn.com/t/font_1139100_rlq2wt5r6z.js'))

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	render: h => h(App)
});