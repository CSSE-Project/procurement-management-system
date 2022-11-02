import React from "react";
import ReactDOM from "react-dom";

import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Suplier from "../components/Dashboard/DashboardSubComponents/SiteManager/suplier";
import PasswordResetRequest from "../components/Dashboard/DashboardSubComponents/PasswordResetRequest";



window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

it("render without crashing Supplier", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Suplier></Suplier>, div);
});

it("Check Component Re Rendering Supplier", () => {
  const fetch = jest
    .spyOn(window, "fetch")
    .mockReturnValue(new Promise(() => undefined));

  render(<Suplier />);

  // this will fail because we missed useEffect dependency array
  expect(fetch).toHaveBeenCalledTimes(1);
});

it("Check Component Re Rendering Password Reset Request", () => {
  const fetch = jest
    .spyOn(window, "fetch")
    .mockReturnValue(new Promise(() => undefined));

  render(<PasswordResetRequest />);

  // this will fail because we missed useEffect dependency array
  expect(fetch).toHaveBeenCalledTimes(1);
});
