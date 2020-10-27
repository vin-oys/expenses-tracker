const React = require("react");
const moment = require("moment");

class Single extends React.Component {
    render() {
        let index = this.props.index;
        let info = this.props.rows[index];

        let date = moment(info.date).format().substr(0, 10);

        return (
            <html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
                    <title>Expenses Tracker</title>
                </head>
                <body>
                    <div className="container text-center">
                        <div className="scroll overflow-auto" style={{ maxHeight: "250px" }}>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{date}</td>
                                        <td>{info.type}</td>
                                        <td>{info.amount}</td>
                                        <td>{info.description}</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>

                        <div>
                            <form method="POST" action={`/tracker/${info.username}/${index + 1}?_method=PUT`}>
                                <div className="form-group row">
                                    <label htmlFor="inputType" className="col-sm-2 col-form-label">Type</label>
                                    <div className="col-sm-10">
                                        <select className="form-control" name="type" >
                                            <option value="expense">Expense</option>
                                            <option value="income">Income</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputAmount" className="col-sm-2 col-form-label">Amount</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" type="text" name="amount" required />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputDate" className="col-sm-2 col-form-label">Date</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" type="date" name="date" defaultValue={`${date}`} required />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputDescription" className="col-sm-2 col-form-label">Description</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" type="text" name="description" />
                                    </div>
                                </div>
                                <input type="hidden" name="uuid" value={`${info.uuid}`} />
                                <div className="form-group row">
                                    <div className="col-sm-10 offset-sm-2">
                                        <button className="btn btn-primary btn-block" type="submit">Edit</button>
                                    </div>
                                </div>
                            </form>
                            <form method="POST" action={`/tracker/${info.username}/${index + 1}?_method=DELETE`}>
                                <input type="hidden" name="uuid" value={`${info.uuid}`} />
                                <div className="form-group row">
                                    <div className="col-sm-10 offset-sm-2">
                                        <button className="btn btn-danger btn-block" type="submit">Delete</button>
                                    </div>
                                </div>
                            </form>
                            <form method="GET" action={`/tracker/${info.username}`}>
                                <div className="form-group row">
                                    <div className="col-sm-10 offset-sm-2">
                                        <button className="btn btn-secondary btn-block" type="submit">Back</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </body>
            </html>

        )
    }
}

module.exports = Single;