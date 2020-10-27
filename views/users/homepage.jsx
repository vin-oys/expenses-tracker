const React = require("react");

class Homepage extends React.Component {
  render() {
    return (
      <html>
        <head>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
          <link rel="stylesheet" href="homepage.css" />
          <title>Expenses Tracker</title>
        </head>
        <body>

          <div className="container text-center col-8 ">
            <h2>Welcome to Expense Tracker</h2>
          </div>

          <div className="container text-center col-8">
            <div className="row">
              <div>
                <form method="GET" action="/login">
                  <button className="btn btn-primary" type="submit">Login</button>
                </form>
              </div>
              <div>
                <form method="GET" action="/signup">
                  <button className="btn btn-primary" type="submit">Sign Up</button>
                </form>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Homepage;
