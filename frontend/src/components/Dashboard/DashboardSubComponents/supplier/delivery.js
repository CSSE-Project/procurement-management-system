import React from "react";
import {
  Collapse,
  Form,
  notification,
  Empty,
  Spin,
  Switch,
  Input,
  Button,
} from "antd";
import { useEffect } from "react";
import { useState } from "react";
const { Panel } = Collapse;

const Delivery = () => {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);

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
  }, []);

  const filteredData = data.filter(
    (el) =>
      el?.status !== null && el?.supEmail === localStorage.getItem("email")
  );

  const genExtra = (value) => (
    <span className={toggle ? "paid" : "pending"}>
      <a></a>
    </span>
  );

  const setHeader = (value) => (
    <>
      <span style={{ fontWeight: "bold" }}>{value?.fullName}</span> &nbsp;
      <i style={{ color: "green" }}> {value?.email}</i>
    </>
  );

  return (
    <>
      <br />
      <br />
      <Form form={form}>
        <Collapse defaultActiveKey={["1"]}>
          <Panel header={setHeader("abc")} forceRender={true}>
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
                Amount(Rs.) :
                <Input
                // placeholder={
                //   !disablePermission(value) && "Enter amount"
                // }
                // disabled={disablePermission(value)}
                // onChange={(e) => {
                //   setFinalPayment(e.target.value, index, value);
                //   form.validateFields([[index, "amount"]]);
                // }}
                // value={amount?.[index]}
                // maxLength={30}
                // showCount={!disablePermission(value)}
                />
              </Form.Item>
            </div>
          </Panel>
        </Collapse>
      </Form>
    </>
  );
};

export default Delivery;
