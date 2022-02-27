import nodemailer from "nodemailer";

class Mailer{

    private hostname: string="mail.smartinfo.com.co";
    private port: number=465;
    private secure: boolean=true;
    private requireTLS: boolean=false;
    private logger: boolean=false;
    private username: string="emilio@smartinfo.com.co";
    private password: string="emilio2k19";
    private from:string="emiliocaraballo9810@gmail.com";
    
    public main=async(name:string="Smartinfo",subject:string="Hello from smartinfo",html:string="<strong>Hello world?</strong>",to:string | any[]="emiliocaraballo9810@gmail.com",replay:string | any[]="emilioflow2016@gmail.com")=>{
      try {
        const transporter = nodemailer.createTransport({
          host: this.hostname,
          port: this.port,
          secure: this.secure,
          requireTLS: this.requireTLS,
          auth: {
            user: this.username,
            pass: this.password,
          },
          logger: this.logger
        });

        const info = await transporter.sendMail({
          from: '"'+name+'" <'+this.from+">",
          to: to,
          bcc: replay,
          subject:subject,
          html: html,
        });
        
        return info.messageId.length>0;
      } catch (error) {
        
      }
      return false;
    }
}

export const mailer = new Mailer;