const express = require("express");
const { userExists, createUser, getUserByUsername, updateUser } = require("../db/users");
const usersRouter = express.Router();

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");
  next();
});

usersRouter.post("/newuser", async (req, res, next)=>{
  const{username}=req.body;
  try {
      const newUser = await createUser({
        username,
        correct_answers: 0,
        incorrect_answers: 0,
        life_time_score: 0,
      });
      res.status(200).send(newUser);

  } catch (error) {
    next(error);
  }
});
usersRouter.get("/userExists/:username", async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await userExists(username);
    if (user) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.patch("/:username", async (req, res, next)=>{
  const {username}=req.params;
  const updateFields=req.body;
  try {
    const user= await getUserByUsername(username)
    const updateUser= await updateUser(user.id, updateFields);
    res.send(updateUser)
  } catch ({name, message, error}) {
    next({
      name: "UserDoesNotExist",
      message: `User ${username} not found`,
      Error: "User does not exist",
    });
  }
})

module.exports = usersRouter;
