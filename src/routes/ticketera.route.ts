import { Router } from "express";
import {
  getAllReclamos,
  getAllAreas,
  getAllPlanes,
  getAllUsuarios,
  getAtenciones,
  getAtencionPorTipo,
  getAtencionPorZona,
  getDesperfectos,
  getDesperfectosPorZonas,
  mayorTicketsPorArea,
  ticketsSinResolver,
} from "../controller/ticketera.controller";

const router = Router();

router.get("/reclamos", getAllReclamos);
router.get("/usuarios", getAllUsuarios);
router.get("/planes", getAllPlanes);
router.get("/areas", getAllAreas);
router.get("/desperfectos", getDesperfectos);
router.get("/desperfectosPorZona", getDesperfectosPorZonas);
router.get("/atenciones", getAtenciones);
router.get("/atencionPorZona", getAtencionPorZona);
router.get("/mayorAtendidos", mayorTicketsPorArea);
router.get("/ticketsSinResolver", ticketsSinResolver);
router.get("/atencionPorTipo", getAtencionPorTipo);

export default router;
