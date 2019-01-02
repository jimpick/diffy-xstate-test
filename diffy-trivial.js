import diffy from 'diffy'
import trim from 'diffy/trim'

const d = diffy({fullscreen: true})
d.render(
  () => trim(`
    Hello user. This time is:
      ${new Date()}
    That is all for now
  `)
)

setInterval(() => d.render(), 1000)
