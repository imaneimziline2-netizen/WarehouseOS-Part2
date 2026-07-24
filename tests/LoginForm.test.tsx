import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

import LoginForm from "@/components/forms/LoginForm";

describe("LoginForm", () => {
  test("renders sign in button", () => {
    render(<LoginForm />);

    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  test("renders email and password inputs", () => {
    render(<LoginForm />);

    expect(screen.getByPlaceholderText("you@company.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("********")).toBeInTheDocument();
  });

  test("shows validation error when fields are empty", async () => {
    render(<LoginForm />);

    await userEvent.click(
      screen.getByRole("button", { name: /sign in/i })
    );

    expect(
      screen.getByText("Please fill in all fields.")
    ).toBeInTheDocument();
  });
});