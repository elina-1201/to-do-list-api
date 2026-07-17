import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getEndPoints() {
    return { name: 'Task API', version: 1.0, endpoints: ['/tasks'] };
  }

  getHealth() {
    return { status: 'ok' };
  }
}
