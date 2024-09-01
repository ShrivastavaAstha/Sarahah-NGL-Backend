const express = require("express");
const app = express();
const path = require("path");

const messagemodel = require("./models/message");
const { connectDatabase } = require("./connection/connect");
app.use(express.json());

app.post("/api/addmessage", async (req, res) => {
  try {
    const object = {
      title: req.body.title,
      message: req.body.message,
    };
    console.log(object);
    const messagedata = new messagemodel(object);
    await messagedata.save();
    return res
      .status(200)
      .json({ success: true, message: "message sent successfully!" });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

app.get("/api/getmessage", async (req, res) => {
  try {
    const message = await messagemodel.find();
    return res.status(200).json({ success: true, message: message });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
connectDatabase();

app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname + "/client/build/index.html"),
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );
});

app.listen(PORT, async () => {
  await console.log(`Server is running at PORT ${PORT}`);
});
