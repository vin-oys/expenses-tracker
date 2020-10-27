const sha256 = require("js-sha256");
let salt = sha256("I am awesome");

module.exports = (db) => {
  let welcome = (req, res) => {
    if (!req.cookies.loggedIn) {
      res.render("users/homepage");
    } else {
      if (req.cookies.loggedIn === `${sha256(req.cookies.username)}-${salt}`) {
        res.redirect(`tracker/${req.cookies.username}`)
      }
    }
  };

  let loginPage = (req, res) => {
    res.render("users/login");
  };

  let login = (req, res) => {
    let { username, password } = req.body;
    password = sha256(password);

    db.users.userLogin(username, password, (err, result) => {
      if (err) {
        console.log("-- Error in login controller", err.message);
      } else {
        if (result === false) {
          res.render("users/login", { message: "User not exist! Please try again" })
        } else if (result === "wrong password") {
          res.render("users/login", { message: "Wrong Password!" })
        } else {
          res.cookie("username", result.username);
          res.cookie("loggedIn", `${sha256(result.username)}-${salt}`);
          res.redirect(`tracker/${result.username}`);
        }
      }
    });
  };

  let getSignup = (req, res) => {
    res.render("users/signup");
  };

  let postSignup = (req, res) => {
    let { username, password } = req.body;
    password = sha256(password);

    db.users.register(username, password, (err, result) => {
      if (err) {
        console.log("-- Error in postSignup controller", err.message);
      } else {
        if (result === "user exist") {
          res.render("users/signup", { message: "Username has been taken!" })
        } else {
          res.cookie("username", result.username);
          res.cookie("loggedIn", `${sha256(result.username)}-${salt}`);
          res.redirect(`tracker/${result.username}`);
        }
      }
    });
  };

  return {
    welcome,
    loginPage,
    login,
    getSignup,
    postSignup,
  };
};
