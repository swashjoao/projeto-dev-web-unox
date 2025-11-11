import express from "express";
import session from "express-session";
import cors from 'cors';
import { routes } from "./routes/index.js";

const app = express();

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use(express.static('../frontend'));

app.use(session({
    name: "session.id",
    secret: "chaveSecreta",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 10,
        httpOnly: false,
        secure: false,
        sameSite: "lax"
    }
}));

app.use(routes);

export { app };
