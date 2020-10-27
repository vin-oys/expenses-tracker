const { useReducer } = require("react");

module.exports = (app, allModels) => {
  const usersControllerCallbacks = require("./controllers/users")(allModels);
  const trackerControllerCallbacks = require("./controllers/tracker")(allModels);

  app.get("/", usersControllerCallbacks.welcome);
  app.get("/login", usersControllerCallbacks.loginPage);
  app.post("/login", usersControllerCallbacks.login);
  app.get("/signup", usersControllerCallbacks.getSignup);
  app.post("/signup", usersControllerCallbacks.postSignup);

  app.get("/tracker/:user", trackerControllerCallbacks.main);
  app.post("/tracker/:user", trackerControllerCallbacks.postExpense);
  app.post("/tracker/filter/:user", trackerControllerCallbacks.getFilter);
  app.get("/tracker/:user/:id", trackerControllerCallbacks.getSingle);
  app.put("/tracker/:user/:id", trackerControllerCallbacks.putExpense);
  app.delete("/tracker/:user/:id", trackerControllerCallbacks.deleteExpense);

  app.get("/logout", trackerControllerCallbacks.logout);

};
