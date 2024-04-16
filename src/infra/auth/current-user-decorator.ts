import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { TokenSchema } from '@/infra/http/DTO/authenticate';

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.user as TokenSchema;
  },
);
