import express from 'express';
const app=express();

// se importa lo modulo a usar en la aplicacion.
import routeUser from 'src/modules/user/user.router';
app.use('/users', routeUser);

import routeMenu from 'src/modules/menu/menu.router';
app.use('/menu', routeMenu);

import routeProfile from 'src/modules/profile/profile.router';
app.use('/profile', routeProfile);

//end:se importa lo modulo a usar en la aplicacion.

// para definir el tipo  de estructura de error 400 que son tema de error parametro,body,query etc.
app.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
      // tuvimos un error joi, devolvamos una respuesta personalizada 400 json
      res.status(400).json({
        statusCode:400,
        title: err.type, //  será "consulta" aquí, pero podría ser "encabezados", "cuerpo" o "parámetros"
        message: err.error.toString(),
        timestamp: new Date().toISOString(),
        path: req.baseUrl
      });
    } else {
      // pasar a otro controlador de errores
      next();
    }
  });
export default app;