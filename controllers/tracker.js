const { v4: uuidv4 } = require('uuid');
const sha256 = require("js-sha256");
let salt = sha256("I am awesome");

module.exports = (db) => {

    let main = (req, res) => {
        let values = [req.params.user]

        if (req.cookies.username === req.params.user && req.cookies.loggedIn === `${sha256(req.cookies.username)}-${salt}`) {
            db.tracker.showAll(values, (err, result) => {
                if (err) {
                    console.log("-- Error in main controller", err.message);
                } else {
                    result.username = req.params.user;
                    res.render("tracker/main", result)
                }
            });
        } else {
            res.redirect("/");
        }
    }

    let postExpense = (req, res) => {
        let returnInfo = req.body;
        let user = [req.params.user];
        let date = returnInfo.date;
        let type = returnInfo.type;
        let amount = returnInfo.amount;
        let description = returnInfo.description || "-";
        let uuid = uuidv4()
        let values = [date, type, amount, description, uuid];

        db.tracker.addExpense(values, user, (err, result) => {
            if (err) {
                console.log("-- Error in postExpense controller", err.message);
            } else {
                if (result === true) {
                    res.redirect(`/tracker/${req.params.user}`)
                }
            }
        })
    }

    let putExpense = (req, res) => {
        let returnInfo = req.body;
        let date = returnInfo.date;
        let type = returnInfo.type;
        let amount = returnInfo.amount;
        let description = returnInfo.description;
        let uuid = returnInfo.uuid;
        let values = [date, type, amount, description, uuid];
        console.log(values);

        db.tracker.editExpense(values, (err, result) => {
            if (err) {
                console.log("-- Error in deleteExpense controller", err.message)
            } else {
                if (result === true) {
                    res.redirect(`/tracker/${req.params.user}`)
                }
            }
        })
    }

    let deleteExpense = (req, res) => {
        let values = [req.body.uuid];

        db.tracker.removeExpense(values, (err, result) => {
            if (err) {
                console.log("-- Error in deleteExpense controller", err.message)
            } else {
                if (result === true) {
                    res.redirect(`/tracker/${req.params.user}`)
                }
            }
        })

    }

    let getSingle = (req, res) => {
        let values = [req.params.user]
        let index = parseInt(req.params.id) - 1;

        if (req.cookies.username === req.params.user && req.cookies.loggedIn === `${sha256(req.cookies.username)}-${salt}`) {
            db.tracker.showAll(values, (err, result) => {
                if (err) {
                    console.log("-- Error in main controller", err.message);
                } else {
                    result.index = index;
                    res.render("tracker/single", result)
                }
            });
        } else {
            res.redirect(`/tracker/${req.params.user}`);
        }
    }

    let logout = (req, res) => {
        res.clearCookie("username");
        res.clearCookie("loggedIn");
        res.redirect("/")
    }

    let getFilter = (req, res) => {

        let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        let values = [req.params.user, req.body.month];

        if (req.cookies.username === req.params.user && req.cookies.loggedIn === `${sha256(req.cookies.username)}-${salt}`) {
            db.tracker.filterMonth(values, (err, result) => {
                if (err) {
                    console.log("-- Error in getFilter controller", err.message);
                } else {
                    result.month = months[parseInt(req.body.month) - 1];
                    res.render("tracker/filter", result)
                }
            })
        }

    }


    return {
        main,
        postExpense,
        putExpense,
        deleteExpense,
        getSingle,
        logout,
        getFilter
    }

}