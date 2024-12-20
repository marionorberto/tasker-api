import { Router, Request, Response } from 'express';
import userController from '../controllers/userController';
import taskController from '../controllers/taskController';
import TokenController from '../auth/TokenController';
import loginRequired from '../middlewares/loginRequired';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json('Welcome to TASKER-API');
});

router.get('/users/all', loginRequired.bind(loginRequired), userController.findAll)
.get('/user/:userId', loginRequired.bind(loginRequired), userController.findOne)
.post('/create/user', userController.create)
.put('/update/user/:userId', loginRequired.bind(loginRequired), userController.updateOne)
.delete('/delete/user/:userId', loginRequired.bind(loginRequired), userController.deleteOne);

router.get('/tasks/all', loginRequired.bind(loginRequired), taskController.findAll)
.get('/task/:taskId', loginRequired.bind(loginRequired),  taskController.findOne)
.post('/create/task', loginRequired.bind(loginRequired), taskController.create)
.put('/update/task/:taskId', loginRequired.bind(loginRequired), taskController.updateOne)
.delete('/delete/task/:taskId', loginRequired.bind(loginRequired), taskController.deleteOne)
.get('/tasks/mytasks/', loginRequired.bind(loginRequired), taskController.getUserTasks)
.get('/tasks/task/done', loginRequired.bind(loginRequired), taskController.getDoneTasks)
.get('/tasks/task/edited', loginRequired.bind(loginRequired), taskController.getEditedTasks)
.get('/tasks/task/pending', loginRequired.bind(loginRequired), taskController.getPendingTasks)
.get('/tasks/task/:taskId/update-to-pending', loginRequired.bind(loginRequired), taskController.updateToPending)
.get('/tasks/task/:taskId/update-to-done', loginRequired.bind(loginRequired), taskController.updateToDone)
.get('/tasks/task/:taskId/update-to-edited', loginRequired.bind(loginRequired), taskController.updateToEdited)
.get('/tasks/task/:taskId/update-to-arquived', loginRequired.bind(loginRequired), taskController.updateToArquived)
.put('/check/task/:taskId', loginRequired.bind(loginRequired), taskController.checkTask)
.patch('/uncheck/task/:taskId', loginRequired.bind(loginRequired), taskController.uncheckTask);

router.post('/signin', TokenController.signIn.bind(TokenController));

export default router;