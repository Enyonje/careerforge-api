import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  status() {
    return {
      name: 'CareerForge API',
      tagline: 'Turning skills into pathways',
      status: 'ok',
    };
  }
}
