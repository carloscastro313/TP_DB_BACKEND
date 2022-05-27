import { Connection } from "mongoose";
import { conectarDB } from "../config/config";

interface State {
  db: Connection | null;
}

let state: State = {
  db: null,
};

export const crearConexion = async (): Promise<void> => {
  try {
    state.db = await conectarDB();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export const getInstance = (): Connection => {
  if (!state.db) throw new Error("Error en la conexion");

  return state.db;
};
