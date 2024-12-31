const express = require("express");
const router = express.Router();
const Task = require("../models/task.model");
const authMiddleware = require("../middleware/auth.middleware");

// Middleware d'authentification pour toutes les routes
router.use(authMiddleware);

// Récupérer toutes les tâches de l'utilisateur
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort("order");
    res.json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des tâches",
      error: error.message,
    });
  }
});

// Créer une nouvelle tâche
router.post("/", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const lastTask = await Task.findOne({ user: req.user._id }).sort("-order");
    const order = lastTask ? lastTask.order + 1 : 0;

    const task = new Task({
      title,
      description,
      status,
      user: req.user._id,
      order,
    });

    await task.save();
    res.status(201).json({ success: true, task });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la création de la tâche",
      error: error.message,
    });
  }
});

// Mettre à jour une tâche
router.put("/:id", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, description, status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Tâche non trouvée",
      });
    }

    res.json({ success: true, task });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour de la tâche",
      error: error.message,
    });
  }
});

// Supprimer une tâche
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Tâche non trouvée",
      });
    }

    res.json({ success: true, message: "Tâche supprimée avec succès" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la suppression de la tâche",
      error: error.message,
    });
  }
});

// Réorganiser les tâches
router.put("/reorder/:id", async (req, res) => {
  try {
    const { newOrder } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { order: newOrder },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Tâche non trouvée",
      });
    }

    res.json({ success: true, task });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la réorganisation des tâches",
      error: error.message,
    });
  }
});

module.exports = router;
