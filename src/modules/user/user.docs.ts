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
 * /users/login:
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
 *                      password:
 *                        type: string
 *                        example: password 
 *    description: 
 *    responses:
 *      '200': 
 *        description: 
 *        content:
 *           application/json:
 *              schema:
 *                  $ref: '#/components/Login'
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
 *      Login:
 *         required:
 *              [token]
 *         properties:
 *              code:
 *                 type: number
 *                 examen: 1
 *              token:
 *                 type: string
 *                 examen: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC'
 *              data:
 *                 type: object
 *                 properties:
 *                   id:
 *                      type: string
 *                      examen: 1395338f-3212-4936-bf2f-b70b9203fbdf
 *                   names:
 *                      type: string
 *                   phone:
 *                      type: string
 *                   identification:
 *                      type: string
 *                   email:
 *                      type: string
 */