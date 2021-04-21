import { Sequelize } from "sequelize-typescript";

export const db = new Sequelize(
  "d4bjg5tms14g14",//"ricuritas", 
  "tyqljyhijyqfyi", //"postgres", 
  "fa9fd456d22298918137a83316ddadb3fa40f4e41637adf04633e71e339036b7", //"password", 
  {
    host: "ec2-18-215-111-67.compute-1.amazonaws.com",//"localhost",
    dialect: "postgres",
    pool: {
     max: 5,
     min: 0,
     acquire: 30000,
     idle: 10000,
  },
  //logging: false,
});

export async function connectDB() {
  db.authenticate();
  console.log("Database is connected");
}
