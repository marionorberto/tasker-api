import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import  datasource from '../config/datasource';
import bcryptjs from 'bcryptjs';

import { User } from '../entities/user.entity';

class TokenController {
  
  async signIn(req: Request, res: Response ) {
    const userRepo = datasource.getRepository(User);
    
    const { username = '', password = '' } = req.body;

    if (!username || !password) {
      return res.status(401).json({
        errors: ['invalid credencials'],
      });
    }

    const user = await userRepo.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({
        errors: ['user invalid'],
      });
    }

    if (!(await this.validatePassword(password, user.password))) {
      return res.status(401).json({
        errors: ['password invalid'],
      });
    }

    const { id } = user;
    const token = jwt.sign({ id, username }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.status(200).json({
      acess_token: token,
    });
  }

  async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcryptjs.compare(plainPassword, hashedPassword);
  }
}
export default new TokenController();
