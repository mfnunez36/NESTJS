import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './app.roles';
import { MailService } from './modules/mailer/mail.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    AccessControlModule.forRoles(roles),
    UserModule,
    ConfigModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [],
  providers: [MailService],
})
export class AppModule {
  static port: number;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = +this.configService.get('PORT'); // con + casteamos a number
  }
}
