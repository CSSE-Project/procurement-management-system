import React from "react";
import ReactDOM from "react-dom";

import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import AllocateBudget from "../components/Dashboard/DashboardSubComponents/manager/AllocateBudget";
import RulesAndRegulations from "../components/Dashboard/DashboardSubComponents/manager/RulesAndRegulations";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

it("render without crashing Allocate Budget", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AllocateBudget />, div);
});

it("Check Component Re Rendering Allocate Budget", () => {
  const fetch = jest
    .spyOn(window, "fetch")
    .mockReturnValue(new Promise(() => undefined));

  render(<AllocateBudget />);

  // this will fail because we missed useEffect dependency array
  expect(fetch).toHaveBeenCalledTimes(1);
});

it("Check Component Re Rendering Rules And Regulations", () => {
  const fetch = jest
    .spyOn(window, "fetch")
    .mockReturnValue(new Promise(() => undefined));

  render(<RulesAndRegulations />);

  // this will fail because we missed useEffect dependency array
  expect(fetch).toHaveBeenCalledTimes(1);
});
