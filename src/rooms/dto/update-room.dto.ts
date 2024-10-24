import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './create-room.dto';

export class UpdateRoomDto extends OmitType(CreateRoomDto, ['roomName', 'status'] as const) {
    _id: string
}
