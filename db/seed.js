const  {client}  = require("./client");
console.log(client, "this is client")


async function dropTables() {
  try {
    console.log("Starting to drop tables...");
    await client.connect();
    await client.query(`
      DROP TABLE IF EXISTS users;
    `);
    console.log("Finished dropping tables");
  } catch (error) {
    console.log("Error dropping tables");
    throw error;
  }
}

async function createTables(){
try {
  console.log("Starting to Create tables...");
    await client.query(`

    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      correct_answers INT NOT NULL DEFAULT (0),
      incorrect_answers INT NOT NULL DEFAULT (0),
      life_time_score INT NOT NULL DEFAULT (0)
    )`
    );
    console.log("Finished building tables");

} catch (error) {
  console.error("Error building tables");
    throw error;
}

}

async function buildingDB() {
  try {
    await dropTables();
    await createTables();
    console.log("Finished building database");
  } catch (error) {
    console.log("Error during building database");
    throw error;
  }
}


buildingDB()
  .catch(console.error);
