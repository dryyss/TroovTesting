const express = require("express");
const router = express.Router();
const Event = require("../models/event.model");
const authMiddleware = require("../middleware/auth.middleware");

// Middleware d'authentification pour toutes les routes
router.use(authMiddleware);

// Récupérer tous les événements de l'utilisateur
router.get("/", async (req, res) => {
  try {
    const { start, end } = req.query;
    const query = { user: req.user._id };

    // Filtrer par plage de dates si spécifié
    if (start && end) {
      query.date = {
        $gte: new Date(start),
        $lte: new Date(end),
      };
    }

    const events = await Event.find(query).sort("date");
    res.json({ success: true, events });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des événements",
      error: error.message,
    });
  }
});

// Créer un nouvel événement
router.post("/", async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const event = new Event({
      title,
      description,
      date: new Date(date),
      user: req.user._id,
    });

    await event.save();
    res.status(201).json({ success: true, event });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la création de l'événement",
      error: error.message,
    });
  }
});

// Mettre à jour un événement
router.put("/:id", async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, description, date: new Date(date) },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Événement non trouvé",
      });
    }

    res.json({ success: true, event });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour de l'événement",
      error: error.message,
    });
  }
});

// Supprimer un événement
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Événement non trouvé",
      });
    }

    res.json({ success: true, message: "Événement supprimé avec succès" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la suppression de l'événement",
      error: error.message,
    });
  }
});

module.exports = router;
