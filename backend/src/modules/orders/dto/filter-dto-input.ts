import { ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatus } from '../../../commons/enum';

export class FilterInputDto {
  @ApiPropertyOptional()
  associate_id: string | null;

  @ApiPropertyOptional({ enum: OrderStatus })
  status: 'PENDING' | 'DISPATCHED' | 'DELIVERED' | 'CANCELLED';
}
