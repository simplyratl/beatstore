import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const List = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const getTransactionDetails = async () => {
            try {
                const res = await axios.get("https://elegant-mandarine-91231.herokuapp.com/transaction/", {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    },
                });

                setTransactions(
                    res.data
                        .sort((a, b) => {
                            return new Date(b.createdAt) - new Date(a.createdAt);
                        })
                        .splice(0, 10)
                );

                return res;
            } catch (error) {
                console.log(error);
            }
        };

        getTransactionDetails();
    }, []);

    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell">Tracking ID</TableCell>
                        <TableCell className="tableCell">Customer</TableCell>
                        <TableCell className="tableCell">Date</TableCell>
                        <TableCell className="tableCell">Amount</TableCell>
                        <TableCell className="tableCell">Payment Method</TableCell>
                        <TableCell className="tableCell">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((transaction, index) => (
                        <TableRow key={index}>
                            <TableCell className="tableCell">{transaction.trackingID}</TableCell>
                            <TableCell className="tableCell">{transaction.customerName}</TableCell>
                            <TableCell className="tableCell">
                                {new Date(transaction.createdAt).toUTCString()}
                            </TableCell>
                            <TableCell className="tableCell">{transaction.price}</TableCell>
                            <TableCell className="tableCell">{transaction.paymentMethod}</TableCell>
                            <TableCell className="tableCell">
                                <span className={`status ${transaction.status}`}>{transaction.status}</span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default List;
