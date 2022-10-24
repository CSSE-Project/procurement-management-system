import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Spin, Tooltip, notification, Table } from "antd";
import {
  DesktopOutlined,
  FileDoneOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";

import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const Order = () => {
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [nameOfSupplier, setNameOfSupplier] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  //const [sBudget, setSBudget] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [data, setData] = useState("");
  const [visible, setVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  //const type = "user";
  //const history = useNavigate();

  const [loading, setLoading] = useState(false); //additional
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoader(!loader);
  //   }, 5000);
  // }, []);

  useEffect(() => {
    if (!success)
      setTimeout(() => {
        setLoader(!loader);
      }, 5000);
    (async () => axios.get("/order").then((res) => setData(res.data)))();
  }, [success]);

  const deleteFunc = async (id) => {
    await axios.delete(`/order/${id}`).then(() => {
      notification.info({ message: "Successfully Deleted", placement: "top" });
      setSuccess(true);
    });
  };

  const columns = [
    {
      title: "Item Name",
      dataIndex: "name",
    },
    {
      title: "Unit",
      dataIndex: "unit",
    },
    {
      title: "Store Name",
      dataIndex: "nameOfSupplier",
    },
    {
      title: "Contact Person",
      dataIndex: "contactPerson",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
    },
    {
      title: "Budget",
      dataIndex: "sBudget",
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

  const employeeHandler = async (placement) => {
    // create handler for saving data to the db
    setLoading(true);

    const config = {
      //headers
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.post(
        //use axios API
        "/order",
        {
          name,
          unit,
          nameOfSupplier,
          contactPerson,
          phoneNumber,
          quantity,
          unitPrice,
          sBudget: Number(unitPrice) * quantity,
          supEmail: localStorage.getItem("email"),
        },
        config
      );

      setTimeout(() => {
        //set a time out
        setLoading(false);
        notification.info({
          message: `Notification`,
          description: "Successfully Submitted the Budget deteils 😘",
          placement,
        });
        //history("/subject-officer-dashboard/subject-officer?_optE=employee");
        form.resetFields();
      }, 5000); //5seconds timeout
    } catch (error) {
      notification.error({
        message: `Notification`,
        description: error.response.data.error,
        placement,
      });
      setError(true);
      //form.resetFields();
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
          onFinish={() => employeeHandler("top")}
        >
          <center>
            {error && <span style={{ color: "red" }}>{error}</span>}
          </center>
          <Form.Item
            name="name"
            label="Item name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="write item name"
              prefix={<FileDoneOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Enter Item Name">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              showCount
              maxLength={100}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="unit"
            label="Unit"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="write unit"
              prefix={<UserOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Please provide unit">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              showCount
              maxLength={100}
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="nameOfSupplier"
            label="Store"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="write name Of Store"
              prefix={<UserOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Please provide name Of Store">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              showCount
              maxLength={200}
              value={nameOfSupplier}
              onChange={(e) => setNameOfSupplier(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="contactPerson"
            label="Contact Person"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="write contact Person"
              prefix={<UserOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Please provide contact Person">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              showCount
              maxLength={200}
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="phone number"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input your Phone Number!" },
              {
                min: 10,
                message: "Phone Number must be minimum 10 characters.",
              },
              { max: 10 },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="Enter your phone number"
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Enter your phone number ex: 0774258796">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              showCount
              maxLength={10}
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="enter quantity"
              prefix={<FileDoneOutlined className="site-form-item-icon" />}
              suffix={[
                <Tooltip title="Enter quantity">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>,
              ]}
              showCount
              maxLength={12}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              type="number"
            />
          </Form.Item>

          <Form.Item
            name="unitPrice"
            label="Unit Price"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="Enter unit price"
              prefix={<DesktopOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Enter unit price">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              showCount
              maxLength={50}
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              type="number"
            />
          </Form.Item>

          {/* <Form.Item
            name="sBudget"
            label="Budget"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="Enter your Budget"
              prefix={<BranchesOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Enter your Budget">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              showCount
              maxLength={20}
              value={sBudget}
              onChange={(e) => setSBudget(e.target.value)}
              type="number"
            />
          </Form.Item> */}

          <Form.Item {...tailLayout}>
            &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;
            <Button type="primary" htmlType="submit">
              {loading ? (
                <>
                  <Spin /> Planning in Progess...
                </>
              ) : (
                "Submit"
              )}
            </Button>{" "}
            &nbsp;&nbsp; &nbsp;&nbsp;
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
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

export default Order;
