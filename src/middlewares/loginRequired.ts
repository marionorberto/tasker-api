import jwt from 'jsonwebtoken';
import { User } from '../entities/user.entity';
import { NextFunction, Request, Response } from 'express';
import myDataSourceConfig from '../config/datasource';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['login required'],
    });
  }

  const [, token] = authorization.split(' ');
  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, username } = data;

    const userRepo = myDataSourceConfig.getRepository(User);

    const user = await userRepo.findOne({ where: {
      id, username 
    }
    });

    if (!user) {
      return res.json(401).json({
        errors: ['user invalid'],
      });
    }

    // req.user = id;
    // req.userUsername = username;

    return next();
  } catch (err) {
    return res.status(401).json({
      errors: ['invalid or expired token'],
    });
  }
};
