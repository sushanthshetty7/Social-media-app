const router = require("express").Router();
const Message = require("../models/Message");

//add
router.post("/", async (req, resp) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    resp.status(200).json(savedMessage);
  } catch (err) {
    resp.status(500).json(err);
  }
});

//get

router.get("/:convoId",async(req,resp)=>{
    try{
        const messages = await Message.find({
            convoId: req.params.convoId
        })
        resp.status(200).json(messages)

    }catch(err){
        resp.status(500).json(err)
    }
})

module.exports = router;
