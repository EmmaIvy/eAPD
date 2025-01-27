const knex = require('./knex');

const getAllActiveRoles = (requestedRoles, { db = knex } = {}) => {
  const query = db('auth_roles')
    .select('id', 'name')
    .where({ isActive: true })
  if(requestedRoles) {
    return query.whereIn('name', requestedRoles);
  }
  return query;
};

module.exports = {
  getAllActiveRoles
};
