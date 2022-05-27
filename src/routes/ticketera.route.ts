import { Router } from "express";
import {
  getAll,
  getAtenciones,
  getAtencionPorTipo,
  getAtencionPorZona,
  getDesperfectos,
  getDesperfectosPorZonas,
  mayorTicketsPorArea,
  ticketsSinResolver,
} from "../controller/ticketera.route";

const router = Router();

router.get("", getAll);
router.get("/desperfectos", getDesperfectos);
router.get("/desperfectosPorZona", getDesperfectosPorZonas);
router.get("/atenciones", getAtenciones);
router.get("/atencionPorZona", getAtencionPorZona);
router.get("/mayorAtendidos", mayorTicketsPorArea);
router.get("/ticketsSinResolver", ticketsSinResolver);
router.get("/atencionPorTipo", getAtencionPorTipo);

export default router;
