import { Button, message, Modal, notification, Table } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { GetColumnSearchProps } from "../common/Search";

const AllocateBudget = () => {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState(null);
  const [id, setId] = useState(null);
  const [success, setSuccess] = useState(false);
  const [budget, setBudget] = useState(null);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      ...GetColumnSearchProps("name"),
    },
    {
      title: "Unit",
      dataIndex: "unit",
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
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
      title: "Supplier Budget(Rs.)",
      dataIndex: "sBudget",
    },
    {
      title: "Company Budget(Rs.)",
      dataIndex: "mBudget",
      render: (_, record) => (
        <div>
          {record.mBudget ? (
            record.mBudget
          ) : (
            <input
              placeholder="Enter Budget"
              onChange={(e) => setBudget(e.target.value)}
            />
          )}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "status",
      render: (_, record) => (
        <div>
          <span>
            <div>
              <Button onClick={() => onSubmit(record._id)}>Submit</Button>
            </div>
          </span>
        </div>
      ),
    },
  ];

  const onSubmit = async (id) => {
    await axios
      .put(`/order/mbudget/${id}`, {
        mBudget: budget,
      })
      .then(() => {
        notification.success({ message: "Operation Succeded." });
        setSuccess(true);
        setVisible(false);
      })
      .catch(() => notification.error({ message: "Something went wrong!." }));
  };

  useEffect(() => {
    (async () => axios.get("/order").then((res) => setData(res.data)))();
  }, [success]);
  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        size={data?.length}
        scroll={{ x: "max-content" }}
      />
      <div>
        <Button onClick={onSubmit}>{action}</Button>
      </div>
    </div>
  );
};

export default AllocateBudget;
