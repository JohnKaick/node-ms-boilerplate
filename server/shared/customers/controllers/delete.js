const db = require('./../../../database')
const errHandler = require('./../../../engines/error-handler')
const sidCache = require('./../../../engines/sid-cache')

module.exports = function (request, reply) {
  sidCache.translate(request.params.sid, 'Customers').then((id) => {
    return db.Customers.forge({ id: id }).save({
      deleted_by: request.auth.credentials.sid
    })
  }).then((customers) => {
    return db.Customers.forge({ id: customers.id }).destroy()
  }).then(() => reply({ success: true }))
    .catch(err => errHandler.resolve(request, reply, err))
}
