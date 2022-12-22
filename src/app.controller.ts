import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('HealthCheck')
@Controller()
export class AppController {
  @ApiOkResponse({
    description: 'ok',
    schema: {
      example: 'check',
    },
  })
  @Get('/')
  healthCheck() {
    return 'check';
  }
}
