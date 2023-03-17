const router = require("express").Router()
const Todo = require("../models/Todo");
//routes will be here
//homepage
router.get("/",async(req,res) => {
    const allTodo = await Todo.find();
    res.render("index",{todo:allTodo});
    //res.render will loop up views folder already
})



module.exports = router;