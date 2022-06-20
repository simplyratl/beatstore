import "./chart.scss";
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, YAxis } from "recharts";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const data = [
    { name: "January", Total: 1200 },
    { name: "February", Total: 2100 },
    { name: "March", Total: 800 },
    { name: "April", Total: 1600 },
    { name: "May", Total: 900 },
    { name: "June", Total: 1700 },
];

const Chart = ({ aspect, title }) => {
    const [userStats, setUsersStats] = useState([]);

    const month = useMemo(
        () => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        []
    );

    useEffect(() => {
        const getStats = async () => {
            try {
                //192.168.1.18 ---- replace for testing on devices.
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

    return (
        <div className="chart">
            <div className="title">{title}</div>
            <ResponsiveContainer width="100%" aspect={aspect}>
                <AreaChart
                    width={730}
                    height={100}
                    data={userStats}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="new_user" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="gray" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="new_user"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#new_user)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
