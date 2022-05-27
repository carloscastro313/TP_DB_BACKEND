import dotenv from "dotenv";
import express from "express";
import Cors from "cors";
import routeTicketera from "./routes/ticketera.route";
import { crearConexion } from "./models/db.model";
import type { Express } from "express";
import { conectarDB } from "./config/config";

dotenv.config();

async function main() {
  const app: Express = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(Cors());

  const port = (process.env["PORT"] as string) || 3000;

  app.use(routeTicketera);

  await crearConexion();

  app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
  });
}

main();
