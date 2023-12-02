import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('pick-a-pile')
@Controller('pick-a-pile')
export class PickAPileController {}
