const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const PollController = require("../controllers/pollController");

router.post("/create", authMiddleware, PollController.createPoll);
router.get("/all", PollController.getAllPolls);
router.get("/single/:id", PollController.getSinglePoll);
router.delete("/delete/:id", authMiddleware, PollController.deletePoll);
router.post("/like/:id", authMiddleware, PollController.likePoll);
router.get("/liked", authMiddleware, PollController.getLikedPolls);
router.post("/:id/vote", authMiddleware, PollController.vote);
