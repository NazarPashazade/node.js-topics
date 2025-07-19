import express from "express";
import cluster from "cluster";
import os from "os";

const port = 3000;
const app = express();

app.get("/intensive", (req, res) => {
  let total = 0;
  for (let i = 0; i < 5_000_000; i++) {
    total++;
  }
  res.send(`Handled by process ${process.pid}`);
  cluster.worker.kill();
});

const cpusCount = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < cpusCount; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  app.listen(port, () => {
    console.log(`Server ${process.pid} listening on port ${port}`);
  });
}
