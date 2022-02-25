import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";

const port = config.get<number>("port");
const host = config.get<string>("host");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, host, async () => {
  logger.info(`Server listening at http://${host}:${port}`);

  await connect();

  routes(app);
});
