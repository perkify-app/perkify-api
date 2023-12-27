const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwtCookieAuth = require("./middleware/jwtCookieAuth");
const requireAuth = require("./middleware/requireAuth")
const { signUp, signIn, signOut, setRoles } = require("./api/controllers/auth-controller");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(jwtCookieAuth(true));


app.get("/auth/signup", signUp);
app.get("/auth/login", signIn);

app.get("/auth/logout", requireAuth(), signOut);
app.patch("/auth/roles", requireAuth(), setRoles);
//app.get("/auth/refreshToken", logIn);

app.get("/api", requireAuth(), (req, res) => {
    res.status(200).send(req.user);
});

app.get("/api/merchant", requireAuth("merchant"), (req, res) => {
    res.status(200).send(req.user);
});

module.exports = app;