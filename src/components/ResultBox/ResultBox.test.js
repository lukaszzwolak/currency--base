import ResultBox from "./ResultBox";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Component ResultBox", () => {
  it("should render without crashing", () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });
  it("should render proper info about conversion when PLN to USD", () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
    const output = screen.getByTestId("output");
    expect(output).toHaveTextContent("PLN 100.00 = $28.57");
  });
  const testCasesPLNtoUSD = [
    { amount: 100, expected: "PLN 100.00 = $28.57" },
    { amount: 200, expected: "PLN 200.00 = $57.14" },
    { amount: 0, expected: "PLN 0.00 = $0.00" },
    { amount: -100, expected: "-PLN 100.00 = $0.00" },
  ];

  for (const testCase of testCasesPLNtoUSD) {
    it(`should render proper conversion from PLN to USD for amount $(testCase.amount)`, () => {
      render(<ResultBox from="PLN" to="USD" amount={testCase.amount} />);
      const output = screen.getByTestId("output");
      expect(output).toHaveTextContent(testCase.expected);
    });
  }
  const testCasesUSDToPLN = [
    { amount: 100, expected: "$100.00 = PLN 350.00" },
    { amount: 200, expected: "$200.00 = PLN 700.00" },
    { amount: 0, expected: "$0.00 = PLN 0.00" },
    { amount: -100, expected: "-$100.00 = PLN 0.00" },
  ];
  for (const testCase of testCasesUSDToPLN) {
    it(`should render proper conversion from USD to PLN for amount ${testCase.amount}`, () => {
      render(<ResultBox from="USD" to="PLN" amount={testCase.amount} />);
      const output = screen.getByTestId("output");
      expect(output).toHaveTextContent(testCase.expected);
    });
  }
  it("should render the same amount when from and to currencies are equal", () => {
    render(<ResultBox from="USD" to="USD" amount={123} />);
    const output = screen.getByTestId("output");
    expect(output).toHaveTextContent("$123.00 = $123.00");
  });
});
