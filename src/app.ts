import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFoundRoute from "./app/middlewares/notFoundRoute";
import router from "./app/routes";
import cookieParser from "cookie-parser";


const app: Application = express();

app.use(express.json());

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://api.imgbb.com/1/upload',
    'https://athloblitz.vercel.app',
  ],
  credentials: true,
  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'OPTIONS',
    'PATCH',
    'HEAD',
    'TRACE'
  ],
}));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views/Confirmation.html');

app.use(`/api`, router);

app.get("/", (req: Request, res: Response) => {
  res.send(`Wellcome to Athlo_BitZ 😎`);
});

// Global Error Handler.
app.use(globalErrorHandler);

// Not Found Router.
app.use(notFoundRoute);

export default app;
