import { Button, notification, Table } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { GetColumnSearchProps } from "../common/Search";

const Suplier = () => {
  const [data, setData] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);
  const [success, setSuccess] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    (async () =>
      await fetch("/api/auth")
        .then((res) => res.json())
        .then((json) => setData(json)))();
    (async () =>
      await fetch("/order")
        .then((res) => res.json())
        .then((json) => setPurchaseData(json)))();
  }, [success]);

  const columns = [
    { title: "Username", dataIndex: "username" },
    { title: "Email", dataIndex: "email", ...GetColumnSearchProps("email") },
    {
      title: "Actions",
      render: (_, record) => (
        <div>
          <Button
            style={{ color: "white", backgroundColor: "red" }}
            onClick={async () => {
              await axios
                .delete(`/api/auth/delete/${record?._id}`)
                .then(() => {
                  notification.success({ message: "Successfully Deleted" });
                  setSuccess(true);
                })
                .catch(() =>
                  notification.error({ message: "Something went wrong!" })
                );
            }}
          >
            DELETE
          </Button>
        </div>
      ),
    },
  ];

  const updateStatus = async (id) => {
    await axios
      .put(`/order/status/${id}`, { dStatus: "ACCEPTED" })
      .then(() => {
        notification.success({ message: "Accepeted!" });
        setSuccess(true);
      })
      .catch(() => notification.error({ message: "Something went wrong!" }));
    setTimeout(() => {
      setSuccess(false);
    }, [100]);
  };

  const purchaseColumns = [
    {
      title: "Name",
      dataIndex: "name",
      ...GetColumnSearchProps("name"),
    },
    {
      title: "Supplier Company",
      dataIndex: "nameOfSupplier",
    },
    {
      title: "Contact Person",
      dataIndex: "contactPerson",
    },
    {
      title: "Contact Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Contact Email",
      dataIndex: "supEmail",
    },
    {
      title: "Purchased Date",
      dataIndex: "date",
      render: (_, record) => (
        <div>{moment(record?.date).format("DD MMM YYYY")}</div>
      ),
    },
    {
      title: "Delivery Status",
      dataIndex: "dStatus",
      render: (_, record) => (
        <div>
          {record?.dStatus ? (
            "ACCEPTED"
          ) : (
            <Button
              style={{ color: "white", backgroundColor: "green" }}
              onClick={() => updateStatus(record?._id)}
            >
              ACCEPT
            </Button>
          )}
        </div>
      ),
    },
  ];
  return (
    <div>
      <Button onClick={() => setVisible(!visible)}>
        {visible ? "Collapse" : "Display Purchased Order"}
      </Button>{" "}
      <br /> <br />
      {visible && <Table dataSource={purchaseData} columns={purchaseColumns} />}
      <br />
      <Table
        dataSource={data.filter((val) => val?.type === "supplier")}
        columns={columns}
      />
    </div>
  );
};

export default Suplier;
