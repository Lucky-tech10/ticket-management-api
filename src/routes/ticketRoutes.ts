const router = require("express").Router();
import {
  createTicket,
  getAllTicketsForAdmin,
  getTicketStatus,
} from "../controllers/ticketController";
import authMiddleware from "../middleware/authMiddleware";

router.post("/", createTicket);
router.get("/assigned", authMiddleware, getAllTicketsForAdmin);
router.patch("/:tickedId/status", authMiddleware, getTicketStatus);

export default router;
