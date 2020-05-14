import { createServer, start } from './core'

createServer({ logger: false }).then(server => {
  start(server)
})
