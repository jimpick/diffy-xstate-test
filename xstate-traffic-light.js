import { Machine } from 'xstate'
import { interpret } from 'xstate/lib/interpreter'

import diffy from 'diffy'
import trim from 'diffy/trim'
import diffyInput from 'diffy/input'

import chalk from 'chalk'

let state
const lightMachine = Machine({
  id: 'light',
  initial: 'green',
  states: {
    green: {
      on: {
        TIMER: 'yellow',
      }
    },
    yellow: {
      on: {
        TIMER: 'red',
      }
    },
    red: {
      on: {
        TIMER: 'green',
      }
    }
  }
})

const d = diffy({fullscreen: true})

d.render(
  () => trim(`
    Color: ${state && chalk.keyword(state.value)(state.value)}
  `)
)


const service = interpret(lightMachine)
  .onTransition(nextState => {
    state = nextState
    d.render()
  })
service.start()

const input = diffyInput({showCursor: false})

// input.on('update', () => d.render())
input.on('keypress', (ch, key) => {
  switch (key.sequence) {
    case ' ':
      service.send('TIMER')
      break
    case 'q':
      process.exit(0)
      break
  }
})


