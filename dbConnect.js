var mysql = require('mysql');
const morgan = require('morgan');
var flash = require('connect-flash');
const { Prohairesis } = require('prohairesis');
const bodyParser = require('body-parser');
const LIFETIME = 60 * 60 * 1000;
const {
    PORT = 3000,
        NODE_ENV = 'development',
        SESS_NAME = 'sid',
        SESS_SECRET = 'secret',
        SESS_LIFETIME = LIFETIME,
} = process.env;
const IN_PROD = NODE_ENV === 'production';

var express = require('express');
var app = express();
const port = process.env.PORT || 8080;

app
    .use(morgan('dev'))
    .use(express.static('public'))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(flash())
    .listen(port, () => console.log(`Server lisyening on port ${port}`));

var con = mysql.createConnection({
    host: "LOCALHOST",
    user: "admin",
    password: "PASSWORD",
    database: "tasker"
});

const session = require('express-session');
app.use(
    session({
        name: SESS_NAME,
        resave: false,
        saveUninitialized: false,
        secret: SESS_SECRET,
        cookie: {
            maxAge: SESS_LIFETIME,
            sameSite: true,
            secure: IN_PROD,
        },
    })
);

app.use('/assets', express.static(__dirname + '/public/css'));
app.use('/dist', express.static(__dirname + '/public/dist'));
app.use('/fonts', express.static(__dirname + '/public/fonts'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/vendor', express.static(__dirname + '/public/vendor'));

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get("/", function(req, response) {
    let session = req.session;
    let title = 'Поставленные мне задачи';
    let message = req.flash('info');
    if (session.username != null) {
        con.query(`SELECT * FROM users WHERE Login = "${session.username}" or Email = "${session.username}"`, function(err, rows) {
            if (err) {
                return console.log(err);
            }
            if (rows !== null) {
                response.locals.user = rows;
                const { user } = response.locals;
                let { tasksForUser } = '';
                let { user_auth } = '';
                let { allusers } = '';
                user_auth = response.locals.user;
                con.query(`SELECT * FROM Tasks INNER JOIN users on ID = VidalUser_ID WHERE PoluchilUser_ID="${user[0].ID}" AND Date_Vipolnenia IS NULL`, function(errs, rowss) {
                    if (errs) {
                        return console.log(errs);
                    }
                    if (rowss !== null) {
                        tasksForUser = rowss;
                        con.query(`SELECT * FROM users`, function(errss, alluserss) {
                            if (errss) {
                                return console.log(errss);
                            }
                            if (rowss !== null) {
                                allusers = alluserss;
                                response.render("mainpage.ejs", { user: user, tasksForUser: tasksForUser, title: title, user_auth: user_auth, message: message, allusers: allusers });
                            } else {
                                response.render("mainpage.ejs", { user: user, tasksForUser: tasksForUser, title: title, user_auth: user_auth, message: message, allusers: allusers });
                            }

                        });
                    } else {
                        response.render("mainpage.ejs", { user: user, tasksForUser: tasksForUser, title: title, user_auth: user_auth, message: message, allusers: allusers });
                    }

                });
            }
        });
    } else {
        response.render('index.ejs', { message: message });
    }
});

app.get("/edittask/:id", function(req, response) {
    let session = req.session;
    //${req.params.id}
    let title = 'Поставленные мне задачи';
    let message = req.flash('info');
    if (session.username != null) {
        con.query(`SELECT * FROM users WHERE Login = "${session.username}" or Email = "${session.username}"`, function(err, rows) {
            if (err) {
                return console.log(err);
            }
            if (rows !== null) {
                response.locals.user = rows;
                const { user } = response.locals;
                let { tasksForUser } = '';
                let { user_auth } = '';
                let { allusers } = '';
                user_auth = response.locals.user;
                con.query(`SELECT * FROM Tasks INNER JOIN users on ID = VidalUser_ID WHERE ID_Task = '${req.params.id}'`, function(errs, rowss) {
                    if (errs) {
                        return console.log(errs);
                    }
                    if (rowss !== null && rowss[0].ID == user_auth[0].ID) {
                        tasksForUser = rowss;
                        con.query(`SELECT * FROM users`, function(errss, alluserss) {
                            if (errss) {
                                return console.log(errss);
                            }
                            if (rowss !== null) {
                                allusers = alluserss;
                                let t = (tasksForUser[0].Date_Srok).toLocaleString('ru-RU', { hour12: false });
                                t = String(t).replace(',', '');
                                let k = String(t).indexOf(":", String(t).indexOf(":") + 1);
                                t = String(t).substring(0, k);
                                console.log(tasksForUser);

                                tasksForUser[0].Date_Srok = t;
                                response.render("edittask.ejs", { user: user, tasksForUser: tasksForUser, title: title, user_auth: user_auth, message: message, allusers: allusers });
                            } else {
                                response.render("edittask.ejs", { user: user, tasksForUser: tasksForUser, title: title, user_auth: user_auth, message: message, allusers: allusers });
                            }

                        });
                    } else {
                        response.redirect("/");
                    }
                });
            }
        });
    } else {
        response.redirect("/");
    }
});

app.get("/metasks_done", function(req, response) {
    let session = req.session;
    let title = 'Выполненные мною задачи пользователей';
    let message = req.flash('info');
    if (session.username != null) {
        con.query(`SELECT * FROM users WHERE Login = "${session.username}" or Email = "${session.username}"`, function(err, rows) {
            if (err) {
                return console.log(err);
            }
            if (rows !== null) {
                response.locals.user = rows;
                const { user } = response.locals;
                let { tasksForUser } = '';
                let { user_auth } = '';
                let { allusers } = '';
                user_auth = response.locals.user;
                con.query(`SELECT * FROM Tasks INNER JOIN users on ID = VidalUser_ID WHERE PoluchilUser_ID="${user[0].ID}" AND Date_Vipolnenia IS NOT NULL`, function(errs, rowss) {
                    if (errs) {
                        return console.log(errs);
                    }
                    if (rowss !== null) {
                        tasksForUser = rowss;
                        con.query(`SELECT * FROM users`, function(errss, alluserss) {
                            if (errss) {
                                return console.log(errss);
                            }
                            if (rowss !== null) {
                                allusers = alluserss;
                                response.render("mainpage.ejs", { user: user, tasksForUser: tasksForUser, title: title, user_auth: user_auth, message: message, allusers: allusers });
                            } else {
                                response.render("mainpage.ejs", { user: user, tasksForUser: tasksForUser, title: title, user_auth: user_auth, message: message, allusers: allusers });
                            }

                        });
                    } else {
                        response.render("mainpage.ejs", { user: user, tasksForUser: tasksForUser, title: title, user_auth: user_auth, message: message, allusers: allusers });
                    }
                });
            }
        });
    } else {
        let message = req.flash('info');
        response.render('index.ejs', { message: message });
    }
});

app.get("/frommetasks_done", function(req, response) {
    let session = req.session;
    let title = 'Выполненные мои задачи пользователей';
    let message = req.flash('info');
    if (session.username != null) {
        con.query(`SELECT * FROM users WHERE Login = "${session.username}" or Email = "${session.username}"`, function(err, rows) {
            if (err) {
                return console.log(err);
            }
            if (rows !== null) {
                response.locals.user = rows;
                const { user } = response.locals;
                let { tasksForUser } = '';
                let { user_auth } = '';
                let { allusers } = '';
                user_auth = response.locals.user;
                con.query(`SELECT * FROM Tasks INNER JOIN users on ID = PoluchilUser_ID WHERE VidalUser_ID="${user[0].ID}" AND Date_Vipolnenia IS NOT NULL`, function(errs, rowss) {
                    if (errs) {
                        return console.log(errs);
                    }
                    if (rowss !== null) {
                        tasksForUser = rowss;
                        con.query(`SELECT * FROM users`, function(errss, alluserss) {
                            if (errss) {
                                return console.log(errss);
                            }
                            if (rowss !== null) {
                                allusers = alluserss;
                                response.render("mainpage.ejs", { user: user, tasksForUser: tasksForUser, title: title, user_auth: user_auth, message: message, allusers: allusers });
                            } else {
                                response.render("mainpage.ejs", { user: user, tasksForUser: tasksForUser, title: title, user_auth: user_auth, message: message, allusers: allusers });
                            }

                        });
                    } else {
                        response.render("mainpage.ejs", { user: user, tasksForUser: tasksForUser, title: title, user_auth: user_auth, message: message, allusers: allusers });
                    }

                });
            }
        });
    } else {
        let message = req.flash('info');
        response.render('index.ejs', { message: message });
    }
});

app.get("/metasks_dani", function(req, response) {
    let session = req.session;
    let title = 'Выданные мною задачи пользователям';
    let message = req.flash('info');
    if (session.username != null) {
        con.query(`SELECT * FROM users WHERE Login = "${session.username}" or Email = "${session.username}"`, function(err, rows) {
            if (err) {
                return console.log(err);
            }
            if (rows !== null) {
                response.locals.user = rows;
                const { user } = response.locals;
                let { tasksForUser } = '';
                let { user_auth } = '';
                let { allusers } = '';
                user_auth = response.locals.user;
                con.query(`SELECT * FROM Tasks INNER JOIN users on ID = PoluchilUser_ID WHERE VidalUser_ID="${user[0].ID}" AND Date_Vipolnenia IS NULL`, function(errs, rowss) {
                    if (errs) {
                        return console.log(errs);
                    }
                    if (rowss !== null) {
                        tasksForUser = rowss;
                        con.query(`SELECT * FROM users`, function(errss, alluserss) {
                            if (errss) {
                                return console.log(errss);
                            }
                            if (rowss !== null) {
                                allusers = alluserss;
                                response.render("mainpage.ejs", { user: user, tasksForUser: tasksForUser, title: title, user_auth: user_auth, message: message, allusers: allusers });
                            } else {
                                response.render("mainpage.ejs", { user: user, tasksForUser: tasksForUser, title: title, user_auth: user_auth, message: message, allusers: allusers });
                            }

                        });
                    } else {
                        response.render("mainpage.ejs", { user: user, tasksForUser: tasksForUser, title: title, user_auth: user_auth, message: message, allusers: allusers });
                    }
                });
            }
        });
    } else {
        let message = req.flash('info');
        response.render('index.ejs', { message: message });
    }
});

app.get("/alltasks", function(req, response) {
    let title = "Все задачи";
    let session = req.session;
    let { tasks } = '';
    let { toUser } = '';
    let { user_auth } = '';
    let { allusers } = '';
    if (session.username != null) {
        con.query(`SELECT cm.Login AS Login_Vidal, cm.Familia AS Familia_Vidal, cm.Ima AS Ima_Vidal, cm.Email AS Email_Vidal, bd.Login AS Login_Poluchil, bd.Familia AS Familia_Poluchil, bd.Ima AS Ima_Poluchil, bd.Email AS Email_Poluchil, NameTask, TextTask, Date_Create, Date_Srok, Date_Vipolnenia, ID_Task FROM Tasks INNER JOIN users AS cm ON cm.ID = Tasks.VidalUser_ID INNER JOIN users AS bd ON bd.ID = Tasks.PoluchilUser_ID`, function(err, rows) {
            if (err) {
                return console.log(err);
            }
            if (rows.length != 0) {
                response.locals.tasks = rows;
                tasks = response.locals.tasks;
                con.query(`SELECT * FROM users WHERE Login = "${session.username}" or Email = "${session.username}"`, function(errs, rowss) {
                    if (errs) {
                        return console.log(errs);
                    }
                    if (rowss.length != 0) {
                        response.locals.authuser = rowss;
                        user_auth = response.locals.authuser;
                        con.query(`SELECT * FROM users`, function(errss, alluserss) {
                            if (errss) {
                                return console.log(errss);
                            }
                            if (rowss !== null) {
                                allusers = alluserss;
                                response.render("alltasks.ejs", { tasks: tasks, title: title, user_auth: user_auth, allusers: allusers });
                            } else {
                                response.render("alltasks.ejs", { tasks: tasks, title: title, user_auth: user_auth, allusers: allusers });
                            }
                        });
                    } else {
                        let message = req.flash('info');
                        response.redirect("/");
                    };
                });
            } else {
                let message = req.flash('info');
                response.redirect("/");
            };
        });
    } else {
        let message = req.flash('info');
        response.redirect("/");
    }
});

app.get("/abouttask/:id", function(req, response) {
    let session = req.session;
    let { auth_user } = '';
    let { task } = '';
    let { poluchuser } = '';
    let { allusers } = '';
    if (session.username != null) {
        con.query(`SELECT * FROM Tasks INNER JOIN users on ID = VidalUser_ID WHERE ID_Task="${req.params.id}"`, function(err, rows) {
            if (err) {
                return console.log(err);
            }
            if (rows.length != 0) {
                response.locals.task = rows;
                task = response.locals.task;
                con.query(`SELECT * FROM users WHERE ID="${task[0].PoluchilUser_ID}"`, function(errs, rowss) {
                    if (errs) {
                        return console.log(errs);
                    }
                    if (rowss.length != 0) {
                        response.locals.poluchuser = rowss;
                        poluchuser = response.locals.poluchuser;
                        con.query(`SELECT * FROM users WHERE Login = "${session.username}" or Email = "${session.username}"`, function(serr, srows) {
                            if (serr) {
                                return console.log(err);
                            }
                            if (srows !== null) {
                                auth_user = srows;
                                con.query(`SELECT * FROM users`, function(errss, alluserss) {
                                    if (errss) {
                                        return console.log(errss);
                                    }
                                    if (alluserss !== null) {
                                        allusers = alluserss;
                                        console.log(task);
                                        response.render('abouttask.ejs', {
                                            auth_user: auth_user,
                                            task: task,
                                            poluchuser: poluchuser,
                                            allusers: allusers
                                        });
                                    } else {
                                        let message = req.flash('info');
                                        response.redirect("/");
                                    }
                                });
                            }
                        });
                    } else {
                        let message = req.flash('info');
                        response.redirect("/");
                    };
                });
            } else {
                let message = req.flash('info');
                response.redirect("/");
            };
        });
    } else {
        let message = req.flash('info');
        response.redirect("/");
    }
});

app.get("/removetask/:id", function(req, response) {
    let session = req.session;
    let { id_remove } = '';
    let { remove_task } = '';
    let message = '';
    if (session.username != null) {
        con.query(`SELECT * FROM users WHERE Login = "${session.username}" or Email = "${session.username}"`, function(err, rows) {
            if (err) {
                return console.log(err);
            }
            if (rows.length != 0) {
                id_remove = rows;
                con.query(`SELECT * FROM Tasks WHERE ID_Task="${req.params.id}" AND (PoluchilUser_ID = "${id_remove[0].ID}" or VidalUser_ID = "${id_remove[0].ID}")`, function(errs, rowss) {
                    if (errs) {
                        return console.log(errs);
                    }
                    if (rowss.length != 0) {
                        remove_task = rowss;
                        con.query(`DELETE FROM Tasks WHERE ID_Task="${req.params.id}"`, function(serr, srows) {
                            if (serr) {
                                return console.log(err);
                            }
                            if (srows !== null) {
                                response.redirect("/error3");
                            }
                        });
                    } else {
                        let message = req.flash('info');
                        response.redirect("/");
                    };
                });
            } else {
                let message = req.flash('info');
                response.redirect("/");
            };
        });
    } else {
        let message = req.flash('info');
        response.redirect("/");
    }
});

app.get("/havedone/:id", function(req, response) {
    let session = req.session;
    let { id_remove } = '';
    let { remove_task } = '';
    let message = '';
    if (session.username != null) {
        con.query(`SELECT * FROM users WHERE Login = "${session.username}" or Email = "${session.username}"`, function(err, rows) {
            if (err) {
                return console.log(err);
            }
            if (rows.length != 0) {
                id_remove = rows;
                con.query(`SELECT * FROM Tasks WHERE ID_Task="${req.params.id}" AND (PoluchilUser_ID = "${id_remove[0].ID}" or VidalUser_ID = "${id_remove[0].ID}") AND Date_Vipolnenia IS NULL`, function(errs, rowss) {
                    if (errs) {
                        return console.log(errs);
                    }
                    if (rowss.length != 0) {
                        remove_task = rowss;
                        con.query(`UPDATE Tasks SET Date_Vipolnenia = now() WHERE ID_Task="${req.params.id}"`, function(serr, srows) {
                            if (serr) {
                                return console.log(err);
                            }
                            if (srows !== null) {
                                response.redirect("/error4");
                            }
                        });
                    } else {
                        let message = req.flash('info');
                        response.redirect("/");
                    };
                });
            } else {
                let message = req.flash('info');
                response.redirect("/");
            };
        });
    } else {
        let message = req.flash('info');
        response.redirect("/");
    }
});

app.get('/error1', function(req, res) {
    req.flash('info', 'Ошибка авторизации. Повторите попытку авторизации!');
    res.redirect('/');
});

app.get('/error2', function(req, res) {
    req.flash('info', 'Ошибка регистрации. Возможно логин/email, указанный Вами, уже существует');
    res.redirect('/');
});

app.get('/error3', function(req, res) {
    req.flash('info', 'Задание успешно отменено. Задание было удалено!');
    res.redirect('/');
});

app.get('/error4', function(req, res) {
    req.flash('info', 'Задание успешно отмечено выполненным!');
    res.redirect('/');
});

app.get('/error5', function(req, res) {
    req.flash('info', 'Задание успешно создано!');
    res.redirect('/metasks_dani');
});

app.get('/error6', function(req, res) {
    req.flash('info', 'Задание успешно изменено!');
    res.redirect('/metasks_dani');
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/')
        }
        res.clearCookie(SESS_NAME)
        res.redirect('/')
    })
});

app.post('/api/login', function(request, response) {
    let login = request.body.logines;
    let password = request.body.pass;

    console.log(login + " " + password);

    con.query(`SELECT * FROM users WHERE (Login = "${login}" or Email = "${login}") and Password = "${password}"`, function(err, rows) {
        if (err) {
            return console.log(err);
        }

        if (rows.length > 0) {
            request.session.loggedin = true;
            request.session.username = login;
            response.locals.user = rows;
            const { user } = response.locals;
            response.redirect("/");
        } else {
            response.redirect("/error1");
        };
    });
});

app.post('/api/createtask', function(req, res) {
    let session = req.session;
    let user_whoCreate = '';

    let nameTask = req.body.nameTask;
    let forUser = req.body.users;
    let srok = req.body.dates;
    let textTask = req.body.textTask;

    const date = srok.split(" ");
    const date2 = date[0].split(".");
    const l = date2[2] + "/" + date2[1] + "/" + date2[0];
    srok = l + " " + date[1];

    if (session.username != null) {
        con.query(`SELECT * FROM users WHERE Login = "${session.username}" or Email = "${session.username}"`, function(err, rows) {
            if (err) {
                return console.log(err);
            }
            if (rows !== null) {
                user_whoCreate = rows[0].ID;
                con.query(`INSERT INTO Tasks (VidalUser_ID, PoluchilUser_ID, Date_Create, Date_Srok, NameTask, TextTask) VALUES ("${user_whoCreate}", "${forUser}", now(), "${srok}", "${nameTask}", "${textTask}");`, function(errs, rowss) {
                    if (errs) {
                        return console.log(errs);
                    } else {
                        res.redirect("/error5");
                    }
                });
            }
        });
    } else {
        response.render('index.ejs', { message: message });
    }
});

app.post('/api/edittaskpost', function(req, res) {
    let session = req.session;
    let user_whoCreate = '';
    let id_task = req.body.id_task;

    let nameTask = req.body.nameTask;
    let forUser = req.body.users;
    let srok = req.body.dates;
    let textTask = req.body.textTask;

    const date = srok.split(" ");
    const date2 = date[0].split(".");
    const l = date2[2] + "/" + date2[1] + "/" + date2[0];
    srok = l + " " + date[1];

    if (session.username != null) {
        con.query(`SELECT * FROM users WHERE Login = "${session.username}" or Email = "${session.username}"`, function(err, rows) {
            if (err) {
                return console.log(err);
            }
            if (rows !== null) {
                user_whoCreate = rows[0].ID;
                con.query(`UPDATE Tasks set VidalUser_ID="${user_whoCreate}", PoluchilUser_ID="${forUser}", Date_Srok="${srok}", NameTask="${nameTask}", TextTask="${textTask}" WHERE ID_Task = "${id_task}";`, function(errs, rowss) {
                    if (errs) {
                        return console.log(errs);
                    } else {
                        res.redirect("/error6");
                    }
                });
            }
        });
    } else {
        response.render('index.ejs', { message: message });
    }
});

app.post('/api/user', function(req, res) {
    let login = req.body.login;
    let ima = req.body.ima;
    let fam = req.body.fam;
    let email = req.body.logines;
    let password = req.body.pass;
    console.log(login + " " + ima);
    var sql = `INSERT INTO users (login, ima, familia, email, password) VALUES ("${login}", "${ima}", "${fam}", "${email}", "${password}")`;
    con.query(sql, function(err, result) {
        if (err) {
            res.redirect("/error2");
        } else {
            console.log("1 record inserted");
            res.redirect("/");
        }
    });
});