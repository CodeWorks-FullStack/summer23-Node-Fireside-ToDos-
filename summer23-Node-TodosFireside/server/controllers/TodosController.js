import { Auth0Provider } from "@bcwdev/auth0provider";
import { todosService } from "../services/TodosService.js";
import BaseController from "../utils/BaseController.js";

export class TodosController extends BaseController {
  constructor() {
    super("api/todos");
    this.router
      .get("", this.getAll)
      .get("/:id", this.getTodoById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.createTodo)
      .put("/:id", this.updateTodo)
      .delete("/:id", this.removeTodo);
  }

  async getAll(req, res, next) {
    try {
      const todo = await todosService.getAll();
      return res.send(todo);
    } catch (error) {
      next(error);
    }
  }

  async getTodoById(req, res, next) {
    try {
      const todoId = req.params.id;

      const todo = await todosService.getTodoById(todoId);
      return res.send(todo);
    } catch (error) {
      next(error);
    }
  }

  async createTodo(req, res, next) {
    try {
      const todoData = req.body;

      todoData.creatorId = req.userInfo.id;

      const todo = await todosService.createTodo(todoData);
      return res.send(todo);
    } catch (error) {
      next(error);
    }
  }

  async updateTodo(req, res, next) {
    try {
      const todoData = req.body;
      todoData.id = req.params.id;

      const userId = req.userInfo.id;

      const editedTodo = await todosService.updateTodo(todoData, userId);

      return res.send(editedTodo);
    } catch (error) {
      next(error);
    }
  }

  async removeTodo(req, res, next) {
    try {
      const todoId = req.params.id;
      const userId = req.userInfo.id;

      return res.send(await todosService.removeTodo(todoId, userId));
    } catch (error) {
      next(error);
    }
  }
}
