import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class TodosService {
  async removeTodo(todoId, userId) {
    const todoToRemove = await this.getTodoById(todoId);

    if (userId != todoToRemove.creatorId) {
      throw new Forbidden("You do not have permission to remove this Todo!!!");
    }

    await todoToRemove.remove();

    return "You have successfully removed the ToDo!!!";
  }

  async updateTodo(todoData, userId) {
    const originalTodo = await this.getTodoById(todoData.id);

    if (userId != originalTodo.creatorId) {
      throw new Forbidden("You can not update another person Todo!!");
    }

    originalTodo.completed = !originalTodo.completed;

    await originalTodo.save();

    return originalTodo;
  }

  async getTodoById(todoId) {
    const todo = await dbContext.Todos.findById(todoId);

    if (!todo) {
      throw new BadRequest(`Sorry, ToDo with ID: ${todoId} does not exist.`);
    }

    return todo;
  }
  async getAll() {
    const todos = await dbContext.Todos.find();

    return todos;
  }
  async createTodo(todoData) {
    const todo = await dbContext.Todos.create(todoData);

    return todo;
  }
}

export const todosService = new TodosService();
