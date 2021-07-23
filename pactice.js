import { promises as fs } from 'fs'

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