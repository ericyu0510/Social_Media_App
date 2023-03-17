import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { LoginForm } from "./components/LoginForm";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

test("renders Sign in to your account on auth page", () => {
  render(<App />, { wrapper: BrowserRouter });
  const linkElement = screen.getByText(/Sign in to your account/i);
  expect(linkElement).toBeInTheDocument();
});

test("Log in, main page should show username on status", async () => {
  render(<App />, { wrapper: BrowserRouter });
  const userInputEl = screen.getByPlaceholderText(/Your username/i);
  await userEvent.type(userInputEl, "Bret");

  const passInputEl = screen.getByLabelText("Enter Your Password");
  await userEvent.type(passInputEl, "Kulas Light");
  // expect(userInputEl.value).toBe("Bret");
  // expect(passInputEl).toHaveValue("Kulas Light");
  const loginButton = screen.getByRole("button", { name: "Sign in" });
  await userEvent.click(loginButton);
  const UsernameElement = screen.getByRole("heading", {
    name: /enter new post/i,
  });
  expect(UsernameElement).toBeInTheDocument();
});
