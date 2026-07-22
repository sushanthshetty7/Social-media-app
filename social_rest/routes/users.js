const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Update user
router.put("/:id", async (req, resp) => {
  if (req.body.userId === req.params.id || req.body.IsAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return resp.status(500).json(err);
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });

      resp.status(200).json(user);
    } catch (err) {
      return resp.status(500).json(err);
    }
  } else {
    return resp.status(403).json("You can update only your account");
  }
});

// Delete user
router.delete("/:id", async (req, resp) => {
  if (req.body.userId === req.params.id || req.body.IsAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      resp.status(200).json("Account deleted successfully");
    } catch (err) {
      return resp.status(500).json(err);
    }
  } else {
    return resp.status(403).json("You can delete only your account");
  }
});

// =======================
// SEARCH USERS
// GET /api/user/search?query=su
// =======================
router.get("/search", async (req, res) => {
  const query = req.query.query;

  try {
    if (!query) {
      return res.status(200).json([]);
    }

    const users = await User.find({
      username: {
        $regex: query,
        $options: "i",
      },
    }).select("username profilePicture");

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;

    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get user by username or ID
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username });

    const { password, updatedAt, ...other } = user._doc;

    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get friends
router.get("/friends/:userId", async (req, resp) => {
  try {
    const user = await User.findById(req.params.userId);

    const friends = await Promise.all(
      user.followings.map((friendId) => User.findById(friendId))
    );

    const friendList = friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      return { _id, username, profilePicture };
    });

    resp.status(200).json(friendList);
  } catch (err) {
    resp.status(500).json(err);
  }
});

// Follow user
router.put("/:id/follow", async (req, resp) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({
          $push: { followers: req.body.userId },
        });

        await currentUser.updateOne({
          $push: { followings: req.params.id },
        });

        resp.status(200).json("User followed");
      } else {
        resp.status(403).json("You already follow this user");
      }
    } catch (err) {
      resp.status(500).json(err);
    }
  } else {
    resp.status(403).json("You can't follow yourself");
  }
});

// Unfollow user
router.put("/:id/unfollow", async (req, resp) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({
          $pull: { followers: req.body.userId },
        });

        await currentUser.updateOne({
          $pull: { followings: req.params.id },
        });

        resp.status(200).json("User unfollowed");
      } else {
        resp.status(403).json("You don't follow this user");
      }
    } catch (err) {
      resp.status(500).json(err);
    }
  } else {
    resp.status(403).json("You can't unfollow yourself");
  }
});

module.exports = router;