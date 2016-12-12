import Vue from 'vue'
import App from 'App'
import sync from 'vuex-router-sync'

if (module.hot) {
  module.hot.accept()
}

const a = new Vue({
  el: '#app',
  render: h => h(App)
})

console.log(sync)
console.log(a)
