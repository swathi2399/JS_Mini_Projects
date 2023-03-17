const router = require('express').Router();
const Todo = require("../models/Todo");
//routes
router.post('/add/todo',(req,res) => {
    const {todo} = req.body; // getting todo
    const newTodo = new Todo({todo}) // initialising the schema todo
    
    // save the new todo
    newTodo.save() // saving in database
    .then (() => {
        console.log("successfully saved")
        // check if stored in db in terminal or mongodb compass
        res.redirect("/")
    })
    .catch((err) => console.log(err))
});
router.get('/delete/todo/:_id', (req,res) => {
    const {_id} = req.params; // params is used to get an id
    Todo.deleteOne({_id})

    .then(() => {
        console.log("deleted successfully")
        res.redirect("/")
    })
    .catch((err) => console.log(err))

});

module.exports = router;