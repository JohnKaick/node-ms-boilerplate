const db = require('./../../../database')
const errHandler = require('./../../../engines/error-handler')
const sidCache = require('./../../../engines/sid-cache')

module.exports = function (request, reply) {
  sidCache.translate(request.params.sid, 'Orders').then((id) => {
    return db.Orders.forge({ id: id }).save({
      deleted_by: request.auth.credentials.sid
    })
  }).then((order) => {
    return db.Orders.forge({ id: order.id }).destroy()
  }).then(() => reply({ success: true }))
    .catch(err => errHandler.resolve(request, reply, err))
}
