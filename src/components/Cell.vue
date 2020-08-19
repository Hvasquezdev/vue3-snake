<template>
  <div class="grid-cell" :class="classNames" />
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { isSnake, isSnack } from '../utils/index'

export default {
  props: {
    yCoord: {
      type: Number,
      required: true
    },
    xCoord: {
      type: Number,
      required: true
    },
    gridSize: {
      type: Number,
      required: true
    }
  },

  setup(props) {
    const store = useStore()
    const snake = computed(() => store.state.snake)
    const snack = computed(() => store.state.snack)
    const isGameOver = computed(() => store.state.playground.isGameOver)

    const classNames = computed(() => ({
      'grid-cell-snake': snake.value.coordinates
        ? isSnake(snake.value.coordinates, props.xCoord, props.yCoord)
        : false,
      'grid-cell-snack': snack.value.coordinate
        ? isSnack(props.xCoord, props.yCoord, snack.value)
        : false,
      'grid-cell-game-over': isGameOver.value
    }))

    return {
      classNames
    }
  }
}
</script>

<style>
.grid-cell {
  border-top: 1px solid #363636;
  width: 15px;
  height: 15px;
  position: relative;
}

.grid-cell:not(:first-child) {
  border-left: 1px solid #363636;
}

.grid-cell-border {
  background-color: #363636;
}

.grid-cell-snake {
  background-color: #41444b;
}

.grid-cell-snake.grid-cell-game-over {
  background-color: #ff7171;
}

.grid-cell-snack {
  background-color: #91d18b;
}
</style>