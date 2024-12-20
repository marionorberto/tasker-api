import { Request, Response } from 'express';
import { Task } from '../entities/task.entity';
import datasource from '../config/datasource';
import { User } from '../entities/user.entity';
import { StatusEnum } from '../entities/task.entity';
import { CustomRequest } from '../interfaces/interfaces';


class TasksController {
  constructor() {}

  async findAll(req: Request, res: Response) {
    try {

      const taskRepo = datasource.getRepository(Task);
      const allTasks = await taskRepo.find({
        order: {
          createdAt: 'DESC',
        }
      });
  
      res.json([
        {
          statusCode: 200,
          message: 'tasks fetched sucessfully',
          data: [
            {
              count: allTasks.length,
            },
              allTasks
          ],
          timestamp: Date.now()
        }
      ]);
    } catch(error) {
        console.log(`Error trying to fetch tasks | ${error.message}`)
    }
  } 

    async create(req: CustomRequest, res: Response) {
      try {
        const { id } = req.user;
        const { title, content } = req.body; 
        const taskRepo = datasource.getRepository(Task);
        const userRepo = datasource.getRepository(User);

        const userData = await userRepo.findOneBy({
            id,
        });

        if (!userData) 
          throw new Error('User Not Found');

        const taskToSave = taskRepo.create({ title, content, user: userData });

        const taskSaved = await taskRepo.save(taskToSave);
  
        res.json([
          {
            statusCode: 200,
            message: 'task created sucessfully',
            data: taskSaved,
            timestamp: Date.now()
          }
      ]);
    } catch(error) {
        console.log(`error trying to create task | ${error.message}`);

        res.json(
         {
          statusCode: 400,
          message: 'failed to create task',
          error: error.message,
          timestamp: Date.now()
        }
        ).status(400);
    }
  }
  
  async findOne(req: Request, res: Response) {
    try {
        const { taskId } = req.params; 

        if(!taskId)
          throw new Error('TaskId Not Provided');

        const taskRepo = datasource.getRepository(Task);

        const task = await taskRepo.findOneBy({
            id: taskId,
        });

        if (!task) 
          throw new Error('Task Not Found');

        res.json([ 
          {
            statusCode: 200,
            message: 'task fecthed sucessfully',
            data: task,
            timestamp: Date.now()
        }
      ]).status(200);
    } catch(error) {
        console.log(`error trying to find task | ${error.message}`);

        res.json(
         {
          statusCode: 400,
          message: 'failed to fetch task',
          error: error.message,
          timestamp: Date.now()
        }
        ).status(400);
    }
  }

  async updateOne(req: CustomRequest, res: Response) {
     try {
        const { taskId } = req.params; 
        const { title, content } = req.body;

        if (!taskId)
          throw new Error('Id Not Provide');
        
        if (!title && !content)
          throw new Error('title and content Not Provide');

        if (!title)
          throw new Error('title Not Provide');
       
        const taskRepo = datasource.getRepository(Task);

        const task = await taskRepo.findOneBy({
            id: taskId,
        });

        if (!task) 
          throw new Error('Task Not Found');

          await taskRepo.update(task.id, { 
            title,
            content,
            done: false,
            status: StatusEnum.edited
          });
        
        const taskUpdated = await taskRepo.findOneBy({
            id: taskId,
        });
        
        res.json([ 
          {
            statusCode: 200,
            message: 'task updated sucessfully',
            data: taskUpdated,
            timestamp: Date.now()
        }
      ]);
    } catch(error) {
        console.log(`error trying to update task | ${error.message}`);

        res.json(
         {
          statusCode: 400,
          message: 'failed to update task',
          error: error.message,
          timestamp: Date.now()
        }
        ).status(400);
    }
  }

  async deleteOne(req: Request, res: Response) {
      try {
        const { taskId } = req.params; 

        if (!taskId)
          throw new Error('Id Not Provided');

        const taskRepo = datasource.getRepository(Task);

        const task = await taskRepo.findOneBy({
            id: taskId,
        });

        if (!task) 
          throw new Error('Task Not Found');

        await taskRepo.remove(task);
        
        res.json([ 
          {
            statusCode: 200,
            message: 'task deleted sucessfully',
            timestamp: Date.now()
          }
      ]);
    } catch(error) {
        console.log(`error trying to delete task | ${error.message}`);

        res.json(
         {
          statusCode: 400,
          message: 'failed to delete task',
          error: error.message,
          timestamp: Date.now()
        }
        ).status(400);
    }
  }
  async getUserTasks(req: CustomRequest, res: Response) {
    try {
      const { id } = req.user;
      const userRepo = datasource.getRepository(User);

      const userTasks = await userRepo.find({
        where: {
          id,
        },
        relations: {
          tasks: true,
        },
        order: {
          tasks: {
            createdAt: 'DESC'
          }
        }
      });

      let count = 0;

      userTasks.forEach((val) => {
        count = val.tasks.length;
      })

      res.json([ 
          {
            statusCode: 200,
            message: 'tasks fetched  sucessfully',
            data: [
              {
                count,
              },
              userTasks,
            ],
            timestamp: Date.now()
          }
      ]);
    } catch(error) {
        console.log(`error trying to get user's tasks | ${error.message}`);

        res.json(
         {
          statusCode: 400,
          message: 'failed to get tasks',
          error: error.message,
          timestamp: Date.now()
        }
        ).status(400);
    }
  }

  async getDoneTasks(req: CustomRequest, res: Response) {
    try {
      const { id } = req.user;
      const userRepo = datasource.getRepository(User);
      console.log(id);

      const userExists = await userRepo.findOneBy({
        id,
      });

      if (!userExists) 
        throw new Error('User Not Found');

      const userTasks = await userRepo.find({
        where: {
          id,
          tasks: {
            done: true,
          }
        },
        relations: {
          tasks: true,
        }
      });

      let count = 0;

      userTasks.forEach((val, index) => {
        count = val.tasks.length;
      })

      res.json([ 
          {
            statusCode: 200,
            message: 'done tasks fetched sucessfully',
            data: [
              {
                count,
              },
              userTasks,
            ],
            timestamp: Date.now()
          }
      ]);    
    } catch(error) {
        console.log(`error trying to find done task | ${error.message}`);

        res.json(
         {
          statusCode: 400,
          message: 'failed to fetch done tasks',
          error: error.message,
          timestamp: Date.now()
        }
        ).status(400);
    }
  }

  async getEditedTasks(req: CustomRequest, res: Response) {
    try {
      const { id } = req.user;
      const userRepo = datasource.getRepository(User);

      const userExists = await userRepo.findOneBy({
        id,
      });

      if (!userExists) 
        throw new Error('User Not Found');

      const userTasks = await userRepo.find({
        where: {
          id,
          tasks: {
            status: StatusEnum.edited,
          }
        },
        relations: {
          tasks: true,
        }
      });

      let count = 0;

      userTasks.forEach((val) => {
        count = val.tasks.length;
      })

      res.json([ 
          {
            statusCode: 200,
            message: 'edited tasks fetched sucessfully',
            data: [
              {
                count,
              },
              userTasks,
            ],
            timestamp: Date.now()
          }
      ]);    
    } catch(error) {
        console.log(`error trying to find edited tasks | ${error.message}`);

        res.json(
         {
          statusCode: 400,
          message: 'failed to fetch edited tasks',
          error: error.message,
          timestamp: Date.now()
        }
        ).status(400);
    }
  }
 
  async getArquivedTasks(req: CustomRequest, res: Response) {
    try {
      const { id } = req.user;
      const userRepo = datasource.getRepository(User);

      const userExists = await userRepo.findOneBy({
        id,
      });

      if (!userExists) 
        throw new Error('User Not Found');

      const userTasks = await userRepo.find({
        where: {
          id,
          tasks: {
            status: StatusEnum.arquived,
          }
        },
        relations: {
          tasks: true,
        }
      });

      let count = 0;

      userTasks.forEach((val) => {
        count = val.tasks.length;
      })

      res.json([ 
          {
            statusCode: 200,
            message: 'arquived tasks fetched sucessfully',
            data: [
              {
                count,
              },
              userTasks,
            ],
            timestamp: Date.now()
          }
      ]);    
    } catch(error) {
        console.log(`error trying to find arquived tasks | ${error.message}`);

        res.json(
         {
          statusCode: 400,
          message: 'failed to fetch arquived tasks',
          error: error.message,
          timestamp: Date.now()
        }
        ).status(400);
    }
  }

  async getPendingTasks(req: CustomRequest, res: Response) {
    try {
      const { id } = req.user;
      const userRepo = datasource.getRepository(User);

      const userExists = await userRepo.findOneBy({
        id,
      });

      if (!userExists) 
        throw new Error('User Not Found');

      const userTasks = await userRepo.find({
        where: {
          id,
          tasks: {
            status: StatusEnum.pending,
          }
        },
        relations: {
          tasks: true,
        }
      });

      let count = 0;

      userTasks.forEach((val) => {
        count = val.tasks.length;
      })

      res.json([ 
          {
            statusCode: 200,
            message: 'pending tasks fetched sucessfully',
            data: [
              {
                count,
              },
              userTasks,
            ],
            timestamp: Date.now()
          }
      ]);    
    } catch(error) {
        console.log(`error trying to find arquived tasks | ${error.message}`);

        res.json(
         {
          statusCode: 400,
          message: 'failed to fetch arquived tasks',
          error: error.message,
          timestamp: Date.now()
        }
        ).status(400);
    }
  }

  async updateToPending(req: Request, res: Response){
      try {
        const { taskId } = req.params; 

        if (!taskId)
          throw new Error('Id Not Provide');
                  
        const taskRepo = datasource.getRepository(Task);

        const task = await taskRepo.findOneBy({
            id: taskId,
        });

        if (!task) 
          throw new Error('Task Not Found');

        task.status = StatusEnum.pending;

          await taskRepo.update(task.id, { status: task.status } );
        
        const taskUpdated = await taskRepo.findOneBy({
            id: taskId,
        });
        
        res.json([ 
          {
            statusCode: 200,
            message: 'task status updated to pending sucessfully',
            data: taskUpdated,
            timestamp: Date.now()
        }
      ]);
    } catch(error) {
        console.log(`error trying to update task | ${error.message}`);

        res.json(
         {
          statusCode: 400,
          message: 'failed to update task',
          error: error.message,
          timestamp: Date.now()
        }
        ).status(400);
    }
  }
  async updateToEdited(req: Request, res: Response){
     try {
        const { taskId } = req.params; 

        if (!taskId)
          throw new Error('Id Not Provide');
                  
        const taskRepo = datasource.getRepository(Task);

        const task = await taskRepo.findOneBy({
            id: taskId,
        });

        if (!task) 
          throw new Error('Task Not Found');

        task.status = StatusEnum.edited;

          await taskRepo.update(task.id, { status: task.status } );
        
        const taskUpdated = await taskRepo.findOneBy({
            id: taskId,
        });
        
        res.json([ 
          {
            statusCode: 200,
            message: 'task status edited to pending sucessfully',
            data: taskUpdated,
            timestamp: Date.now()
        }
      ]);
    } catch(error) {
        console.log(`error trying to update task | ${error.message}`);

        res.json(
         {
          statusCode: 400,
          message: 'failed to update task',
          error: error.message,
          timestamp: Date.now()
        }
        ).status(400);
    }
  }
  async updateToDone(req: Request, res: Response){
     try {
        const { taskId } = req.params; 

        if (!taskId)
          throw new Error('Id Not Provide');
                  
        const taskRepo = datasource.getRepository(Task);

        const task = await taskRepo.findOneBy({
            id: taskId,
        });

        if (!task) 
          throw new Error('Task Not Found');

        task.status = StatusEnum.done;

          await taskRepo.update(task.id, { status: task.status } );
        
        const taskUpdated = await taskRepo.findOneBy({
            id: taskId,
        });
        
        res.json([ 
          {
            statusCode: 200,
            message: 'task status updated to done sucessfully',
            data: taskUpdated,
            timestamp: Date.now()
        }
      ]);
    } catch(error) {
        console.log(`error trying to update task | ${error.message}`);

        res.json(
         {
          statusCode: 400,
          message: 'failed to update task',
          error: error.message,
          timestamp: Date.now()
        }
        ).status(400);
    }
  }
  async updateToArquived(req: Request, res: Response){
     try {
        const { taskId } = req.params; 

        if (!taskId)
          throw new Error('Id Not Provide');
                  
        const taskRepo = datasource.getRepository(Task);

        const task = await taskRepo.findOneBy({
            id: taskId,
        });

        if (!task) 
          throw new Error('Task Not Found');

        task.status = StatusEnum.arquived;

          await taskRepo.update(task.id, { status: task.status } );
        
        const taskUpdated = await taskRepo.findOneBy({
            id: taskId,
        });
        
        res.json([ 
          {
            statusCode: 200,
            message: 'task status updated to arquived sucessfully',
            data: taskUpdated,
            timestamp: Date.now()
        }
      ]);
    } catch(error) {
        console.log(`error trying to update task | ${error.message}`);

        res.json(
         {
          statusCode: 400,
          message: 'failed to update task',
          error: error.message,
          timestamp: Date.now()
        }
        ).status(400);
    }
  }

  async checkTask(req: CustomRequest, res: Response) {
    try {

      const { taskId } = req.params; 
      const { done } = req.body;

      console.log(taskId, done);
      if (!taskId)
        throw new Error('Id Not Provide');
        
      const taskRepo = datasource.getRepository(Task);

      const task = await taskRepo.findOneBy({
          id: taskId,
      });

      if (!task) 
        throw new Error('Task Not Found');
        
      if(done) {
        await taskRepo.update(task.id, { done, status: StatusEnum.done } );
      } else {
        await taskRepo.update(task.id, { done, status: StatusEnum.pending } );
      }           
        
      const taskUpdated = await taskRepo.findOneBy({
        id: taskId,
      });
        
      res.json([ 
        {
          statusCode: 200,
          message: 'task updated sucessfully',
          data: taskUpdated,
          timestamp: Date.now()
      }
    ]);
  } catch(error) {
      console.log(`error trying to update task | ${error.message}`);

      res.json(
        {
          statusCode: 400,
          message: 'failed to update task',
          error: error.message,
          timestamp: Date.now()
       }
      ).status(400);
    }
  }

  async uncheckTask(req: CustomRequest, res: Response) {
    try {
      const { taskId } = req.params; 

      if (!taskId)
        throw new Error('Id Not Provide');
        
      const taskRepo = datasource.getRepository(Task);

      const task = await taskRepo.findOneBy({
          id: taskId,
      });

      if (!task) 
        throw new Error('Task Not Found');
            
        await taskRepo.update(task.id, { done: false } );
        
      const taskUpdated = await taskRepo.findOneBy({
        id: taskId,
      });
        
      res.json([ 
        {
          statusCode: 200,
          message: 'task updated sucessfully',
          data: taskUpdated,
          timestamp: Date.now()
      }
    ]);
  } catch(error) {
      console.log(`error trying to update task | ${error.message}`);

      res.json(
        {
          statusCode: 400,
          message: 'failed to update task',
          error: error.message,
          timestamp: Date.now()
       }
      ).status(400);
    }
  }
}

export default new TasksController();