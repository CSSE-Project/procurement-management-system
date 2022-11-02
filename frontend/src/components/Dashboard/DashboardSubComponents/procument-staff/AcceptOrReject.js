import { Button, message, Modal, notification, Table } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { GetColumnSearchProps } from "../common/Search";

const AcceptOrReject = () => {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState(null);
  const [id, setId] = useState(null);
  const [success, setSuccess] = useState(false);

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
        <div>{record.mBudget ? record.mBudget : "Not provided yet."}</div>
      ),
    },
    {
      title: "Status",
      render: (_, record) => (
        <div>{record.mBudget > record.sBudget ? "Valid" : "Invalid"}</div>
      ),
    },
    {
      title: "Action",
      dataIndex: "status",
      render: (_, record) => (
        <div>
          {!record.mBudget ? (
            <span>Waiting</span>
          ) : (
            <span>
              {!record.status ? (
                <div>
                  <Button
                    style={
                      record.mBudget > record.sBudget
                        ? {
                            color: "white",
                            backgroundColor: "green",
                          }
                        : {}
                    }
                    disabled={record.mBudget < record.sBudget}
                    onClick={() => {
                      setVisible(true);
                      setAction("ACCEPT");
                      setId(record._id);
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    style={
                      record.mBudget > record.sBudget
                        ? {
                            color: "white",
                            backgroundColor: "red",
                          }
                        : {}
                    }
                    disabled={record.mBudget < record.sBudget}
                    onClick={() => {
                      setVisible(true);
                      setAction("REJECT");
                      setId(record._id);
                    }}
                  >
                    Reject
                  </Button>
                </div>
              ) : (
                record.status
              )}
            </span>
          )}
        </div>
      ),
    },
  ];

  const onAction = async () => {
    await axios
      .put(`/order/${id}`, {
        status: action === "ACCEPT" ? "ACCEPTED" : "REJECTED",
      })
      .then(() => {
        notification.success({ message: "Operation Succeded." });
        setSuccess(true);
        setVisible(false);
      })
      .catch(() => notification.error({ message: "Something went wrong!." }));

    await axios.post("/order/notifySupplier", {
      status: action,
      type: "order",
      id,
      email: "tnirmalaadasooriya@gmail.com",
    });
    setTimeout(() => {
      setSuccess(false);
    }, [100]);
  };

  useEffect(() => {
    (async () => fetch("/order").then((res) => setData(res.data)))();
  }, [success]);
  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        size={data?.length}
        scroll={{ x: "max-content" }}
      />
      <Modal
        title={action}
        visible={visible}
        destroyOnClose={true}
        onCancel={() => {
          setVisible(false);
          setAction(null);
          setId(null);
        }}
        footer={null}
      >
        <center>
          {" "}
          <div>Are you sure ?</div>
          <div style={{ color: "red" }}>
            Note: The notification will go to the site manager through an email.
          </div>
          <div>
            <Button onClick={onAction}>{action}</Button>
          </div>
        </center>
      </Modal>
    </div>
  );
};

export default AcceptOrReject;
