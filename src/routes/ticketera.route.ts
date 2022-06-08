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
  getCoberturaLanus,
  getUsuarioAvellaneda,
  getSinCobertura,
  getReclamosMarzo,
  getReclamosSinResolver,
  getReclamosDetalleST,
  getDetalleQuery,
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
router.get("/coberturaLanus", getCoberturaLanus);
router.get("/usuarioAvellaneda", getUsuarioAvellaneda);
router.get("/sinCobertura", getSinCobertura);
router.get("/reclamosMarzo", getReclamosMarzo);
router.get("/reclamosSinResolver", getReclamosSinResolver);
router.get("/reclamosConversorExterno", getReclamosDetalleST);
router.get("/reclamos/:detalle", getDetalleQuery);

export default router;
