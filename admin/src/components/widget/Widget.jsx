import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

const Widget = ({ type }) => {
    let data;

    //temporary
    const amount = 100;
    const diff = 20;

    const [allUsers, setUsers] = useState([]);

    const [userStats, setUsersStats] = useState([]);

    const month = useMemo(
        () => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        []
    );

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await axios.get("http://localhost:8800/user/stats", {
                    headers: {
                        token: `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`,
                    },
                });
                const statsList = res.data.sort((a, b) => {
                    return a._id - b._id;
                });
                res.data.map((item) =>
                    setUsersStats((prev) => [...prev, { name: month[item._id - 1], new_user: item.total }])
                );
            } catch (error) {
                console.log(error);
            }
        };

        getStats();
    }, [month]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axios.get("http://localhost:8800/user", {
                    headers: {
                        token: `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`,
                    },
                });
                setUsers(res.data);
                return res;
            } catch (error) {
                console.log(error);
            }
        };

        getUsers();
    }, []);

    const calculatePercent = () => {
        //novi mjesec / stari mjesec (korisnici) * 100 - 100;
        let previousMonth;

        const thisMonth = userStats[userStats.length - 1]?.new_user;

        if (userStats[userStats.length - 2]) {
            previousMonth = userStats[userStats.length - 2]?.new_user;
        } else {
            previousMonth = userStats[userStats.length - 1]?.new_user;
        }

        return parseInt((thisMonth / previousMonth) * 100 - 100);
    };

    switch (type) {
        case "user":
            data = {
                title: "USERS",
                isMoney: false,
                link: "See all users",
                icon: (
                    <PersonOutlinedIcon
                        className="icon"
                        style={{
                            color: "crimson",
                            backgroundColor: "rgba(255, 0, 0, 0.2)",
                        }}
                    />
                ),
            };
            break;
        case "order":
            data = {
                title: "ORDERS",
                isMoney: false,
                link: "View all orders",
                icon: (
                    <ShoppingCartOutlinedIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(218, 165, 32, 0.2)",
                            color: "goldenrod",
                        }}
                    />
                ),
            };
            break;
        case "earning":
            data = {
                title: "EARNINGS",
                isMoney: true,
                link: "View net earnings",
                icon: (
                    <MonetizationOnOutlinedIcon
                        className="icon"
                        style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
                    />
                ),
            };
            break;
        case "balance":
            data = {
                title: "BALANCE",
                isMoney: true,
                link: "See details",
                icon: (
                    <AccountBalanceWalletOutlinedIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(128, 0, 128, 0.2)",
                            color: "purple",
                        }}
                    />
                ),
            };
            break;
        default:
            break;
    }

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">
                    {data.isMoney && "$"} {type === "user" && allUsers.length}
                    {type === "earning" && 0} {type === "balance" && 0}
                    {type === "order" && 0}
                </span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                <div className={`percentage ${calculatePercent() <= 0 ? "negative" : "positive"}`}>
                    <KeyboardArrowUpIcon />
                    {type === "user" && userStats ? calculatePercent() : 0} %
                </div>
                {data.icon}
            </div>
        </div>
    );
};

export default Widget;
