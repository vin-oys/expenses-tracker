const React = require("react");
const moment = require("moment");

class Filter extends React.Component {
    render() {
        let month = this.props.month;
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
                <td>{index + 1}</td>
                <td>{date}</td>
                <td>{info.type}</td>
                <td>{info.amount}</td>
                <td>{info.description}</td>
            </tr>
        })

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
                    <title>Expenses Tracker</title>
                </head>
                <body>
                    <div className="container text-center">
                        <h3 style={{ color: "navy" }}>{month}</h3>

                        <div className="scroll overflow-auto" style={{ maxHeight: "400px" }}>
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
                            <p style={{ fontSize: "20px" }}>Total Income: <span style={{ color: "darkgreen", fontSize: "22px" }}>${totalIncome}</span> </p>
                            <p style={{ fontSize: "20px" }}> Total Expense: <span style={{ color: "maroon", fontSize: "22px" }}>${totalExpense}</span></p>
                        </div>

                        <form method="GET" action={`/tracker/${info.username}`}>
                            <div className="form-group row">
                                <div className="col-sm-12">
                                    <button className="btn btn-secondary btn-block" type="submit">Back</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </body>
            </html>

        )
    }
}

module.exports = Filter;