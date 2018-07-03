<template>
  <div id="app">
    <Medcalc/>
  </div>
</template>

<script>
import Medcalc from './components/Medcalc.vue'

export default {
  name: 'app',
  components: {
    Medcalc
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
