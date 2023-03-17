import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Auth from "./Auth";
import Main from "./Main";
import { BrowserRouter } from "react-router-dom";

test("should log in a previously registered user (not new users, login state should be set)", async () => {
  render(<Auth />, { wrapper: BrowserRouter });
  const userInputEl = screen.getByPlaceholderText(/Your username/i);
  await userEvent.type(userInputEl, "Bret");

  const passInputEl = screen.getByLabelText("Enter Your Password");
  await userEvent.type(passInputEl, "Kulas Light");
  const loginButton = screen.getByRole("button", { name: "Sign in" });
  await userEvent.click(loginButton);
  expect(localStorage.getItem("status")).toBe("login");
});

test("should not log in an invalid user (error state should be set)", async () => {
  const jsdomAlert = window.alert; // remember the jsdom alert
  window.alert = () => {}; // provide an empty implementation for window.ale

  render(<Auth />, { wrapper: BrowserRouter });
  const userInputEl = screen.getByPlaceholderText(/Your username/i);
  userEvent.type(userInputEl, "Bre");

  const passInputEl = screen.getByLabelText("Enter Your Password");
  userEvent.type(passInputEl, "Kulas Light");
  const loginButton = screen.getByRole("button", { name: "Sign in" });
  await userEvent.click(loginButton);
  expect(localStorage.getItem("status")).toBe("error");
  window.alert = jsdomAlert; // restore the jsdom alert
});

test("should log out a user (login state should be cleared)", async () => {
  render(<Main />, { wrapper: BrowserRouter });
  const dropDown = screen.getByTestId("custom-element");
  await userEvent.click(dropDown);

  const signoutEl = screen.getByRole("menuitem", { name: /sign out/i });
  await userEvent.click(signoutEl);
  expect(localStorage.getItem("status")).toBeNull();
});
