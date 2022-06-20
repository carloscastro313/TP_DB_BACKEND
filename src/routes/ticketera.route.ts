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
  getCantidadDesperfectos,
  getConcurrenciaDesperfecto,
  getMayorZonaDesperfecto,
  getReclamosEmpleados,
  getClienteMayorTickets,
  getEmpleadoMayorResolucion,
  getEmpleadosPorCantidadPlanes,
  getHoraMasOcupada,
  getClienteMasCaro,
} from "../controller/ticketera.controller";

const router = Router();

router.get("/reclamos", getAllReclamos); // Todos los reclamos
router.get("/usuarios", getAllUsuarios); // Todos los usuarios
router.get("/planes", getAllPlanes); // Todos los planes
router.get("/areas", getAllAreas); // Todas las areas
router.get("/desperfectos", getDesperfectos); // Todos los desperfectos
router.get("/desperfectosPorZona", getDesperfectosPorZonas); // Todos los desperfectos por zona
router.get("/atenciones", getAtenciones); // Todas las atenciones
router.get("/atencionPorZona", getAtencionPorZona); // Todas las atenciones por zona
router.get("/mayorAtendidos", mayorTicketsPorArea); // El area con mayor cantidad de tickets
router.get("/ticketsSinResolver", ticketsSinResolver); // Tickets sin resolver
router.get("/atencionPorTipo", getAtencionPorTipo); // Atenciones por tipos Contratar servicio, Baja de servicio, Cambio de conversor
router.get("/coberturaLanus", getCoberturaLanus); // Clientes en la cobertura de lanus
router.get("/usuarioAvellaneda", getUsuarioAvellaneda); // Cliente en la zona de avellaneda
router.get("/sinCobertura", getSinCobertura); // Cliente sin cobertura
router.get("/reclamosMarzo", getReclamosMarzo); // Reclamos de mes de marzo
router.get("/reclamosSinResolver", getReclamosSinResolver); // Reclamos sin resolver
router.get("/reclamosConversorExterno", getReclamosDetalleST); // Reclamos de servicio tecnico de tipo Reparacion de instalacion externa, Cambio de conversor
router.get("/reclamos/:detalle", getDetalleQuery); // Reclamos por text index
router.get("/cantidadDesperfectos", getCantidadDesperfectos); // cantidad de desperfectos
// router.get("/concurrenciaDesperfecto", getConcurrenciaDesperfecto);
router.get("/zonaMayorDesperfectos", getMayorZonaDesperfecto); // La zona con mayor cantiadad de desperfectos
router.get("/consultasEmpleados", getReclamosEmpleados); // Reclamos de clientes que tambien son empleados
router.get("/clienteMayorTickets", getClienteMayorTickets); // El cliente con mayor cantidad de tickets
router.get("/empleadoPlanes", getEmpleadosPorCantidadPlanes); // Empleados que tambien son clientes que tengan contratados mas de 2 planes
router.get("/empleadoMayorResoluciones", getEmpleadoMayorResolucion); // Empleados con mayor cantidad de tickets resueltos
router.get("/horaMasOcupada", getHoraMasOcupada); // La hora con mas reclamos
router.get("/clienteMasCaro", getClienteMasCaro); // El cliente con el precio total mas caro

export default router;
