const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//create a post
router.post("/", async (req, resp) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    resp.status(200).json(savedPost);
  } catch (err) {
    resp.status(500).json(err);
  }
});
//update a post

router.put("/:id", async (req, resp) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      resp.status(200).json("post updated");
    } else {
      resp.status(403).json("you can update only your post");
    }
  } catch (err) {
    resp.status(500).json(err);
  }
});

//delete a post

router.delete("/:id", async (req, resp) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      resp.status(200).json("post deleted");
    } else {
      resp.status(403).json("you can delete only your post");
    }
  } catch (err) {
    resp.status(500).json(err);
  }
});
//like a post

router.put("/:id/like", async (req, resp) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      resp.status(200).json("post liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      resp.status(200).json("post disliked");
    }
  } catch (err) {
    resp.status(500).json(err);
  }
});
//get a post

router.get("/:id", async (req, resp) => {
  try {
    const post = await Post.findById(req.params.id);
    resp.status(200).json(post);
  } catch (err) {
    resp.status(500).json(err);
  }
});
//get timeline posts

router.get("/timeline/:userId", async (req, resp) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    resp.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    resp.status(500).json(err);
  }
});

//get users posts
router.get("/profile/:username", async (req, resp) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    resp.status(200).json(posts);
  } catch (err) {
    resp.status(500).json(err);
  }
});

module.exports = router;
