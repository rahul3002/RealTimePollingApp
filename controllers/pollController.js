const { Poll } = require('../models/db');

//create a new poll

exports.createPoll = async (req, res) => {
    const { title, description, options } = req.body;
    try {
        const poll = new PollController.Poll({
            title,
            description,
            options,
            createdBy: req.user._id,
        });
        await poll.save();
        res.status(201).json(poll);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
}

//delete a poll
exports.deletePoll = async (req, res) => {
    try {
        const poll = await PollController.Poll.findById(req.params.id);
        await poll.remove();
        res.status(200).json(poll);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get all polls
exports.getAllPolls = async (req, res) => {
    try {
        const polls = await PollController.Poll.find();
        res.status(200).json(polls);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get a single poll by id
exports.getSinglePoll = async (req, res) => {
    try {
        const poll = await PollController.Poll.findById(req.params.id);
        res.status(200).json(poll);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//like a poll
exports.likePoll = async (req, res) => {
    try {
        const poll = await PollController.Poll.findById(req.params.id);
        const user = await poll.user;
        if (user.toString() !== req.body.userId.toString()) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        poll.likes.push(req.body.userId);
        await poll.save();
        res.status(201).json(poll);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Vote on a poll
exports.vote = async (req, res) => {
    const { option } = req.body;
    const pollId = req.params.id;
    const userId = req.user._id;

    try {
        const poll = await PollController.Poll.findById(pollId);
        if (!poll) {
            return res.status(404).json({ message: 'Poll not found' });
        }

        if (!poll.options.includes(option)) {
            return res.status(400).json({ message: 'Invalid option' });
        }

        // Check if user has already voted
        const existingVote = await PollController.Vote.findOne({ poll: pollId, voter: userId });
        if (existingVote) {
            return res.status(400).json({ message: 'You have already voted on this poll' });
        }

        const vote = new PollController.Vote({ poll: pollId, option, voter: userId });
        await vote.save();

        // Update poll votes
        poll.votes.push({ option, voter: userId });
        await poll.save();

        res.status(200).json({ message: 'Vote recorded' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get all liked polls
exports.getLikedPolls = async (req, res) => {
    try {
        const likedPolls = await PollController.Poll.find({ likes: req.user._id });
        res.status(200).json(likedPolls);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
