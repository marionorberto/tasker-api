import { Router } from 'express';
import userController from '../controllers/userController';
import taskController from '../controllers/taskController';

const router = Router();

router.get('/users/all', userController.findAll)
.get('/user/:userId', userController.findOne)
.post('/create/user', userController.create)
.put('/update/user/:userId', userController.updateOne)
.delete('/delete/user/:userId', userController.deleteOne);

router.get('/tasks/all', taskController.findAll)
.get('/task/:taskId', taskController.findOne)
.post('/create/task', taskController.create)
.put('/update/task/:taskId', taskController.updateOne)
.delete('/delete/task/:taskId', taskController.deleteOne)
.get('/tasks/user/:userId', taskController.getUserTasks)
.get('/tasks/task/done/:userId', taskController.getDoneTasks)
.get('/tasks/task/edited/:userId', taskController.getEditedTasks)
.get('/tasks/task/arquived/:userId', taskController.getArquivedTasks)
.get('/tasks/task/:taskId/update-to-pending', taskController.updateToPending)
.get('/tasks/task/:taskId/update-to-done', taskController.updateToDone)
.get('/tasks/task/:taskId/update-to-edited', taskController.updateToEdited)
.get('/tasks/task/:taskId/update-to-arquived', taskController.updateToArquived)

export default router;