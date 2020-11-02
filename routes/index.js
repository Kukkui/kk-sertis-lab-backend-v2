
const express = require('express');
const routes = require('express').Router();
const session = require('express-session');
const db = require('../db/dbconnect');
const generator = require('generate-password');

routes.use(express.json());
routes.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

//*************DEFAULT INDEX WITH SESSION,DB,TABLE CREATE*****//////////////////
routes.get('/', (req, res) => {
    let sess = req.session
    sess.username = "No session set for username"
    sess.password = "No session set for password"
    sess.allposts = "No session set for all posts mock"


    console.log("Connected!");
    db.con.query("CREATE DATABASE IF NOT EXISTS kukkui", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    })
    var sql = "CREATE TABLE IF NOT EXISTS accounts (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
    db.con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table ACCOUNTS created( IF NOT EXISTS )");
    });
    var sql = "CREATE TABLE IF NOT EXISTS blogposts (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255),content LONGTEXT,cardName VARCHAR(255),cardStatus VARCHAR(255),cardContent LONGTEXT,cardCategory VARCHAR(255))";
    db.con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table BLOGPOSTS created ( IF NOT EXISTS )");
    });

    res.status(200).send('Hello Sertis.Corp! My name is Punyawee Pos(KUKKUI)\nTo test a backend service here...\n----------------\nSteps...\n1)Start any DB mysql server(Already provided inside the code)\n2)GET localhost:5000 <= {} \n3)POST localhost:5000/auth  <= {username,password} \n4)GET localhost:5000/session <= {}\n5)POST localhost:5000/api/allPost <= {}\n6)POST localhost:5000/api/myPost <= {}\n7)POST localhost:5000/api/addPost <= {content,cardName,cardstatus,cardContent,cardCategory}\n8)PUT localhost:5000/api/editPost/[id] <= {content,cardName,cardstatus,cardContent,cardCategory}\n9)DELTE localhost:5000/api/deletePost/[id] <= {}\n----------------\n API Lists...\n-> GET localhost:5000/ \n-> GET localhost:5000/session\n-> POST localhost:5000/auth\n-> POST localhost:5000/api/myPost\n-> POST localhost:5000/api/allPost \n-> PUT localhost:5000/api/editPost/[id] \n-> DELTE localhost:5000/api/deletePost/[id]');
})

//*************GET SESSION CHECKED****************************//////////////////
routes.get('/session', (req, res) => {
    let sess = req.session
    console.log(sess)
    res.status(200).send(sess)
})

//*************CHECK ACCOUNT**********************************//////////////////
routes.post('/auth', (req, res) => {

    var password = generator.generate({
        length: 10,
        numbers: true
    });

    var account = req.body.username;
    var password = req.body.password;
    //
    //Now...
    //set session for one time body request
    //
    let sess = req.session
    sess.username = account
    sess.password = password

    db.con.query("SELECT * FROM accounts WHERE username = '" + account + "'", function (err, result, field) {
        if (result.length === 0) {
            var genPassword = generator.generate({
                length: 10,
                numbers: true
            });
            var sql = "INSERT INTO accounts (username, password) VALUES ('" + account + "', '" + genPassword + "')";
            db.con.query(sql, function (err, result) {
                if (err) throw err;
                res.status(200).send("New account name: " + account + " // With password: " + genPassword);
            })
        }
        else {
            const querystring = "SELECT * FROM accounts WHERE username ='" + account + "' AND password='" + password + "'";
            db.con.query(querystring, function (err, result, fields) {
                if (result.length === 0) {
                    console.log("Wrong Password For Username : " + account);
                    res.status(401).send("Wrong Password For Username : " + account) // Please login with your password that we assigned to you at the first time.")
                }
                else {
                    if (err) throw err;
                    var data = JSON.stringify(result[0].username)
                    console.log("Record Exist, Name: " + data);
                    res.status(200).send("Correct Password For Username : " + account + "\n---------\n Now, to view the list of all blogs...\n #Visit the URL:localhost:3000/allBlogs \n without any body requests required\n---------\nTo view only your blog posts...\n#Visit the URL: localhost:3000/myBlogs\nwith require of body requests(username,password)") // Correct
                }
            })
        }
    })

    //Check account exist or add new with random password
    //Activate on url : http://[localhost]:[port]/checkAccount 
});

//*************VIEW PERSONAL BLOGS****************************//////////////////
routes.post('/api/myPost', (req, res) => {

    var password = generator.generate({
        length: 10,
        numbers: true
    });
    //
    //set session for account name and password instead of recieved them again from body request
    //
    let sess = req.session
    var account = sess.username
    var password = sess.password
    db.con.query("SELECT * FROM accounts WHERE username = '" + account + "'", function (err, result, field) {
        if (result.length === 0) {
            //check if username correct or not, if not show error username input
            res.status(401).send("Wrong username input, please try again.")
        }
        else {
            //check if username and password correct for view blogs post or not
            const querystring = "SELECT * FROM accounts WHERE username ='" + account + "' AND password='" + password + "'";
            db.con.query(querystring, function (err, result, fields) {
                if (result.length === 0) {
                    console.log("Wrong Password For Username : " + account);
                    res.status(401).send("Wrong Password For Username : " + account) // Please login with your password that we assigned to you at the first time.")
                }
                else {
                    if (err) throw err;
                    var data = JSON.stringify(result[0].username)
                    // console.log("Record Exist, Name: " + data);
                    // res.send("Correct Password For Username : " + account +"\n---------\n Now, to view the list of all blogs...\n #Visit the URL:localhost:3000/allBlogs \n without any body requests required\n---------\nTo view only your blog posts...\n#Visit the URL: localhost:3000/myBlogs\nwith require of body requests(username,password)") // Correct
                    //
                    //Now fetch DB for blog posts for each account
                    //
                    const querystring = "SELECT * FROM blogposts WHERE username ='" + account + "'";
                    db.con.query(querystring, function (err, result, fields) {
                        if (result.length === 0) {
                            // console.log("Wrong Password For Username : " + account);
                            res.status(204).send("No Blog Posts For Username : " + account) // Please login with your password that we assigned to you at the first time.")
                        }
                        else {
                            if (err) throw err;
                            console.log("Blog post from " + account + " are shown by res.status(200).send")
                            var string = JSON.stringify(result);
                            var json = JSON.parse(string);
                            res.status(200).send(json);
                        }
                    })
                }
            })
        }
    })

});

//*************VIEW PERSONAL BLOGS****************************//////////////////
routes.post('/api/addPost', (req, res) => {

    // var username = req.body.username;
    var content = req.body.content;
    var cardName = req.body.cardName;
    var cardStatus = req.body.cardStatus;
    var cardContent = req.body.cardContent;
    var cardCategory = req.body.cardCategory;

    var content2 = content.replace("'", "''");
    var cardName2 = cardName.replace("'", "''");
    var cardStatus2 = cardStatus.replace("'", "''");
    var cardContent2 = cardContent.replace("'", "''");
    var cardCategory2 = cardCategory.replace("'", "''");
    console.log(cardName2);
    //
    //set session for account name and password instead of recieved them again from body request
    //
    let sess = req.session
    var account = sess.username
    var password = sess.password
    db.con.query("SELECT * FROM accounts WHERE username = '" + account + "'", function (err, result, field) {
        if (result.length === 0) {
            //check if username correct or not, if not show error username input
            res.status(401).send("Wrong username input, please try again.")
        }
        else {
            //check if username and password correct for view blogs post or not
            const querystring = "SELECT * FROM accounts WHERE username ='" + account + "' AND password='" + password + "'";
            db.con.query(querystring, function (err, result, fields) {
                if (result.length === 0) {
                    console.log("Wrong Password For Username : " + account);
                    res.status(401).send("Wrong Password For Username : " + account) // Please login with your password that we assigned to you at the first time.")
                }
                else {
                    console.log("Problem Here");
                    console.log("Already add new post for account name: " + account + " \nWith Content: " + content + "\nWith cardName: " + cardName + "\nWith cardStatus: " + cardStatus + "\nWith cardContent: " + cardContent + "\nWith cardCategory: " + cardCategory);
                    //problem here
                    var sql = "INSERT INTO blogposts (username,content,cardName,cardStatus,cardContent,cardCategory) VALUES ('" + account + "','" + content2 + "','" + cardName2 + "','" + cardStatus2 + "','" + cardContent2 + "','" + cardCategory2 + "')";
                    db.con.query(sql, function (err, result) {
                        if (err) throw err;
                        res.status(200).send("Already add new post for account name: " + account + " \nWith Content: " + content + "\nWith cardName: " + cardName + "\nWith cardStatus: " + cardStatus + "\nWith cardContent: " + cardContent + "\nWith cardCategory: " + cardCategory);
                    })
                }
            })
        }
    })
    //Add new blog card via POST 
    //Activate on url : http://[localhost]:[port]/addCard 
});

//*************VIEW ALL BLOGS POST BY ANYONE******************//////////////////
routes.post('/api/allPost', (req, res) => {


    const querystring = "SELECT * FROM blogposts";
    db.con.query(querystring, function (err, result, fields) {
        if (result.length === 0) {
            // console.log("Wrong Password For Username : " + account);
            res.status(204).send("No Blog Posts") // Please login with your password that we assigned to you at the first time.")
        }
        else {
            if (err) throw err;
            var string = JSON.stringify(result);
            var json = JSON.parse(string);
            console.log("All blog posts shown by res.send")
            let sess = req.session;
            sess.allposts = json;
            res.status(200).send(json);
        }
    })
});

//*************EDIT BLOG POST*********************************//////////////////
routes.put('/api/editPost/:id', (req, res) => {
    var id = req.params.id;
    var content = req.body.content;
    var cardName = req.body.cardName;
    var cardStatus = req.body.cardStatus;
    var cardContent = req.body.cardContent;
    var cardCategory = req.body.cardCategory;

    var content2 = content.replace("'", "''");
    var cardName2 = cardName.replace("'", "''");
    var cardStatus2 = cardStatus.replace("'", "''");
    var cardContent2 = cardContent.replace("'", "''");
    var cardCategory2 = cardCategory.replace("'", "''");

    let sess = req.session
    var account = sess.username
    var password = sess.password

    db.con.query("SELECT * FROM accounts WHERE username = '" + account + "'", function (err, result, field) {
        if (result.length === 0) {
            //check if username correct or not, if not show error username input
            res.status(401).send("Wrong username input, please try again.")
        }
        else {
            //check if username and password correct for view blogs post or not
            const querystring = "SELECT * FROM accounts WHERE username ='" + account + "' AND password='" + password + "'";
            db.con.query(querystring, function (err, result, fields) {
                if (result.length === 0) {
                    console.log("Wrong Password For Username : " + account);
                    res.status(401).send("Wrong Password For Username : " + account) // Please login with your password that we assigned to you at the first time.")
                }
                else {
                    var sql = "UPDATE blogposts SET content = '" + content2 + "',cardName = '" + cardName2 + "',cardStatus = '" + cardStatus2 + "',cardContent = '" + cardContent2 + "',cardCategory = '" + cardCategory2 + "' WHERE id = '" + id + "' AND username = '" + account + "'";
                    db.con.query(sql, function (err, result) {
                        if (err) throw err;
                        res.status(204).send("Edit Process Completed \n!!Note : If you still see the record even you've edited its\nPlease remind that you have edit the post that's not belong to you!");
                    })
                }
            })
        }
    })
});

//*************DELETE PERSONAL BLOGS**************************//////////////////
routes.delete('/api/deletePost/:id', (req, res) => {
    var id = req.params.id;

    let sess = req.session
    var account = sess.username
    var password = sess.password

    db.con.query("SELECT * FROM accounts WHERE username = '" + account + "'", function (err, result, field) {
        if (result.length === 0) {
            //check if username correct or not, if not show error username input
            res.status(401).send("UnAuthorized!! \nplease try again via POST at localhost:[Port]/auth.")
        }
        else {
            //check if username and password correct for delete blogs post or not
            const querystring = "SELECT * FROM accounts WHERE username ='" + account + "' AND password='" + password + "'";
            db.con.query(querystring, function (err, result, fields) {
                if (result.length === 0) {
                    console.log("Wrong Password For Username : " + account);
                    res.status(401).send("Wrong Password For Username : " + account) // Please login with your password that we assigned to you at the first time.")
                }
                else {
                    var sql = "DELETE FROM blogposts WHERE id = '" + id + "' AND username = '" + account + "'";
                    db.con.query(sql, function (err, result) {
                        if (err) throw err;
                        res.status(204).send("Delete Process Completed \n!!Note : If you still see the record even you've deleted its\nPlease remind that you have delete the post that's not belong to you!");
                    })
                }
            })
        }

    })

});

module.exports = routes;