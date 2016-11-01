const db = require('./../../../database')
const errHandler = require('./../../../engines/error-handler')

module.exports = function (request, reply) {
  return db.Customers.query((qb) => {
    qb.orderBy('nome', 'ASC')
  }).fetchAll().then(customers => reply(customers))
    .catch(err => errHandler.resolve(request, reply, err))
}
