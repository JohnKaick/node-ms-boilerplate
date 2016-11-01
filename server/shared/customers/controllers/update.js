const db = require('./../../../database')
const errHandler = require('./../../../engines/error-handler')
const sidCache = require('./../../../engines/sid-cache')

module.exports = function (request, reply) {
  sidCache.translate(request.params.sid, 'Customers').then((id) => {
    return db.Customers.forge({ id: id }).save({
      'first_name': request.payload['first_name'],
      'last_name': request.payload['last_name'],
      'address': request.payload['address'],
      'city': request.payload['city'],
      'state': request.payload['state'],
      'postal_code': request.payload['postal_code'],
      'updated_by': request.auth.credentials.sid,
      'updated_at': new Date()
    })
  }).then(() => reply({ success: true }))
    .catch(err => errHandler.resolve(request, reply, err))
}
