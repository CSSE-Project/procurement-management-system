import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Delivery from "../components/Dashboard/DashboardSubComponents/supplier/delivery";
import DeliveryHistory from "../components/Dashboard/DashboardSubComponents/supplier/deliveryHistory";
import Inventry from "../components/Dashboard/DashboardSubComponents/supplier/inventry";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

it("render without crashing delivery", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Delivery></Delivery>, div);
});

it("Check Component Re Rendering Delivery History", () => {
  const fetch = jest
    .spyOn(window, "fetch")
    .mockReturnValue(new Promise(() => undefined));

  render(<DeliveryHistory />);

  // this will fail because we missed useEffect dependency array
  expect(fetch).toHaveBeenCalledTimes(1);
});

it("Check Component Re Rendering Inventry", () => {
  const fetch = jest
    .spyOn(window, "fetch")
    .mockReturnValue(new Promise(() => undefined));

  render(<Inventry />);

  // this will fail because we missed useEffect dependency array
  expect(fetch).toHaveBeenCalledTimes(1);
});
