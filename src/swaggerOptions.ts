require('dotenv').config();

export const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API",
        version: "1.0.0",
        description: "Rest API para las plataformas",
        contact:{
            email:"emiliocaraballo9810@gmail.com"
        }
      },
      servers: [
        {
          url: "http://localhost:"+process.env.PORT+"/api/v1",
        },
      ],
      tags:[
          {
              name:"users",
              description:"Rutas de usuarios"
          }
      ]
    },
    apis: ["./src/modules/**/*.docs.ts","./src/modules/**/**/*.docs.ts"],
  };