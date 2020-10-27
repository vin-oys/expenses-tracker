module.exports = (dbPoolInstance) => {

  let userLogin = (enteredUsername, enteredPassword, callback) => {
    let query = `select * from users where username=$1`;
    let values = [enteredUsername];
    dbPoolInstance.query(query, values, (queryErr, queryResult) => {
      if (queryErr) {
        console.log("-- Error in userLogin model", queryErr.message);
      } else {
        if (queryResult.rows.length < 1) {
          callback(null, false);
        } else {
          if (queryResult.rows[0].password !== enteredPassword) {
            callback(null, "wrong password");
          } else {
            callback(null, queryResult.rows[0]);
          }
        }
      }
    });
  };

  let register = (username, password, callback) => {
    let query = `select * from users where username=$1`;
    let value = [username];

    dbPoolInstance.query(query, value, (queryErr, queryResult) => {
      if (queryErr) {
        console.log("-- Error in register model first layer", queryErr.message)
      } else {
        if (queryResult.rows.length > 0) {
          callback(null, "user exist")
        } else {
          let values = [username, password];
          let query = `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`;

          dbPoolInstance.query(query, values, (queryErr, queryResult) => {
            if (queryErr) {
              console.log("-- Error in register model", queryErr.message);
            } else {
              callback(null, queryResult.rows[0]);
            }
          });
        }
      }
    })

  };

  return {
    userLogin,
    register,
  };
};
