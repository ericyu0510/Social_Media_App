import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import Profile from "../pages/Profile";
import { BrowserRouter } from "react-router-dom";

test("update profile button should exist", async () => {
  render(<App />, { wrapper: BrowserRouter });
  const userInputEl = screen.getByPlaceholderText(/Your username/i);
  await userEvent.type(userInputEl, "Bret");

  const passInputEl = screen.getByLabelText("Enter Your Password");
  await userEvent.type(passInputEl, "Kulas Light");

  const loginButton = screen.getByRole("button", { name: "Sign in" });
  await userEvent.click(loginButton);

  const profileButton = screen.getByText(/profile/i);
  await userEvent.click(profileButton);

  const updateEmailInput = screen.getByRole("textbox", { name: /email/i });
  await userEvent.type(updateEmailInput, "abc@gmail.com");

  const updateButton = screen.getByRole("button", { name: /send/i });
  expect(updateButton).toBeInTheDocument();
});

test("should fetch the logged in user's profile username", async () => {
  localStorage.setItem("current_user", "mack");
  render(<Profile />, { wrapper: BrowserRouter });

  const username = screen.getByTestId("nametag");
  expect(username.textContent).toBe("mack");
});
