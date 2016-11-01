const db = require('./../../../database')
const errHandler = require('./../../../engines/error-handler')
const sidCache = require('./../../../engines/sid-cache')

module.exports = function (request, reply) {
  sidCache.translate(request.params.sid, 'Orders').then((id) => {
    return db.Orders.forge({ id: id }).save({
      'order_date': request.payload['order_date'],
      'shippedDate': request.payload['shippedDate'],
      'ship_address': request.payload['ship_address'],
      'ship_city': request.payload['ship_city'],
      'ship_state': request.payload['ship_state'],
      'ship_postal_code': request.payload['ship_postal_code'],
      'updated_by': request.auth.credentials.sid,
      'updated_at': new Date()
    })
  }).then(() => reply({ success: true }))
    .catch(err => errHandler.resolve(request, reply, err))
}
