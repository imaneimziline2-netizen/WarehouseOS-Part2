import { render, screen } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

import RegisterForm from "@/components/forms/RegisterForm";

describe("RegisterForm", () => {
  test("renders create account button", () => {
    render(<RegisterForm />);

    expect(
      screen.getByRole("button", {
        name: /create account/i,
      })
    ).toBeInTheDocument();
  });

  test("renders all inputs", () => {
    render(<RegisterForm />);

    expect(screen.getByPlaceholderText("John Doe")).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("you@company.com")
    ).toBeInTheDocument();

    expect(screen.getAllByPlaceholderText("********")).toHaveLength(2);
  });

  test("renders secure registration section", () => {
    render(<RegisterForm />);

    expect(
      screen.getByText(/secure registration/i)
    ).toBeInTheDocument();
  });
});