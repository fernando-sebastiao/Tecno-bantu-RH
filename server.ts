import cors from "cors";
import express from "express";

const app = express();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  return res.send("Server Running, Don't worry!");
});

const POST = 8009;
app.listen(POST, () => {
  try {
    console.log(`⚡ HTTP Server running on PORT ${POST}`);
  } catch (err) {
    console.log(err);
  }
});
