const db = require('./../../../database')
const errHandler = require('./../../../engines/error-handler')

module.exports = function (request, reply) {
  db.Customers.forge({
    'first_name': request.payload['first_name'],
    'last_name': request.payload['last_name'],
    'address': request.payload['address'],
    'city': request.payload['city'],
    'state': request.payload['state'],
    'postal_code': request.payload['postal_code'],
    'created_by': request.auth.credentials.sid,
    'updated_by': request.auth.credentials.sid
  }).save().then(customers => reply(customers))
    .catch(err => errHandler.resolve(request, reply, err))
}
