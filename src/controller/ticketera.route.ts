import { getInstance } from "../models/db.model";

import type { Request, Response } from "express";
import { Connection } from "mongoose";

export async function getAll(req: Request, res: Response) {
  try {
    const db: Connection = getInstance();

    const tickets = await db.collection("ticketera").find({}).toArray();

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
      .collection("ticketera")
      .aggregate([
        { $match: { "reclamo.tipo": "desperfecto" } },
        {
          $project: {
            _id: 1,
            "reclamo.fecha": 1,
            "reclamo.tipo": 1,
            "reclamo.detalle": 1,
            locacion: 1,
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
      .collection("ticketera")
      .aggregate([
        { $match: { "reclamo.tipo": "desperfecto" } },
        {
          $group: {
            _id: "$locacion.localidad",
            reclamo: {
              $push: {
                fecha: "$reclamo.fecha",
                tipo: "$reclamo.tipo",
                detalle: "$reclamo.detalle",
                locacion: "$locacion",
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
      .collection("ticketera")
      .aggregate([
        {
          $match: {
            "reclamo.tipo": {
              $ne: "desperfecto",
            },
          },
        },
        {
          $project: {
            _id: 1,
            "reclamo.fecha": 1,
            "reclamo.tipo": 1,
            "reclamo.detalle": 1,
            locacion: 1,
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
      .collection("ticketera")
      .aggregate([
        {
          $match: {
            "reclamo.tipo": {
              $ne: "desperfecto",
            },
          },
        },
        {
          $group: {
            _id: "$locacion.localidad",
            reclamo: {
              $push: {
                fecha: "$reclamo.fecha",
                tipo: "$reclamo.tipo",
                detalle: "$reclamo.detalle",
                locacion: "$locacion",
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
      .collection("ticketera")
      .aggregate([
        {
          $unwind: "$reclamo.derivaciones",
        },
        {
          $group: {
            _id: "$reclamo.derivaciones.area",
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
      .collection("ticketera")
      .aggregate([
        { $match: { "reclamo.resuelto": false } },
        {
          $project: {
            _id: 1,
            nombre: 1,
            apellido: 1,
            plan: 1,
            "reclamo.fecha": 1,
            "reclamo.tipo": 1,
            "reclamo.detalle": 1,
            locacion: 1,
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
      .collection("ticketera")
      .aggregate([
        {
          $match: {
            "reclamo.tipo": {
              $in: ["cambio de plan", "dar de alta", "dar de baja"],
            },
          },
        },
        {
          $group: {
            _id: "$reclamo.tipo",
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
