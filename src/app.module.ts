import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { FilesModule } from './files/files.module';
import { ServicesModule } from './services/services.module';
import { EquipmentsModule } from './equipments/equipments.module';
import { RoomsModule } from './rooms/rooms.module';
import { BillsModule } from './bills/bills.module';
import { ContractsModule } from './contracts/contracts.module';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('CONNECTION_STRING'),
        connectionFactory: (connection) => {
          connection.plugin(softDeletePlugin);
          return connection;
        }
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    FilesModule,
    ServicesModule,
    EquipmentsModule,
    RoomsModule,
    BillsModule,
    ContractsModule,
    PermissionModule,
    RoleModule
  ],
  controllers: [AppController],

  providers: [
    AppService,
    
  ],
})
export class AppModule {}
