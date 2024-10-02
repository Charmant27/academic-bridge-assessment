import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserDocument, UserSchema } from './models/users.schema';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
        {name: UserDocument.name, schema: UserSchema}
    ])
  ],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
