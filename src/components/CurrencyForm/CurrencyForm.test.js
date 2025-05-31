import CurrencyForm from "./CurrencyForm";
import userEvent from "@testing-library/user-event";
import { render, screen, cleanup } from "@testing-library/react";

describe("Component CurrencyForm", () => {
  it("should render without crashing", () => {
    render(<CurrencyForm action={() => {}} />);
  });

  it("should run action callback with proper data on form submit", () => {
    const action = jest.fn();

    // render component
    render(<CurrencyForm action={action} />);

    // find “convert” button
    const submitButton = screen.getByText("Convert");

    // find formular fields
    const amountField = screen.getByTestId("amount");
    const fromField = screen.getByTestId("from-select");
    const toField = screen.getByTestId("to-select");

    // simulate data input
    userEvent.type(amountField, "100");
    userEvent.selectOptions(fromField, "PLN");
    userEvent.selectOptions(toField, "USD");

    // simulate user click on "convert" button
    userEvent.click(submitButton);

    // check if action callback was called once and with correct arguments
    expect(action).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith({
      amount: 100,
      from: "PLN",
      to: "USD",
    });
  });

  it("should run action callback correctly for multiple scenarios", () => {
    const testCases = [
      { amount: "100", from: "PLN", to: "USD" },
      { amount: "20", from: "USD", to: "PLN" },
      { amount: "200", from: "PLN", to: "USD" },
      { amount: "345", from: "USD", to: "PLN" },
    ];

    for (const testCase of testCases) {
      const action = jest.fn();
      render(<CurrencyForm action={action} />);

      const submitButton = screen.getByText("Convert");

      const amountField = screen.getByTestId("amount");
      const fromField = screen.getByTestId("from-select");
      const toField = screen.getByTestId("to-select");

      userEvent.type(amountField, testCase.amount);
      userEvent.selectOptions(fromField, testCase.from);
      userEvent.selectOptions(toField, testCase.to);

      userEvent.click(submitButton);

      expect(action).toHaveBeenCalledTimes(1);
      expect(action).toHaveBeenCalledWith({
        amount: parseInt(testCase.amount),
        from: testCase.from,
        to: testCase.to,
      });

      cleanup();
    }
  });
});
