import jwt from 'jsonwebtoken';
import { User } from '../entities/user.entity';
import { NextFunction, Response } from 'express';
import myDataSourceConfig from '../config/datasource';
import { CustomRequest } from '../interfaces/interfaces';

export default async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['login required'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = payload;

    const userRepo = myDataSourceConfig.getRepository(User);

    const user = await userRepo.findOne({ where: {
      id, email 
    }
    });

    if (!user) {
      return res.json(401).json({
        errors: ['user invalid'],
      });
    }

    req.user = payload;

    next();
  } catch (err) {
    return res.status(401).json({
      errors: ['invalid or expired token'],
    });
  }
};
