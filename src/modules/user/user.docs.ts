/**
 * @swagger
 * /users/validate:
 * 
 *  post: 
 *    tags:
 *      [users]
 *    requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  properties:
 *                      username:
 *                        type: string
 *                        example: emiliocaraballo9810@gmail.com
 *    description: Se valida que el usuario existe
 *    responses:
 *      '200': 
 *        description: El usuario existe
 *        content:
 *           application/json:
 *              schema:
 *                  $ref: '#/components/ValidateUser'
 *      '400': 
 *        description: Error message
 *        content:
 *           application/json:
 *              schema:
 *                  $ref: '#/components/ErrorResponse' 
 *      '404': 
 *        description: Error message
 *        content:
 *           application/json:
 *              schema:
 *                  $ref: '#/components/ErrorResponse' 
 * 
 * 
 * components:
 *      ErrorResponse:
 *          required:
 *              [message]
 *          properties:
 *              statusCode:
 *                  type: number
 *                  example: 0
 *              title:
 *                  type: string
 *                  examen: Lo sentimos.
 *              message:
 *                  type: string
 *                  examen: Hubo un error intente nuevamente.
 *              timestamp:
 *                  type: string
 *                  examen: 2022-02-27T19:39:42.800Z
 *              path:
 *                  type: string
 *                  examen: /api/v1/
 *      ValidateUser:
 *         required:
 *              [success]
 *         properties:
 *              success:
 *                 type: boolean
 *                 examen: true
 * 
 









*/