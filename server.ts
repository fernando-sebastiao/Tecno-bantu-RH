import cors from "cors";
import express from "express";
import { router } from "./src/routes";

const app = express();

app.use(router);

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  return res.json({ message: "Server running correctly, Don't Worry!" });
});

const PORT = 8009;
app.listen(PORT, () => {
  try {
    console.log(`⚡ HTTP Server running on PORT ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});
