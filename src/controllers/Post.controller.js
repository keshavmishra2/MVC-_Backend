const express = require("express");
const Post = require("../models/post.model");
const router = express.Router();


router.post("", async (req, res) => {
    try{
      const post  = await Post.create(req.body);
        return res.status(200).send(post);
    }catch (err){
        return res.status(500).send(err.message);
    }
})


router.get("", async(req, res) => {
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

router.get("/:id", async (req, res) => {
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


router.patch("/:id", async(req, res) => {
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

router.delete("/:id", async(req, res) => {
    try{
        const post = await Tag.findByIdAndDelete(req.params.id)
        .lean()
        .exec();
        return res.status(200).send(post);
    }catch(err){
        return res.status(500).send(err.message);
    }
})

module.exports = router;