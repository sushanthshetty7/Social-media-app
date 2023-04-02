const router = require("express").Router();
const Conversition = require("../models/Coversiation");

//new conversiation

router.post("/", async (req, resp) => {
  const newConvo = new Conversition({
    members: [req.body.senderId, req.body.reciverId],
  });

  try {
    const savedConvo = await newConvo.save();
    resp.status(200).json(savedConvo);
  } catch (err) {
    resp.status(500).json(err);
  }
});

//get convo of a user

router.get("/:userId", async (req, resp) => {
  try {
    const convo = await Conversition.find({
      members: { $in: [req.params.userId] },
    });
    resp.status(200).json(convo);
  } catch (err) {
    resp.status(500).json(err);
  }
});

//get convo includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, resp) => {
  try {
    const conversiation = await Conversition.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    resp.status(200).json(conversiation);
  } catch (err) {
    resp.status(500).json(err);
  }
});

module.exports = router;
