import { insertNewUser, insertTodo, loadTodos, removeTodo, userDir } from '../models/todo'
import uniqid from 'uniqid'
import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt'

export function createTodo(req, res) {

  const result = validationResult(req)
  if (!result.isEmpty()) {
    return res.status(400).json({ status: 'error', errors: result.array(), message: 'Multiple validation errors!' })
  }

  const todo = { ...req.body, id: uniqid() }

  insertTodo(todo)
    .then(() => {
      res.json({ status: 'ok' })
    })
    .catch((error) => res.status(400).json({ status: 'error', message: error.message }))
}

export function allTodos(req, res) {
  loadTodos()
    .then(todos => res.json({ status: 'ok', todos }))
    .catch((error) => res.status(400).json({ status: 'error', message: error.message }))
}

export function deleteTodos(req, res) {
  removeTodo()
    .then(() => res.json({ status: 'ok' }))
    .catch((error) => res.status(400).json({ status: 'error', message: error.message }))
}

export async function createNewUser(req, res) {

  const result = validationResult(req)
  if (!result.isEmpty()) {
    return res.status(400).json({ status: 'error', errors: result.array(), message: 'Multiple validation errors!' })//dont want confirmed pass value shown when error
  }

  const checkExistingUsers = userDir().then(users => users.find(user => user.email === req.body.email))
  console.log({ checkExistingUsers });//pending promise(needs await?)
  if (checkExistingUsers !== null) {
    return res.status(409).json({ status: 'error', message: 'User already exists' })
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10)
  const newUser = { email: req.body.email, password: hashedPassword }

  insertNewUser(newUser)
    .then(() => res.status(200).json({ status: 'ok' }))
    .catch((error) => res.status(400).json({ status: 'error', message: error.message }))

  console.log(newUser)


}