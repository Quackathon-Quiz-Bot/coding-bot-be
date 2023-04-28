const postgres = require('postgres');
require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

const sql = postgres(URL, { ssl: 'require' });

async function getPostgresVersion() {
  const result = await sql`select version()`;
  console.log(result);
}

getPostgresVersion();
const{PORT=8080}=process.env
const express =require('express');
const server = express();
const apiRouter = require('./api');
const {client}= require('./db/client');
client.connect();

const morgan= require('morgan');
server.use(morgan('dev'));
const cors =require('cors');
server.use(cors());
server.use(express.json());

server.use((req,res, next)=>{
  console.log("<___Body Logger START____>");
  console.log(req.method);
  console.log("____Body Logger END____>");
  next();
})

server.use('/api', apiRouter);

server.listen(PORT,()=>{
  console.log('The server is up on port', PORT)
});
