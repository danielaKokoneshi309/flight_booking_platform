import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class OptionalParseIntPipe implements PipeTransform<string | null, number | null> {
  transform(value: string | null, metadata: ArgumentMetadata): number | null {
    if (value === null || value === undefined) {
      return null;
    }
    
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed (numeric string is expected)');
    }
    return val;
  }
}
