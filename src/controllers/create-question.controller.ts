import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import {
  type CreateQuestionBodySchema,
  createQuestionBodySchema,
} from '../DTO/question';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { CurrentUser } from '../auth/current-user-decorator';
import { TokenSchema } from '../DTO/authenticate';

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema);

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: TokenSchema,
  ) {
    const { title, content } = body;

    await this.prisma.question.create({
      data: {
        title,
        content,
        authorId: user.sub,
        slug: title
          .toLowerCase()
          .replace(/ /g, '-')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, ''),
      },
    });
  }
}
