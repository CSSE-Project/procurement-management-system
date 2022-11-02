import React from "react";
import ReactDOM from "react-dom";

import "@testing-library/jest-dom";
import AcceptOrReject from "../components/Dashboard/DashboardSubComponents/procument-staff/AcceptOrReject";
import { render } from "@testing-library/react";
import ResetPassword from "../components/Dashboard/DashboardSubComponents/ResetPassword";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AcceptOrReject></AcceptOrReject>, div);
});

it("Check Component Re Rendering Accept or Reject", () => {
  const fetch = jest
    .spyOn(window, "fetch")
    .mockReturnValue(new Promise(() => undefined));

  render(<AcceptOrReject />);

  // this will fail because we missed useEffect dependency array
  expect(fetch).toHaveBeenCalledTimes(1);
});

it("Check Component Re Rendering Reset Password", () => {
  const fetch = jest
    .spyOn(window, "fetch")
    .mockReturnValue(new Promise(() => undefined));

  render(<ResetPassword />);

  // this will fail because we missed useEffect dependency array
  expect(fetch).toHaveBeenCalledTimes(1);
});
