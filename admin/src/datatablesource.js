export const userColumns = [
    { field: "_id", headerName: "ID", width: 70 },
    {
        field: "user",
        headerName: "User",
        width: 230,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.profilePic} alt="avatar" />
                    {params.row.username}
                </div>
            );
        },
    },
    {
        field: "email",
        headerName: "Email",
        width: 230,
    },
];

export const beatColumns = [
    { field: "_id", headerName: "ID", width: 70 },
    {
        field: "Beat",
        headerName: "Beat",
        width: 230,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.img} alt="avatar" />
                    {params.row.title}
                </div>
            );
        },
    },
    {
        field: "bpm",
        headerName: "BPM",
        width: 140,
    },
    {
        field: "key",
        headerName: "Key",
        width: 140,
    },
    {
        field: "basic_licence",
        headerName: "Price",
        width: 140,
    },
];
