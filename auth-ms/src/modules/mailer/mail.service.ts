import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ErrorsEnum, ResponseEnum } from 'src/common/enum';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public SendMail(body: any): void {
    Logger.log('Send Mail Init');
    this.mailerService
      .sendMail({
        to: body.email,
        from: 'noreply@auth-ms.com',
        subject: 'Authentication MS',
        text: 'welcome',
        html: `<b> Tu codigo Secreto para activar tu usuario: ${body.secretCode}</b>`,
      })
      .then((res) => {
        Logger.log('Correo Enviado: ', res);
        return { message: ResponseEnum.MAILER_SUCCESS };
      })
      .catch((err) => {
        Logger.log('Error en Envio de correo: ', err);
        return { message: ErrorsEnum.MAILER_ERROR };
      });
  }
}
