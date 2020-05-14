export function plugin (fastify, opts, done) {
  fastify.decorate('someSupport', () => 'hugs')
  done()
}
