import { Router } from "express";
import tasksController from "../controllers/tasks.controller.js";
import { authenticateToken } from "../middlewares/authenticate.middleware.js";

const router = Router();

//Para proteger cada ruta indivisualmente, se puede colcoar el authenticate antes del task controller

router.route('/')
        .get(tasksController.getTasks)
        .post(tasksController.createTask);

router.route('/:id').get(tasksController.getTask)
        .put(tasksController.updateTask)
        .delete(tasksController.deleteTask)
        .patch(tasksController.taskDone);

export default router;
