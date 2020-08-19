<template>
  <h1>Snake!</h1>

  <button
    v-if="!isPlaying"
    @click="onStartGame"
    :style="{
      marginBottom: '20px'
    }"
  >
    Play
  </button>
  
  <button
    v-else
    @click="onStopGame"
    :style="{
      marginBottom: '20px'
    }"
  >
    Stop
  </button>


  <v-grid />
</template>

<script>
import { reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { isPosition, isSnake } from './utils/index'

// Components
import VGrid from './components/Grid.vue'

const TICK_RATE = 100
const GRID_SIZE = 35
const DIRECTIONS = {
  UP: 'UP',
  BOTTOM: 'BOTTOM',
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
}
const DIRECTION_TICKS = {
  UP: (x, y) => ({ x, y: y - 1 }),
  BOTTOM: (x, y) => ({ x, y: y + 1 }),
  RIGHT: (x, y) => ({ x: x + 1, y }),
  LEFT: (x, y) => ({ x: x - 1, y }),
}
const KEY_CODES_MAPPER = {
  38: 'UP',
  87: 'UP',

  39: 'RIGHT',
  68: 'RIGHT',

  37: 'LEFT',
  65: 'LEFT',

  40: 'BOTTOM',
  83: 'BOTTOM',
}

export default {
  name: 'App',

  components: {
    VGrid
  },

  setup () {
    const store = useStore()
    const isPlaying = computed(() => store.state.isPlaying)
    const currentDirection = computed(() => store.state.playground.direction)
    const snack = computed(() => store.state.snack)
    const snake = computed(() => store.state.snake)
    const snakeHead = computed(() => store.state.snake.coordinates[0])
    const snakeTail = computed(() => store.state.snake.coordinates.slice(1))

    // Interval variable
    let interval = null

    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }

    function getRandomCoordinate() {
      return {
        y: getRandomNumber(1, GRID_SIZE - 1),
        x: getRandomNumber(1, GRID_SIZE - 1)
      }
    }

    function getSnakeWithoutStub() {
      return snake.value.coordinates.slice(0, snake.value.coordinates.length - 1)
    }

    function generateGrid() {
      const grid = []

      for (let i = 0; i < GRID_SIZE; i++) {
        grid.push(i)
      }

      store.commit('SET_GRID', grid)
    }

    function generateSnake() {
      const snake = {
        coordinates: [getRandomCoordinate()]
      }

      store.commit('SET_SNAKE', snake)
    }

    function generateSnack() {
      const snack = {
        coordinate: getRandomCoordinate()
      }

      store.commit('SET_SNACK', snack)
    }

    function generateInitials() {
      resetGame()
      generateGrid()
      generateSnack()
      generateSnake()
    }

    function resetGame() {
      store.commit('RESET_GAME')
    }

    function isSnakeOutside() {
      return (
        snakeHead.value.x >= GRID_SIZE ||
        snakeHead.value.y >= GRID_SIZE ||
        snakeHead.value.x <= 0 ||
        snakeHead.value.y <= 0
      )
    }

    function isSnakeClumy() {
      return isSnake(
        snakeTail.value,
        snakeHead.value.x,
        snakeHead.value.y
      )
    }
    
    function isSnakeEating() {
      return isPosition(
        snakeHead.value.x,
        snakeHead.value.y,
        snack.value.coordinate.x,
        snack.value.coordinate.y
      )
    }

    function onChangeDirection(e) {
      const newDirection = KEY_CODES_MAPPER[e.keyCode]
      if (!newDirection || newDirection === currentDirection.value) { return }
      
      store.commit('SNAKE_CHANGE_DIRECTION', newDirection)
    }

    function onTick() {
      if (isSnakeOutside() || isSnakeClumy()) {
        store.commit('GAME_OVER')
        onStopGame()
      } else {
        store.commit('SNAKE_MOVE', {
          isSnakeEating: isSnakeEating(),
          directionTicks: DIRECTION_TICKS,
          snakeHead: snakeHead.value,
          snakeWithoutStub: getSnakeWithoutStub(),
          snackRandomCoordinate: getRandomCoordinate()
        })
      }
    }

    function onStartGame() {
      onStopGame()
      generateInitials()
      store.commit('IS_PLAYING', true)

      interval = setInterval(() => {
        onTick()
      }, TICK_RATE)
    }

    function onStopGame() {
      clearInterval(interval)
      store.commit('IS_PLAYING', false)
    }

    onMounted(() => {
      window.addEventListener('keydown', onChangeDirection)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', onChangeDirection)
      clearInterval(interval)
    })

    return {
      isPlaying,
      onStartGame,
      onStopGame
    }
  }
}
</script>
