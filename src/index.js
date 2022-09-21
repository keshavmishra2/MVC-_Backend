const express  = require("express");

const app = express();

app.use(express.json());

// user crud opertion
const userController = require("./controllers/User.controllers");
app.use("/users", userController);

//-------------------------tags crud ------------------------------------//
const tagController = require("./controllers/Tag.controller");
app.use("/tags", tagController);
//------------------------------- POST crud----------------------------------//

const postController = require("./controllers/Post.controller");
app.use("/posts", postController);
//-----------------------------comment crud-----------------------------------------//

const commentController = require("./controllers/Comment.controller");
app.use("/comments", commentController);

module.exports = app;