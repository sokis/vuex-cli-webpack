<template>
  <div style="height: 100%">
    <hello></hello>..world {{name}}
  </div>
</template>

<script>
  import Hello from './Hello'

  export default {
    name: 'App',
    data() {
      return {
        name: 'zhangsan'
      }
    },
    components: {
      Hello
    }
  }
</script>

<style src="styles/app.css"></style>
