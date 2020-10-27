const React = require("react");

class Login extends React.Component {
  render() {

    let message = this.props.message;

    return (
      <html>
        <head>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
          <title>Expenses Tracker</title>
        </head>
        <body>
          <div className="container m-5 shadow-lg p-3 mb-5 bg-white rounded">
            <div>
              <h3>Login to Expense Tracker</h3>
            </div>

            <div>
              <form method="POST" action="/login">
                <div className="form-group row">
                  <label htmlFor="inputUsername" className="col-sm-2 col-form-label">Username</label>
                  <div className="col-sm-10">
                    <input type="text" name="username" required />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                  <div className="col-sm-10">
                    <input type="password" name="password" required />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-10 offset-sm-2">
                    <button className="btn btn-primary" type="submit">Sign in</button>
                  </div>
                </div>

                <div className="form-group">
                  <div>
                    <a href="/signup">Create an Account</a>
                  </div>
                  <div>
                    <a href="/">Homepage</a>
                  </div>
                </div>
              </form>
            </div>

            <br />
            <div>
              <p className="text-danger">{message}</p>
            </div>
          </div>


        </body>
      </html>
    );
  }
}

module.exports = Login;
