const express = require("express");
const router = express.Router();

const PollController = require("../controllers/pollController");

router.post("/create", PollController.createPoll);
router.get("/all", PollController.getAllPolls);
router.get("/single/:id", PollController.getSinglePoll);
router.delete("/delete/:id", PollController.deletePoll);
router.post("/like/:id", PollController.likePoll);
router.get("/liked", PollController.getLikedPolls); 