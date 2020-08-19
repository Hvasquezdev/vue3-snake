<template>
  <v-grid-row
    v-for="(row, key) in grid"
    :key="key"
    :y-coord="row"
  />
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import VGridRow from './GridRow.vue'

export default {
  name: 'Grid',

  components: {
    VGridRow
  },

  setup() {
    const store = useStore()
    const grid = computed(() => store.state.grid)

    return {
      grid
    }
  }
}
</script>
