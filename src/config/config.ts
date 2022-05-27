import { Connection, createConnection } from "mongoose";

export const conectarDB = async (): Promise<Connection> => {
  const conexion = await createConnection(
    process.env["DB"] as string
  ).asPromise();

  console.log("Base de datos conectada");

  return conexion.useDb(process.env["DBNAME"] as string);
};
