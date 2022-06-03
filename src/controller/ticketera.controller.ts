import { getInstance } from "../models/db.model";

import type { Request, Response } from "express";
import { Connection } from "mongoose";

export async function getAllUsuarios(req: Request, res: Response) {
  try {
    const db: Connection = getInstance();

    const usuarios = await db.collection("usuario").find({}).toArray();

    res.json({
      ok: true,
      usuarios,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      error,
    });
  }
}

export async function getAllPlanes(req: Request, res: Response) {
  try {
    const db: Connection = getInstance();

    const tickets = await db.collection("plan").find({}).toArray();

    res.json({
      ok: true,
      tickets,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      error,
    });
  }
}

export async function getAllAreas(req: Request, res: Response) {
  try {
    const db: Connection = getInstance();

    const tickets = await db.collection("area").find({}).toArray();

    res.json({
      ok: true,
      tickets,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      error,
    });
  }
}

export async function getAllReclamos(req: Request, res: Response) {
  try {
    const db: Connection = getInstance();

    const tickets = await db.collection("reclamos").find({}).toArray();

    res.json({
      ok: true,
      tickets,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      error,
    });
  }
}

export async function getDesperfectos(req: Request, res: Response) {
  try {
    const db: Connection = getInstance();

    const tickets = await db
      .collection("reclamos")
      .aggregate([
        { $match: { tipo: "Servicio tecnico" } },
        {
          $lookup: {
            from: "usuario",
            localField: "usuario",
            foreignField: "_id",
            as: "usuario",
          },
        },
        {
          $lookup: {
            from: "usuario",
            localField: "resolucion.empleado",
            foreignField: "_id",
            as: "resolucion.empleado",
          },
        },
        {
          $unwind: "$usuario",
        },
        {
          $unwind: "$resolucion.empleado",
        },
        {
          $lookup: {
            from: "plan",
            localField: "usuario.plan",
            foreignField: "_id",
            as: "usuario.plan",
          },
        },
        {
          $unwind: "$derivaciones",
        },
        {
          $lookup: {
            from: "area",
            localField: "derivaciones.area",
            foreignField: "_id",
            as: "derivaciones.area",
          },
        },
        {
          $lookup: {
            from: "usuario",
            localField: "derivaciones.empleado",
            foreignField: "_id",
            as: "derivaciones.empleado",
          },
        },
        {
          $unwind: "$derivaciones.empleado",
        },
        {
          $unwind: "$derivaciones.area",
        },
        {
          $unset: [
            "derivaciones.area.cobertura",
            "derivaciones.area.empleado",
            "derivaciones.empleado.plan",
            "resolucion.empleado.plan",
          ],
        },
        {
          $group: {
            _id: "$_id",
            fecha_inicio: { $first: "$fecha_inicio" },
            usuario: { $first: "$usuario" },
            tipo: { $first: "$tipo" },
            detalle: { $first: "$detalle" },
            resolucion: { $first: "$resolucion" },
            derivaciones: {
              $push: "$derivaciones",
            },
          },
        },
      ])
      .toArray();

    res.json({
      ok: true,
      tickets,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      error,
    });
  }
}

export async function getDesperfectosPorZonas(req: Request, res: Response) {
  try {
    const db: Connection = getInstance();

    const tickets = await db
      .collection("reclamos")
      .aggregate([
        { $match: { tipo: "Servicio tecnico" } },
        {
          $lookup: {
            from: "usuario",
            localField: "usuario",
            foreignField: "_id",
            as: "usuario",
          },
        },
        {
          $unwind: "$usuario",
        },
        {
          $unset: ["usuario.plan"],
        },
        {
          $group: {
            _id: "$usuario.location.localidad",
            desperfectos: {
              $push: {
                fecha: "$fecha_inicio",
                tipo: "$tipo",
                detalle: "$detalle",
                solucionado: "$resolucion.solucionado",
                usuario: "$usuario",
              },
            },
          },
        },
      ])
      .toArray();

    res.json({
      ok: true,
      tickets,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      error,
    });
  }
}

export async function getAtenciones(req: Request, res: Response) {
  try {
    const db: Connection = getInstance();

    const tickets = await db
      .collection("reclamos")
      .aggregate([
        {
          $match: {
            tipo: {
              $ne: "Servicio tecnico",
            },
          },
        },
        {
          $lookup: {
            from: "usuario",
            localField: "usuario",
            foreignField: "_id",
            as: "usuario",
          },
        },
        {
          $lookup: {
            from: "usuario",
            localField: "resolucion.empleado",
            foreignField: "_id",
            as: "resolucion.empleado",
          },
        },
        {
          $unwind: "$usuario",
        },
        {
          $unwind: "$resolucion.empleado",
        },
        {
          $lookup: {
            from: "plan",
            localField: "usuario.plan",
            foreignField: "_id",
            as: "usuario.plan",
          },
        },
        {
          $unwind: "$derivaciones",
        },
        {
          $lookup: {
            from: "area",
            localField: "derivaciones.area",
            foreignField: "_id",
            as: "derivaciones.area",
          },
        },
        {
          $lookup: {
            from: "usuario",
            localField: "derivaciones.empleado",
            foreignField: "_id",
            as: "derivaciones.empleado",
          },
        },
        {
          $unwind: "$derivaciones.empleado",
        },
        {
          $unwind: "$derivaciones.area",
        },
        {
          $unset: [
            "derivaciones.area.cobertura",
            "derivaciones.area.empleado",
            "derivaciones.empleado.plan",
            "resolucion.empleado.plan",
          ],
        },
        {
          $group: {
            _id: "$_id",
            fecha_inicio: { $first: "$fecha_inicio" },
            usuario: { $first: "$usuario" },
            tipo: { $first: "$tipo" },
            detalle: { $first: "$detalle" },
            resolucion: { $first: "$resolucion" },
            derivaciones: {
              $push: "$derivaciones",
            },
          },
        },
      ])
      .toArray();

    res.json({
      ok: true,
      tickets,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      error,
    });
  }
}

export async function getAtencionPorZona(req: Request, res: Response) {
  try {
    const db: Connection = getInstance();

    const tickets = await db
      .collection("reclamos")
      .aggregate([
        {
          $match: {
            tipo: {
              $ne: "Servicio tecnico",
            },
          },
        },
        {
          $lookup: {
            from: "usuario",
            localField: "usuario",
            foreignField: "_id",
            as: "usuario",
          },
        },
        {
          $unwind: "$usuario",
        },
        {
          $unset: ["usuario.plan"],
        },
        {
          $group: {
            _id: "$usuario.location.localidad",
            desperfectos: {
              $push: {
                fecha: "$fecha_inicio",
                tipo: "$tipo",
                detalle: "$detalle",
                solucionado: "$resolucion.solucionado",
                usuario: "$usuario",
              },
            },
          },
        },
      ])
      .toArray();

    res.json({
      ok: true,
      tickets,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      error,
    });
  }
}

export async function mayorTicketsPorArea(req: Request, res: Response) {
  try {
    const db: Connection = getInstance();

    const tickets = await db
      .collection("reclamos")
      .aggregate([
        {
          $unwind: "$derivaciones",
        },
        {
          $lookup: {
            from: "area",
            localField: "derivaciones.area",
            foreignField: "_id",
            as: "derivaciones.area",
          },
        },
        {
          $group: {
            _id: "$derivaciones.area._id",
            area: { $first: "$derivaciones.area.nombre" },
            cantidad: { $sum: 1 },
          },
        },
        {
          $sort: {
            cantidad: -1,
          },
        },
        {
          $limit: 1,
        },
      ])
      .toArray();

    res.json({
      ok: true,
      tickets,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      error,
    });
  }
}

export async function ticketsSinResolver(req: Request, res: Response) {
  try {
    const db: Connection = getInstance();

    const tickets = await db
      .collection("reclamos")
      .aggregate([
        { $match: { "resolucion.solucionado": false } },
        {
          $lookup: {
            from: "usuario",
            localField: "usuario",
            foreignField: "_id",
            as: "usuario",
          },
        },
        {
          $unwind: "$usuario",
        },
        {
          $lookup: {
            from: "plan",
            localField: "usuario.plan",
            foreignField: "_id",
            as: "usuario.plan",
          },
        },
        {
          $unwind: "$derivaciones",
        },
        {
          $lookup: {
            from: "area",
            localField: "derivaciones.area",
            foreignField: "_id",
            as: "derivaciones.area",
          },
        },
        {
          $lookup: {
            from: "usuario",
            localField: "derivaciones.empleado",
            foreignField: "_id",
            as: "derivaciones.empleado",
          },
        },
        {
          $unwind: "$derivaciones.empleado",
        },
        {
          $unwind: "$derivaciones.area",
        },
        {
          $unset: [
            "derivaciones.area.cobertura",
            "derivaciones.area.empleado",
            "derivaciones.empleado.plan",
          ],
        },
        {
          $group: {
            _id: "$_id",
            fecha_inicio: { $first: "$fecha_inicio" },
            usuario: { $first: "$usuario" },
            tipo: { $first: "$tipo" },
            detalle: { $first: "$detalle" },
            resolucion: { $first: "$resolucion" },
            derivaciones: {
              $push: "$derivaciones",
            },
          },
        },
      ])
      .toArray();

    res.json({
      ok: true,
      tickets,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      error,
    });
  }
}

export async function getAtencionPorTipo(req: Request, res: Response) {
  try {
    const db: Connection = getInstance();

    const tickets = await db
      .collection("reclamos")
      .aggregate([
        {
          $match: {
            detalle: {
              $in: [
                "Contratar servicio",
                "Baja de servicio",
                "Cambio de conversor",
              ],
            },
          },
        },
        {
          $group: {
            _id: "$detalle",
            cantidad: { $sum: 1 },
          },
        },
      ])
      .toArray();

    res.json({
      ok: true,
      tickets,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      error,
    });
  }
}
