const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");  
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts"); 
const convoRoute = require("./routes/conversiation");
const messageRoute = require("./routes/message");
const multer = require("multer");
const path = require("path");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) 
  .then(() => console.log("connected")) 
  .catch((e) => console.log(e));



app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage:storage });
app.post("/api/upload", upload.single("file"), (req, resp) => {
  try {
    return resp.status(200).json("file uploaded sucessfully");
  } catch (err) {
    console.log(err);
  }
});

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversiation", convoRoute)
app.use("/api/message", messageRoute)


app.listen(8000, () => {
  console.log("server is up");
});
