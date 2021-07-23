import { promises as fs, writeFile } from 'fs'
import uuid from 'uuid'

const todoPath = '../database/todos'

export function loadTodos() {
  return fs.readdir(todoPath)
    .then(files => {
      const promiseFiles = files
        .map(f => fs.readFile(`${todoPath}/${f}`))
        .map(t => JSON.parse(t))
      return Promise.all(promiseFiles)
    }
}

export function createTodos() {
  const todo = { ...req.value, id: uuid() }
  writeFile(todo)
    .then(() => res.status(200).json({ status: 'ok' }))
    .catch(err => res.status(400).json({ status: 'error', message: err.message }))
}

const writeFile = (todo) => {
  fs.writeFile(`${todoPath}/${todo.id}.json`, json.stringify(todo), 'utf-8')
}