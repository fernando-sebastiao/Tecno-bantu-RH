import express from "express";
const app = express();

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
