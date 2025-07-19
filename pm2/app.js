import express from "express";

const port = 3000;
const app = express();

app.get("/intensive", (req, res) => {
  let total = 0;
  for (let i = 0; i < 5_000_000; i++) {
    total++;
  }
  console.log(`Handled BY ${process.pid}`);
  res.send(`Handled by process ${process.pid}`);
});

app.listen(port, () => {
  console.log(`Server ${process.pid} listening on port ${port}`);
});
