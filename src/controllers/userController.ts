import { Request, Response } from 'express';
import  datasource from '../config/datasource';
import { User } from '../entities/user.entity';

interface UserInterface {
  username: string;
  password: string;
}

class UserController {

  constructor() {}
  async findAll(req: Request, res: Response) {
    try {

      const userRepo = datasource.getRepository(User);

      const allUsers = await userRepo.find({
       order: {
          createdAt: 'DESC',
        }
      });
  
      res.json([
        {
          statusCode: 200,
          message: 'user fetched sucessfully',
          data: [
            {
              count: allUsers.length,
            },
              allUsers
          ],
          timestamp: Date.now()
        }
      ]);
    } catch(error) {
        console.log(`error trying to fetch users | ${error.message}`)
    }
  } 

    async create(req: Request, res: Response) {
      try {
        const { username, password }: UserInterface = req.body; 
        const userRepo = datasource.getRepository(User);

        const userToSave = userRepo.create({ username, password });

        const userSaved = await userRepo.save(userToSave);
  
      res.json([
        {
          statusCode: 200,
          message: 'user createds sucessfully',
          data: userSaved,
          timestamp: Date.now()
        }
      ]);
    } catch(error) {
        console.log(`error trying to create user | ${error.message}`)
    }
  }
  
  async findOne(req: Request, res: Response) {
    try {
        const { userId } = req.params; 

        if(!userId)
          throw new Error('Id Not Provided');

        const userRepo = datasource.getRepository(User);

        const { id, username } = await userRepo.findOneBy({
            id: userId,
        });

        if (!username) 
          throw new Error('User Not Found');

  
        res.json([ 
          {
            statusCode: 200,
            message: 'user fecthed sucessfully',
            data: {
              id,
              username,
            },
            timestamp: Date.now()
        }
      ]).status(200);
    } catch(error) {
        console.log(`error trying to find user | ${error.message}`);

        res.json(
         {
          statusCode: 400,
          message: 'failed to fetch user',
          error: error.message,
          timestamp: Date.now()
        }
        ).status(400);
    }
  }

  async updateOne(req: Request, res: Response) {
     try {
        const { userId } = req.params; 
        const { username, password } = req.body;

        if (!userId)
          throw new Error('Id Not Provided');

        if (!username && !password)
          throw new Error('Username/Password is required for Updating');

        const userRepo = datasource.getRepository(User);

        const user = await userRepo.findOneBy({
            id: userId,
        });

        if (!user) 
          throw new Error('User Not Found');

          await userRepo.update(user.id, { username, password } );
        const userUpdated = await userRepo.findOneBy({
            id: userId,
        });
        
        res.json([ 
          {
            statusCode: 200,
            message: 'user updated sucessfully',
            data: userUpdated,
            timestamp: Date.now()
        }
      ]);
    } catch(error) {
        console.log(`error trying to update user | ${error.message}`);

        res.json(
         {
          statusCode: 400,
          message: 'failed to update user',
          error: error.message,
          timestamp: Date.now()
        }
        ).status(400);
    }
  }

  async deleteOne(req: Request, res: Response) {
      try {
        const { userId } = req.params; 

        if (!userId)
          throw new Error('Id Not Provide');

        const userRepo = datasource.getRepository(User);

        const user = await userRepo.findOneBy({
            id: userId,
        });

        if (!user) 
          throw new Error('User Not Found');

        await userRepo.remove(user);
        
        res.json([ 
          {
            statusCode: 200,
            message: 'user deleted sucessfully',
            timestamp: Date.now()
        }
      ]);
    } catch(error) {
        console.log(`error trying to delete user | ${error.message}`);

        res.json(
         {
          statusCode: 400,
          message: 'failed to delete user',
          error: error.message,
          timestamp: Date.now()
        }
        ).status(400);
    }
  }
}

export default new UserController();