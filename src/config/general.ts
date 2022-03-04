import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import moment from 'moment';
import bcrypt from 'bcryptjs';

class General{

    // fecha actual formato YYYY-MM-DD HH:MM:SS con hora colombiana por default
    public dateNow=(offset:any="-5.0")=>{
         return this.calcTime(offset);
    }

    // si la bd devuelve una fecha con otro formato al pasarla como parametro aqui se ajusta a YYYY-MM-DD HH:MM:SS.
    public dateFormat=(string:string)=>{
        var date = new Date(string);
        var dateStr =
        date.getFullYear() + "-" +
        ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
        ("00" + date.getDate()).slice(-2) + " " +
        ("00" + date.getHours()).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2) + ":" +
        ("00" + date.getSeconds()).slice(-2);
        return dateStr;
    }

    // fecha actual,fecha vieja se compara y devuelve el nro de minuto transcurrido.
    public diff_minute=(date1:string,date2:string)=>{
        var now = moment(new Date(date1));
       
        var end = moment(date2); // another date
        var duration = moment.duration(now.diff(end));
        var minute = duration.asMinutes();
        return parseInt(String(minute));
    }
    
    // pretermidado a que devuelva la hora colombiana
    public calcTime=(offset:any="-5.0")=>{
        // creamos el objeto Date (la selecciona de la máquina cliente)
        var d = new Date();
        // lo convierte  a milisegundos
        // añade la dirferencia horaria
        // recupera la hora en formato UTC
       var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        // crea un nuevo objeto Date usando la diferencia dada.
      var  nd = new Date(utc + (3600000*offset));
        // devuelve la hora como string.
      return general.dateFormat(nd.toString());
    }



    // google autenticador
    public verificarGoogleAuth=(codigo:string,secret:string)=>{
        const verificar=speakeasy.totp.verify({
            secret:secret,
            encoding:'ascii',
            token:codigo
        });
        return verificar;
    }

    public generarGoogleAuth=async(correo:string)=>{
        var secret = speakeasy.generateSecret({
            name:process.env.NOMBRE_PROYECTO+"("+correo+")"
        });
        var token=secret.ascii;
        var otpauth_url=secret.otpauth_url;
        var tex=secret.otpauth_url as string;
        var imagen=await qrcode.toDataURL(tex);
        return {token:token,otpauth_url:otpauth_url,imagen:imagen};
    }
    // fin google autenticador


    // cifrado de una solo via
    public encryptOne=async(text:string)=>{
        return bcrypt.hash(text,10);
    }

     //  comparar cifrado con el hash de una solo via
     public encryptCompareOne=async(text:string,hash:string)=>{
        return bcrypt.compare(text,hash);
    }

 }
 
 export const general=new General;