import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import {
  type PageQueryParamSchema,
  pageQueryParamSchema,
} from '../DTO/question';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const perPage = 20;

    const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * perPage,
      take: 20,
    });

    return { questions };
  }
}
