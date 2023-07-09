// const { Client } = require('pg');

// const connectionString = "postgres://ycvtbujc:mWnrVRQDmSxwuEvtgxLRFP7ZA1414O_r@lallah.db.elephantsql.com/ycvtbujc";
// const client = new Client({
//   connectionString: connectionString
// });

// (async () => {
//     try {
//       await client.connect();
//       console.log('Connected to PostgreSQL!');
//     } catch (err) {
//       console.error('Could not connect to PostgreSQL:', err);
//     }
//   })();

// module.exports = {
//   getClient: function() {
//     return client;
//   }
// };

const Sequelize = require('sequelize');

const sequelize = new Sequelize('ycvtbujc', 'ycvtbujc', 'mWnrVRQDmSxwuEvtgxLRFP7ZA1414O_r', {
  host: 'lallah.db.elephantsql.com',
  dialect: 'postgres',
define: {
  freezeTableName: true
}}
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL!');
  } catch (err) {
    console.error('Could not connect to PostgreSQL:', err);
  }
})();

module.exports = {
  getSequelize: function() {
    return sequelize;
  }
};
