import path from 'path';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import multer from 'multer';
import {createConnection} from 'typeorm';

var fs = require('fs');
var upload = multer();
const app=express();
app.set('port', process.env.PORT || 3000);
createConnection();
// for parsing multipart/form-data
app.use(upload.any());
const publicPath: string = path.resolve(__dirname, '../public');
app.use('/', express.static(publicPath));
const options: cors.CorsOptions = {
    allowedHeaders: [
      'Access-Control-Allow-Headers',
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
      'Access-Control-Allow-Credentials',
      'Authorization',
      'id',
      'Access-Control-Request-Method',
      'Access-Control-Request-Headers'
    ],
    credentials: true,
    methods: 'GET,PUT,POST,DELETE',
    origin:'*'
    // optionsSuccessStatus: 200,
    // preflightContinue: false,
};
app.use(function (req, res, next) {
  res.removeHeader( 'Vary');
  res.setHeader( 'x-frame-options', 'DENY' );
  res.setHeader( 'x-xss-protection', '0' );
  res.setHeader( 'x-content-type-options', 'nosniff' );
  next();
});
app.use(cors(options));
// guardar los access.log y error.log y mas infomrmacion importante
// que se elimine cada 3 meses lo archivo. y errores por dia.
// log all requests to access.log
app.use(morgan('common', {
  stream: fs.createWriteStream(path.join(__dirname, '../errors/access.log'), { flags: 'a' })
}))

// for parsing application/json
app.use(express.json({limit:'1mb'}));
// for parsing application/xwww-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// router


import routeUser from 'src/modules/user/user.router';
app.use('/api/v1/administrator/user', routeUser);
// end:router
export default app;