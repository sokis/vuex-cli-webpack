import Vue from 'vue'
import App from 'App'

if (module.hot) {
  module.hot.accept()
}

new Vue({
  el: '#app',
  render: h => h(App)
})
