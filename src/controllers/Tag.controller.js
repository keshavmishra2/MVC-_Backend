const express  = require("express");

const Tag = require("../models/tag.modle");

const router = express.Router();

router.post("", async(req, res) => {
    try{
    const tag =  await Tag.create(req.body);
    return res.status(200).send(tag);
    }catch(err){
        return res.status(500).send(err.message);
    }
})


router.get("", async(req, res) => {
    try{
      const tags  =await Tag.find().lean().exec();
      return res.status(200).send(tags);
    }catch(err){
        return res.status(500).send(err.message);
    }
})


router.get("/:id", async(req, res) => {
    try{
      const tags  = await Tag.findById(req.params.id).lean().exec();
      return res.status(200).send(tags);
    }catch(err){
        return res.status(500).send(err.message);
    }
})

router.patch("/:id", async(req, res) => {
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

router.delete("/:id", async(req, res) => {
    try{
        const tag = await Tag.findByIdAndDelete(req.params.id)
        .lean()
        .exec();
        return res.status(200).send(tag);
    }catch(err){
        return res.status(500).send(err.message);
    }
})

module.exports = router;