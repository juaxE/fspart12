const express = require('express');
const { Todo } = require('../mongo');
const { findById } = require('../mongo/models/Todo');
const { getAsync, setAsync} = require('../redis/index.js')
const router = express.Router();


/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
const currentAmount = await getAsync('added_todos')
let parsedAmount = parseInt(currentAmount)
  if(isNaN(parsedAmount)) {
    parsedAmount = 0
  }
parsedAmount += 1
await setAsync('added_todos', parsedAmount)
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  try {
  const todo= req.todo
  updateFields=req.body
  Object.keys(updateFields).forEach((field) => {
    if (field in todo) {
      todo[field] = updateFields[field]
    }
  }
  )
  const updatedTodo = await todo.save()
  res.json(updatedTodo)
} catch (error) {
  console.log(error)
  res.sendStatus(500)
}
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
