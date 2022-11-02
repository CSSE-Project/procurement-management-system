import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Collapse,
  Form,
  notification,
  Empty,
  Spin,
  Switch,
  DatePicker,
  Input,
  Button,
} from "antd";

const { Panel } = Collapse;

const RulesAndRegulations = () => {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);

  const [form] = Form.useForm();
  const search = window.location.search;

  const [date, setDate] = useState(null);
  const [rule, setRule] = useState(null);

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

  useEffect(() => {
    fetch();
  }, []);

  const onSubmit = async () => {
    await axios
      .post(`/rules`, { date, rule })
      .then(() => {
        notification.success({ message: "Operation Succeded." });
      })
      .catch(() => notification.error({ message: "Something went wrong!." }));
  };

  return (
    <>
      <br />
      <br />
      <center>
        <Form form={form}>
          <Collapse defaultActiveKey={["1"]}>
            <Panel header={setHeader("abc")} forceRender={true}>
              <div>
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
                </div>

                <Form.Item
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  Date : <br />
                  <br />
                  <br />
                  <DatePicker
                    style={{ width: "30%" }}
                    onChange={(e) => setDate(e)}
                  />
                  <br />
                </Form.Item>

                <Form.Item>
                  Rule :
                  <br />
                  <br />
                  <br />
                  <textarea
                    name="textarea"
                    rows="10"
                    cols="100"
                    placeholder="Write Rule and Regulations Here"
                    onChange={(e) => setRule(e.target.value)}
                  ></textarea>
                </Form.Item>
                <Button onClick={onSubmit}>Submit</Button>
              </div>
            </Panel>
          </Collapse>
        </Form>
      </center>
    </>
  );
};

export default RulesAndRegulations;
