<script>
import Vue from 'vue';
import { {{#to_hump name}}{{/to_hump}} } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    {{#to_hump name}}{{/to_hump}},
  }
});
</script>

<template>
  <div id="app">
    <{{name}} />
  </div>
</template>
<style lang="less" scoped>
#app {
  margin: 0;
  padding: 0;
}
</style>
<style lang="less">
body {
  padding: 0;
  margin: 0;
}
</style>