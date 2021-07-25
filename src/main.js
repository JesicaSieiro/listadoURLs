// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

//importamos la lireria para poder usar la integracion de vue y firebase
//import VueFire from 'vuefire'
//Vue.use(VueFire);
import { firestorePlugin } from 'vuefire'

Vue.use(firestorePlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
