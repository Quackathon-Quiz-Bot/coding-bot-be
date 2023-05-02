const { Client } = require("pg");
const postgres = require('postgres');
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID, URL } = process.env;


const client = new Client({
  connectionString: `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require&options=project=${ENDPOINT_ID}` || "postgres://localhost:5432/coding_quiz_bot_be?sslmode=require",
  ssl:
    process.env.NODE_ENV === "production"
      ? {
          rejectUnauthorized: false,

        }
      : undefined,
});




module.exports = {
  client,
};
