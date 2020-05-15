export const plugin = function (fastify, opts, next) {
  fastify.decorate('someSupport', () => 'hugs')
  next()
}
