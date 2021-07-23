import { promises as fs } from 'fs'

const todoPath = './database/todos'
const usersPath = './database/users'

export function insertTodo(todo) {
  return fs.writeFile(`${todoPath}/${todo.id}.json`, JSON.stringify(todo), 'utf8')
}

export function insertNewUser(newUser) {
  return fs.writeFile(`${usersPath}/${newUser.email}.json`, JSON.stringify(newUser), 'utf8')
}

export function userDir() {
  return fs.readdir(usersPath)
    .then(users => {
      const usersPromises = users.map(u => JSON.parse(u))
      console.log(usersPromises)
      return Promise.all(usersPromises)
    })
}


export const loadTodos = () =>
  fs.readdir(todoPath)
    .then(files => {
      console.log({ files })
      const filePromises = files
        .map(f => fs.readFile(`${todoPath}/${f}`, 'utf8'))
        .map(t => JSON.parse(t))
      return Promise.all(filePromises)
    })


export function removeTodo() {
  return fs.unlink(`${todoPath}/${howDynamic}.json`)
}