import { Router } from "express";

import path from "path";

const authWebRouter = new Router();

authWebRouter.get("/", (req, res) => {
  res.sendFile("login.html", { root: __dirname });
});

authWebRouter.get("/login", (req, res) => {});

authWebRouter.get("/logout", (req, res) => {});

authWebRouter.post("/login", (req, res) => {});

export default authWebRouter;
