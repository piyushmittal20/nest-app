import { Injectable, NestMiddleware, HttpException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { students } from '../../db';

@Injectable()
export class ValidStudentMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('I am calling....');
    const studentId = req.params.studentId;
    const studentExists = students.some((student) => {
      return student.id === studentId;
    });
    if (!studentExists) {
      throw new HttpException('Student not found', 400);
    }
    next();
  }
}
