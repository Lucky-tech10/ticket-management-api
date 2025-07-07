import { Request, Response } from "express";
import { prisma } from "../db/connectDB";

const createTicket = async (req: Request, res: Response) => {
  const { title, description, category } = req.body;
  const admins = await prisma.admin.findMany({
    where: { category },
  });
  if (!admins || admins.length === 0) {
    return res.status(404).json({ error: "No admins found for this category" });
  }

  const ticket = await prisma.ticket.create({
    data: {
      title,
      description,
      category,
      admins: {
        connect: admins.map((admin) => ({ id: admin.id })),
      },
    },
    include: {
      admins: true,
    },
  });

  res.status(201).json({ ticket });
};

const getAllTicketsForAdmin = async (req: Request, res: Response) => {
  const adminId = (req as any).admin.adminId; // Assuming adminId is set in auth middleware
  const tickets = await prisma.ticket.findMany({
    where: {
      admins: {
        some: { id: adminId },
      },
    },
    include: {
      admins: {
        select: { name: true, email: true },
      },
    },
  });
  res.status(200).json({ tickets });
};

const getTicketStatus = async (req: Request, res: Response) => {
  // console.log(req.params);
  const { tickedId } = req.params;
  const { status } = req.body;
  const ticket = await prisma.ticket.update({
    where: { id: tickedId },
    data: { status },
  });
  if (!ticket) {
    return res.status(404).json({ error: "Ticket not found" });
  }
  res.status(200).json({ ticket });
};

export { createTicket, getAllTicketsForAdmin, getTicketStatus };
