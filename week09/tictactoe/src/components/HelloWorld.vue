<template>
  <h1>{{ msg }}</h1>
  <button @click="setCount">count is: {{ count }}</button>
  <p>Edit {{str}}<code>components/HelloWorld.vue</code> to test hot module replacement.</p>
</template>

<script lang="ts">
import * as vue from 'vue';
import ad from './index';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup() {
    // console.log(vue);
    vue.onMounted(() => {
      console.log('234345');
    })
    return ad();
  }
}
</script>
