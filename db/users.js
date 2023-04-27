const { client } = require("./client");

async function createUser({
  username,
  correct_answers,
  incorrect_answers,
  life_time_score,
}) {
  try {
    const {
      rows: [user],
    } = await client.query(`
    INSERT INTO users(username, correct_answers, incorrect_answers, life_time_score)
    VALUES($1, $2, $3, $4)
    ON CONFLICT(username) DO NOTHING
    RETURNING *;
    `,[username, correct_answers, incorrect_answers, life_time_score])
    return user;
  } catch (error) {
    throw error
  }
}
async function updateUser(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [user],
    } = await client.query(
      `UPDATE users
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
      `,
      Object.values(fields)
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function userExists(username) {
  try {
    const {
      rows
    } = await client.query(`
      SELECT *
      FROM users
      WHERE username = $1;
    `, [username]);

    return rows.length > 0;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM users
    WHERE username = $1;
    `,
      [username]
    );
    return user;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  createUser,
  updateUser,
  userExists,
  getUserByUsername
}
