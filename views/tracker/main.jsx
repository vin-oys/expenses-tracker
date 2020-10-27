const React = require("react");
const moment = require("moment");

class Main extends React.Component {

    render() {
        let user = this.props.username;
        let info = this.props.rows;
        let totalExpense = 0;
        let totalIncome = 0;

        let expenseInfo = info.map((info, index) => {
            info.tempId = index + 1;
            return info
        })

        let show = expenseInfo.map((info, index) => {
            let date = moment(info.date).format().substr(0, 10);

            return <tr key={`${index + 1}`}>
                <td scope="row"><a href={`/tracker/${user}/${info.tempId}`}>{index + 1}</a> </td>
                <td><a href={`/tracker/${user}/${info.tempId}`}>{date}</a></td>
                <td><a href={`/tracker/${user}/${info.tempId}`}>{info.type}</a></td>
                <td><a href={`/tracker/${user}/${info.tempId}`}>{info.amount}</a></td>
                <td><a href={`/tracker/${user}/${info.tempId}`}>{info.description}</a></td>
            </tr>
        })

        let today = moment(new Date()).format().substr(0, 10);

        info.forEach(infos => {
            if (infos.type === "expense") {
                totalExpense += infos.amount
            } else if (infos.type === "income") {
                totalIncome += infos.amount
            }
        })

        return (
            <html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
                    <link rel="stylesheet" href="main.css" />
                    <title>Expenses Tracker</title>
                </head>
                <body>
                    <div className="container text-center">
                        <div>
                            <div>
                                <h2 style={{ color: "navy" }}>Expense Tracker</h2>
                                <h3>Welcome <span style={{ color: "orange" }}>{`${user}`}</span>!</h3>
                            </div>
                            <div>
                                <form method="GET" action={`/logout`}>
                                    <button className="btn btn-outline-danger" type="submit">Log Out</button>
                                </form>
                            </div>
                        </div>

                        <div>
                            <p style={{ fontSize: "20px", marginTop: "5px" }}>Balance: <strong>${totalIncome - totalExpense}</strong></p>
                        </div>

                        <div >
                            <form method="post" action={`/tracker/filter/${user}`} >
                                <label style={{ fontSize: "20px" }}>Filter Expenses by Month:</label>
                                <select className="form-control w-50" name="month" style={{ margin: "5px auto" }}>
                                    <option value="1">Jan</option>
                                    <option value="2">Feb</option>
                                    <option value="3">Mar</option>
                                    <option value="4">Apr</option>
                                    <option value="5">May</option>
                                    <option value="6">Jun</option>
                                    <option value="7">Jul</option>
                                    <option value="8">Aug</option>
                                    <option value="9">Sep</option>
                                    <option value="10">Oct</option>
                                    <option value="11">Nov</option>
                                    <option value="12">Dec</option>
                                </select>
                                <button className="btn btn-info btn-block mt-2 mb-2 w-50" type="submit" style={{ margin: "5px auto" }}>Filter</button>
                            </form>
                        </div>

                        <div className="scroll overflow-auto" style={{ maxHeight: "250px" }}>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {show}
                                </tbody>
                            </table>
                        </div>

                        <div>
                            <p style={{ fontSize: "20px" }}>Add Expenses/Income</p>
                            <form method="POST" action={`/tracker/${user}`}>
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
                                        <input className="form-control" type="date" name="date" defaultValue={`${today}`} required />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputDescription" className="col-sm-2 col-form-label">Description</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" type="text" name="description" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-10 offset-sm-2">
                                        <button className="btn btn-primary btn-block" type="submit">Add</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </body>
            </html >
        );
    }
}

module.exports = Main;