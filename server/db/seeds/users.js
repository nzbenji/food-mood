exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'jess', email: 'jess@hotmail.com', hash: '$argon2id$v=19$m=8,t=2,p=1$KcGPE0x6tHXN7t3CkzXgSw$ZOvCaVGpQpAl8pBllI8Z499Qb5m3L+TAMbVELlYCtt4'},
        {id: 2, username: 'sammy', email: 'sammy@hotmail.com', hash: '$argon2id$v=19$m=8,t=2,p=1$Tt6wjQZe+zSsOX+MoYLahA$IPg5tzPLUqyik+ucDO/GFBqfaOxnBcN1OAW3LoouvUk'}
      ])
    })
};
