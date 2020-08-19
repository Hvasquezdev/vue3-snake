import { createStore, createLogger } from 'vuex'

const store = createStore({
  state() {
    return {
      playground: {
        direction: 'RIGHT',
        isGameOver: false
      },
      grid: [],
      snake: {},
      snack: {},
      isPlaying: false
    }
  },

  mutations: {
    SET_GRID(state, grid) {
      state.grid = grid
    },
    SET_SNAKE(state, snake) {
      state.snake = snake
    },
    SET_SNACK(state, snack) {
      state.snack = snack
    },
    RESET_GAME(state) {
      state.grid = []
      state.snack = {}
      state.snake = {}
      state.playground.isGameOver = false
    },
    IS_PLAYING(state, val) {
      state.isPlaying = val
    },
    SNAKE_CHANGE_DIRECTION(state, direction) {
      state.playground.direction = direction
    },
    SNAKE_MOVE(state, payload) {
      const isSnakeEating = payload.isSnakeEating

      const snakeHead = payload.directionTicks[state.playground.direction](
        payload.snakeHead.x,
        payload.snakeHead.y
      )

      const snakeTail = isSnakeEating ? state.snake.coordinates : payload.snakeWithoutStub
      const snackCoordinate = isSnakeEating ? payload.snackRandomCoordinate : state.snack.coordinate

      state.snake.coordinates = [
        snakeHead,
        ...snakeTail
      ]
      state.snack.coordinate = snackCoordinate
    },
    GAME_OVER(state) {
      state.playground.isGameOver = true
    }
  },

  plugins: [createLogger]
})

export default store
