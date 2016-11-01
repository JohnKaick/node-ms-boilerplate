const db = require('./../../../database')
const errHandler = require('./../../../engines/error-handler')
const sidCache = require('./../../../engines/sid-cache')

module.exports = function (request, reply) {
  sidCache.translate(request.params.customer_sid, 'Customers').then((id) => {
    return db.Orders.query((qb) => {
      qb.where('customer_id', id)
    }).fetchAll()
  }).then(order => reply(order))
    .catch(err => errHandler.resolve(request, reply, err))
}
