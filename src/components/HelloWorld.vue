<template>
  <h1>{{ msg }}</h1>
  <button @click="increment">count is: {{ state.count }}</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
</template>

<script>
import { reactive, computed } from 'vue'

export default {
  props: {
    msg: {
      type: String,
      default: ''
    }
  },

  setup () {
    const state = reactive({
      count: 0
    })

    function increment () {
      state.count++
    }

    return {
      state,
      increment
    }
  }
}
</script>
