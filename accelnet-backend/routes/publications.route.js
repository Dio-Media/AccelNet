// routes/publications.route.js
import express from "express";
import {
  getAllPublications,
  getPublicationsByTitle,
} from "../controllers/publications.controller.js";

const router = express.Router();

// GET /api/publications
router.get("/", getAllPublications);

// GET /api/publications/search?title=...
router.get("/search", getPublicationsByTitle);

export default router;
