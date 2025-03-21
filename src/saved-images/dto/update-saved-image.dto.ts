import { PartialType } from '@nestjs/swagger';
import { CreateSavedImageDto } from './create-saved-image.dto';

export class UpdateSavedImageDto extends PartialType(CreateSavedImageDto) {}
