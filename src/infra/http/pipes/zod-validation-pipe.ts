import { PipeTransform, BadRequestException, HttpCode } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  @HttpCode(400)
  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(
          error.issues.map((issue) => issue.message).join(', '),
        );
      }

      throw new BadRequestException('Validation failed');
    }
  }
}
