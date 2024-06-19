import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFoundRoute from "./app/middlewares/notFoundRoute";
import router from "./app/routes";
import catchAsync from "./app/utils/catchAsync";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use(`/api`, router);

app.get("/", (req: Request, res: Response) => {
    res.send(`Wellcome to Assignment_3😎`);
});

// Global Error Handler.
app.use(globalErrorHandler);

// Not Found Router.
app.use(notFoundRoute);

export default app;
