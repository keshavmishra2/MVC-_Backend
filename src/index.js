const express  = require("express");

const mongoose  = require("mongoose");

const app = express();

app.use(express.json());
// connect to database

const connect  = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/usersCollection");
}

// build the schema & model
// userSchama
const userSchema = new mongoose.Schema({
    first_name : { type : String, required : true },
    last_name : { type : String, required : false},
    email : {type : String, required: true},
    gender : { type : String, required : false, default : "Male"},
    age:{type: Number, required : true}
},
{
    versionKey : false,
    timestamps : true,
}
);

const User = mongoose.model("user", userSchema);

// build the tagSchema & Model

const tagSchema = new mongoose.Schema({
    name : {type : String, required : true},
},{
    versionKey : false,
    timestamps : true,
}
);

const Tag = mongoose.model("tag", tagSchema); //tag =>tags

//build the Post schema and Model

const postSchema = new mongoose.Schema({
   title : {type : String, required : true},
   content : {type : String, required : true},
   user_id : {
           type :mongoose.Schema.Types.ObjectId,
           ref : "user",
           required : true,
   },
   tag_ids : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "tag",
    required : true,
   }]

},
{
    versionKey : false,
    timestamps : true,
}
);

const Post = mongoose.model("post", postSchema);


// build the comment schema

const CommentSchema = new mongoose.Schema({
    reply : {type : String, required : true},
    post_id : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "post",
        required : true,
    }
},{
    versionKey : false,
    timestamps : true, 
})


const Comment  = mongoose.model("comment", CommentSchema); //Comment => comments

// ------------------CRUD Operation ------------------------------------//
// ----------------REST API CRUD -----------------------------------//
// post/users => create a user
// get/users => get all user
// get/users/:id =>get a single user
// patch/users/:id =>update  a single user
// delete/users/:id => delete a single user

// user crud opertion
app.post("/users", async(req, res) => {
    try{
      const user = await User.create(req.body);
      //console.log("user", user);
       return res.status(201).send(user);
    }catch(err){
        console.log(err.message);
        return res.status(500).json({error : err.message})
    }
})


app.get("/users", async (req, res) => {
    try{
        const users = await User.find().lean().exec();
         return res.send(users);
    }catch(err){
       
    }
})

app.get("/users/:id", async(req, res) =>{
    try{
const user = await User.findById(req.params.id).lean().exec();
return res.status(200).send(user);
    }catch(err){
        return res.status(500).send(err.message);
    }
})



app.patch("/users/:id", async (req, res) =>{
    try{
       const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
       }).lean().exec();
       return res.status(201).send(user);   
     }
    catch(err){
            return res.status(500).send(err.message);
    }
})


app.delete("/users/:id", async(req, res) => {
    try{
      const user  = await User.findByIdAndDelete(req.params.id).lean().exec();
      return res.status(200).send(user);
    }
    catch(err){
         return res.status(500).send(err.message);
    }
})

//-------------------------tags crud ------------------------------------//
app.post("/tags", async(req, res) => {
    try{
    const tag =  await Tag.create(req.body);
    return res.status(200).send(tag);
    }catch(err){
        return res.status(500).send(err.message);
    }
})


app.get("/tags", async(req, res) => {
    try{
      const tags  =await Tag.find().lean().exec();
      return res.status(200).send(tags);
    }catch(err){
        return res.status(500).send(err.message);
    }
})


app.get("/tags/:id", async(req, res) => {
    try{
      const tags  = await Tag.findById(req.params.id).lean().exec();
      return res.status(200).send(tags);
    }catch(err){
        return res.status(500).send(err.message);
    }
})

app.patch("/tags/:id", async(req, res) => {
    try{
        const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, 
            {new : true})
        .lean()
        .exec();
        return res.status(200).send(tag);
    }catch(err){
        return res.status(500).send(err.message);
    }
})

app.delete("/tags/:id", async(req, res) => {
    try{
        const tag = await Tag.findByIdAndDelete(req.params.id)
        .lean()
        .exec();
        return res.status(200).send(tag);
    }catch(err){
        return res.status(500).send(err.message);
    }
})
//------------------------------- POST crud----------------------------------//

app.post("/posts", async (req, res) => {
    try{
      const post  = await Post.create(req.body);
        return res.status(200).send(post);
    }catch (err){
        return res.status(500).send(err.message);
    }
})


app.get("/posts", async(req, res) => {
    try{
     const post = await Post.find()
     .populate("user_id")
     .populate("tag_ids")
     .lean()
     .exec();
     return res.status(200).send(post);
    }catch(err){
        return res.status(500).send(err.message)
    }
})

app.get("/posts/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id)
        .populate("user_id")
        .populate("tag_ids")
        .lean()
        .exec();
        return res.status(200).send(post);
       }catch(err){
           return res.status(500).send(err.message)
       }
})


app.patch("posts/:id", async(req, res) => {
    try{
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, 
            {new : true})
        .lean()
        .exec();
        return res.status(200).send(post);
    }catch(err){
        return res.status(500).send(err.message);
    }
})

app.delete("/posts/:id", async(req, res) => {
    try{
        const post = await Tag.findByIdAndDelete(req.params.id)
        .lean()
        .exec();
        return res.status(200).send(post);
    }catch(err){
        return res.status(500).send(err.message);
    }
})

//-----------------------------comment crud-----------------------------------------//

app.post("/comments", async (req, res) => {
    try{
      const comment  = await Comment.create(req.body);
        return res.status(200).send(comment);
    }catch (err){
        return res.status(500).send(err.message);
    }
})


app.get("/comments", async(req, res) => {
    try{
     const comment = await Comment.find()
     .populate( {path : "post_id", select : {title: 1, content : 1}})
     .lean()
     .exec();
     return res.status(200).send(comment);
    }catch(err){
        return res.status(500).send(err.message)
    }
})

app.get("/comments/:id", async (req, res) => {
    try{
        const comment = await Comment.findById(req.params.id)
        .populate( {path : "post_id", select : {title: 1, content : 1}})
        .lean()
        .exec();
        return res.status(200).send(post);
       }catch(err){
           return res.status(500).send(err.message)
       }
})


app.patch("comments/:id", async(req, res) => {
    try{
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, 
            {new : true})
        .lean()
        .exec();
        return res.status(200).send(comment);
    }catch(err){
        return res.status(500).send(err.message);
    }
})

app.delete("/comments/:id", async(req, res) => {
    try{
        const comment = await Comment.findByIdAndDelete(req.params.id)
        .lean()
        .exec();
        return res.status(200).send(comment);
    }catch(err){
        return res.status(500).send(err.message);
    }
})






app.listen(2345, async ()=> {
    try{
        await connect();
    console.log("listening on port 2345");
    }
    catch(err){
        console.log(err.message);
    }
})