import cors from "cors";
import express from "express";
import { routes } from "./src/routes";

const app = express();

app.use(routes);

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  return res.json({ message: "Server running correctly, Don't Worry!" });
});

const POST = 8009;
app.listen(POST, () => {
  try {
    console.log(`⚡ HTTP Server running on PORT ${POST}`);
  } catch (err) {
    console.log(err);
  }
});
