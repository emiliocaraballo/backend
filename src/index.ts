require('dotenv').config();
import app from './app'
import {auth } from 'kernell-smartinfo'
const main = async (): Promise<void> => {
    app.listen(app.get("port"));
    console.log("SERVER "+app.get("port"));
    console.log(await auth.generateToken({id:12}));    
}
main();