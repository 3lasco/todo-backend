import { createTodo, allTodos, deleteTodos, createNewUser } from '../controllers/todo'
import { userValidationRules, passwordValidation } from '../validations/todo'


export default function setRoutes(app) {
  app.post('/todo', userValidationRules(), createTodo)
  app.post('/todo/newUser', passwordValidation(), createNewUser)
  app.get('/todo', allTodos)
  app.delete('/todo', deleteTodos)
}
