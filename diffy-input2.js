import diffy from 'diffy'
import trim from 'diffy/trim'
import diffyInput from 'diffy/input'

const names = []

const input = diffyInput({
  showCursor: false,
  style: (start, cursor, end) => {
    return start + '[' + (cursor || ' ') + ']' + end
  }
})

const d = diffy({fullscreen: true})
d.render(
  () => trim(`
    Enter your name: ${input.line()}
    List of names:
      ${names.join('\n  ')}
  `)
)

input.on('update', () => d.render())
input.on('enter', line => names.push(line))


