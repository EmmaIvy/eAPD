const knex = require('./knex');

const generateMatches = async (
  email,
  name,
  state,
  certificationId,
  { db = knex } = {}
) =>{

  const existingMatches = await db('state_admin_certification_match')
    .select('user_id')
    .where('state_admin_certification_id', certificationId)

  const potentialMatches = await db('auth_affiliations')
    .select('auth_affiliations.user_id')
    .leftJoin('okta_users', 'auth_affiliations.user_id', 'okta_users.user_id')
    .leftJoin('auth_roles', 'auth_affiliations.role_id', 'auth_roles.id')
    .whereNotIn('auth_affiliations.user_id', existingMatches.map(match => match.user_id))
    .where('auth_affiliations.state_id', state)
    .andWhere(function() {
        this
          .where('okta_users.email', email)
          .orWhere('okta_users.displayName', name)
    })
    .andWhere(function(){
      this
        .where('auth_affiliations.status', 'requested')
        .orWhere('auth_roles.name', 'eAPD State Staff')
    })

  const newMatches = potentialMatches.map(match =>{
    return {
      user_id: match.user_id,
      state_admin_certification_id: certificationId,
      status: 'pending'

    }
  })
  if (newMatches.length) {
    await db('state_admin_certification_match').insert(newMatches)
  }
}

module.exports = {
  generateMatches
}