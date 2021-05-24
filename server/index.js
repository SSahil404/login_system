// const http = require("http");
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(
    session({
        resave: true,
        key: "userID",
        secret: "you-don't-know",
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "usersReact",
});

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const address = req.body.address;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }
        db.query(
            `INSERT INTO users (username, email, password, address) VALUES ('${username}','${email}','${hash}','${address}')`,
            (err, result) => {
                console.log(err);
            }
        );
    });
});

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        res.send("We need a token for authenticate you!");
    } else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err) {
                res.json({
                    auth: false,
                    message: "We failed tp authenticate you!",
                });
            } else {
                res.userID = decoded.id;
                next();
            }
        });
    }
};

app.get("/isUserAuth", verifyJWT, (req, res) => {
    res.send("You are Authenticated By JSON Web Tokens!");
});

app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({
            auth: true,
            user: req.session.user,
        });
    } else {
        res.send({
            auth: false,
        });
    }
});
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.send({
        auth: false,
        message: "Logged out Successfully",
    });
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query(`SELECT * FROM users WHERE email= '${email}'`, (err, result) => {
        if (err) {
            res.send({ err: err });
        }

        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (err, response) => {
                if (response) {
                    const id = result[0].sno;
                    const token = jwt.sign({ id }, "jwtSecret", {
                        expiresIn: 300,
                    });

                    req.session.user = result;

                    res.json({
                        auth: true,
                        token: token,
                        result: result,
                    });
                } else {
                    res.send({ auth: false, message: "Wrong email/password combination!" });
                }
            });
        } else {
            res.send({ auth: false, message: "User doesn't exists!" });
        }
    });
});

app.get("/users", (req, res) => {
    db.query("SELECT * FROM `users`", (err, result) => {
        if (err) {
            res.send({ err: err });
        }

        if (result.length > 0) {
            res.send({ userFound: true, result });
        } else {
            res.send({ userFound: false, message: "No user found!" });
        }
    });
});

// app.get("/editUser", (req, res) => {
//     let id;
//     db.query(
//         `SELECT * FROM users WHERE username='${username}' AND email='${email}'`,
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//             } else if (result.length > 0) {
//                 id = result.sno;
//             }
//         }
//     );
// });

app.post("/editUser/:id", (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const address = req.body.address;
    const id = req.params.id;

    db.query(
        `UPDATE users SET username = '${username}', email='${email}', address='${address}' WHERE sno=${id}`,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                res.send(result);
            }
        }
    );
});

app.get("/deleteUser/:id", (req, res) => {
    db.query(`DELETE FROM users WHERE sno=${req.params.id}`, (err, result) => {
        if (err) {
            res.send({ err: err });
        }

        if (result.length > 0) {
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log("server is running");
});
