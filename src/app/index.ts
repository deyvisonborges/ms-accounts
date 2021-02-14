import Express from "express";
import { json } from "body-parser";
import Helmet from "helmet";
import routes from "../routes";

const app = Express();
app.use(Helmet());
app.use(json());
app.use(routes);

export default app;
