const { Client } = require("pg");
const postgres = require('postgres');
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID, URL } = process.env;
// const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

const client = new Client({

  connectionString:
  URL || "postgres://localhost:5432/coding_quiz_bot_be",
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,


});




module.exports = {
  client,
};
