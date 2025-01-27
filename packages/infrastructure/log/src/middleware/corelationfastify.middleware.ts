import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CorrelationIdFastifyMiddleware implements NestMiddleware {
  use(req: FastifyRequest, res: FastifyReply, next: () => void) {
    const correlationId = uuidv4();
    if (!req.headers['x-correlation-id']) {
      req.headers['x-correlation-id'] = correlationId;
      res.header('x-correlation-id', correlationId);
    }
    next();
  }
}
