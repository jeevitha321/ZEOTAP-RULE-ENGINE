import {express,  json } from 'express';

import { connect } from 'mongoose';
import { config } from 'dotenv';

config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());

connect(process.env.MONGODB_URI)
.then(()=>console.log("DB Connection established"))
.catch((err)=>console.error("DB Connection failed ", err))

app.listen(PORT, ()=>
    console.log(`The server port is running at ${PORT}`)
);