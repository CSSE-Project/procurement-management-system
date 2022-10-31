import React from "react";
import axios from "axios";
import {
  Collapse,
  Form,
  notification,
  Empty,
  Spin,
  Switch,
  Input,
  Button,
  DatePicker,
} from "antd";
import { useEffect } from "react";
import { useState } from "react";
import DeliveryHistory from "./deliveryHistory";
const { Panel } = Collapse;

const Delivery = () => {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [date, setDate] = useState("");
  const [success, setSuccess] = useState(false);
  const [vissible, setVissible] = useState(false);

  const [form] = Form.useForm();
  const search = window.location.search;

  useEffect(() => {
    (async () => {
      await fetch("/order")
        .then((res) => res.json())
        .then((json) => {
          setData(json);
        });
    })();
  }, [success]);

  const filteredData = data.filter(
    (el) =>
      el?.status !== null && el?.supEmail === localStorage.getItem("email")
  );

  const setHeader = (value) => (
    <>
      <span style={{ fontWeight: "bold" }}>{value?.name}</span> &nbsp;
      <i style={{ color: "green" }}> {value?.nameOfSupplier}</i>
    </>
  );
  const onSubmit = async (id) =>
    await axios
      .put(`/order/update/${id}`, { date })
      .then(() => {
        notification.success({ message: "successfully update delivery date" });
        setSuccess(true);
      })
      .catch(() =>
        notification.error({
          message: "Something went wrong fucking raw Bitch",
        })
      );

  return (
    <>
      <br />
      <br />
      <Button onClick={() => setVissible(!vissible)}>
        {vissible ? "Collapse" : "View History"}
      </Button>
      {vissible && <DeliveryHistory />}
      {filteredData.map((val) => (
        <Form form={form}>
          <Collapse defaultActiveKey={["1"]}>
            <Panel header={setHeader(val)} forceRender={true}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <br />

                  <br />
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      color: "red",
                    }}
                  ></span>
                  <br />

                  <br />

                  <br />
                  <div> Unit : {val.unit}</div>
                  <div> Contact Person : {val.contactPerson}</div>
                  <div> Phone Number : {val.phoneNumber}</div>
                  <div> Quantity : {val.quantity}</div>
                  <div> Unit Price : {val.unitPrice}</div>
                  <div> Budget : {val.sBudget}</div>
                  <div> Status : {val.status}</div>
                </div>

                <Form.Item
                  //name={[index, "amount"]}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!(parseInt(value).toString().length >= 16))
                          return Promise.resolve();
                        return Promise.reject(
                          new Error("Maximum number limit exceeded.")
                        );
                      },
                    }),
                    {
                      pattern: new RegExp(/^[0-9,.]{0,30}$/i),
                      message: "Numbers only without spaces",
                    },
                  ]}
                >
                  Enter Delivery Date
                  <DatePicker
                    onChange={(e) => setDate(e)}
                    disabled={val.status == "REJECTED" || val.date}
                  />
                </Form.Item>
                <Button
                  onClick={() => onSubmit(val._id)}
                  disabled={val.status == "REJECTED" || val.date}
                >
                  Submit
                </Button>
              </div>
            </Panel>
          </Collapse>
        </Form>
      ))}
    </>
  );
};

export default Delivery;
