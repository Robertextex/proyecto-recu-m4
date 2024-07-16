import { Router } from "express";
import usersControllers from "../controllers/users.controller.js";
import { authenticateToken } from '../middlewares/authenticate.middleware.js';


const router = Router();

//router.get("/", usersControllers.getUsers);

//router.post("/", usersControllers.createUser);

router.route("/")
        .get(usersControllers.getUsers)
        .post(usersControllers.createUser);

router.route("/:id").get(authenticateToken, usersControllers.getUser)
                    .put(authenticateToken, usersControllers.updateUser)
                    .delete(authenticateToken, usersControllers.deleteUser)
                    .patch(authenticateToken, usersControllers.activeInactive);

router.get('/:id/tasks', authenticateToken, usersControllers.getTasks);

/*
router.get("/", (req, res) => {
    res.send('Welcome to users');
});

router.post("/", (req, res) => {
    res.send('Create users'); 
});
*/

export default router;
