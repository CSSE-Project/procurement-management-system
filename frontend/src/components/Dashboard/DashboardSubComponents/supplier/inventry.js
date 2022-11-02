import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Spin, Tooltip, notification, Table } from "antd";
import TextArea from "antd/lib/input/TextArea";
import {
  FileDoneOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";

import axios from "axios";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Inventry = () => {
  const [loader, setLoader] = useState(false);
  const [storeId, setStoreId] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [loading, setLoading] = useState(false); //additional
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [success, setSuccess] = useState(false);

  const deleteFunc = async (id) => {
    await axios.delete(`/inventry/${id}`).then(() => {
      notification.info({ message: "Successfully Deleted", placement: "top" });
      setSuccess(true);
    });
  };
  const columns = [
    {
      title: "Store ID",
      dataIndex: "storeId",
    },
    {
      title: "Store Name",
      dataIndex: "storeName",
    },
    {
      title: "Store Address",
      dataIndex: "storeAddress",
    },
    {
      title: " ",
      render: (_, record) => (
        <div>
          <Button
            onClick={() => deleteFunc(record._id)}
            style={{ color: "white", backgroundColor: "red" }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (!success)
      setTimeout(() => {
        setLoader(!loader);
      }, 5000);
    (async () =>
      fetch("/inventry")
        .then((res) => res.json())
        .then((json) => setData(json)))();
  }, [success]);

  const inventryHandler = async (placement) => {
    // create handler for saving data to the db
    setLoading(true);

    const config = {
      //headers
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.get("/inventry").then(async (res) => {
        await axios.post(
          //use axios API
          "/inventry",
          {
            storeId:
              !res.data || !res.data.length
                ? 1
                : parseInt([...res.data].pop().storeId) + 1,
            storeName,
            storeAddress,
          },
          config
        );
        setSuccess(true);
      });

      setTimeout(() => {
        //set a time out
        setLoading(false);
        notification.info({
          message: `Notification`,
          description: "Successfully Submitted the user details 😘",
          placement,
        });
        form.resetFields();
      }, 5000); //5seconds timeout
    } catch (error) {
      notification.error({
        message: `Notification`,
        description: error.response.data.error,
        placement,
      });
      setError(true);
      form.resetFields();
      setLoading(false);
    }
  };

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      {loader === false ? (
        <center>
          <Spin style={{ marginTop: "200px" }} />
        </center>
      ) : (
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={() => inventryHandler("top")}
        >
          <center>
            {error && <span style={{ color: "red" }}>{error}</span>}
          </center>

          <Form.Item
            name="store name"
            label="Store name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="write store name"
              prefix={<UserOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Please provide store name">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              showCount
              maxLength={100}
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="store address"
            label="Store address"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="write units"
              prefix={<UserOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Please provide store address">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              showCount
              maxLength={200}
              value={storeAddress}
              onChange={(e) => setStoreAddress(e.target.value)}
            />
          </Form.Item>

          <Form.Item {...tailLayout}>
            &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;
            <Button type="primary" htmlType="submit">
              {loading ? (
                <>
                  <Spin /> Submitting in Progess...
                </>
              ) : (
                "Submit"
              )}
            </Button>{" "}
            &nbsp;&nbsp; &nbsp;&nbsp;
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>{" "}
            &nbsp;&nbsp; &nbsp;&nbsp;
          </Form.Item>
        </Form>
      )}
      <center>
        <Button type="primary" htmlType="View" onClick={() => setVisible(true)}>
          {loading ? (
            <>
              <Spin /> Viewing in Progess...
            </>
          ) : (
            "View"
          )}
        </Button>
      </center>

      {visible && <Table dataSource={data} columns={columns} />}
    </>
  );
};

export default Inventry;
