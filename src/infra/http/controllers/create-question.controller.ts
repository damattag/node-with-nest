import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import {
  type CreateQuestionBodySchema,
  createQuestionBodySchema,
} from '@/infra/http/DTO/question';
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { TokenSchema } from '@/infra/http/DTO/authenticate';

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
