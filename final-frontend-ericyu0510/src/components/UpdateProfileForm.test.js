import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Profile from "../pages/Profile";
import { BrowserRouter } from "react-router-dom";
import "intersection-observer";

test("should update email after input email and click submit button", async () => {
  localStorage.setItem("current_user", "mack");
  render(<Profile />, { wrapper: BrowserRouter });
  expect(screen.getByText(/mack/i)).toBeInTheDocument();
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  await userEvent.type(emailInput, "abc@gmail.com");
  const updateButton = screen.getByRole("button", { name: /send/i });
  await userEvent.click(updateButton);
  const emailTag = screen.getByTestId("emailtag");
  expect(emailTag.textContent).toBe("abc@gmail.com");
});

test("should update phone number after input and submit", async () => {
  localStorage.setItem("current_user", "mack");
  render(<Profile />, { wrapper: BrowserRouter });
  expect(screen.getByText(/mack/i)).toBeInTheDocument();
  const phoneInput = screen.getByRole("textbox", { name: /phone number/i });
  await userEvent.type(phoneInput, "987-654-3210");
  const updateButton = screen.getByRole("button", { name: /send/i });
  await userEvent.click(updateButton);
  const phoneTag = screen.getByTestId("phonetag");
  expect(phoneTag.textContent).toBe("987-654-3210");
});

test("should update zipcode after input and submit", async () => {
  localStorage.setItem("current_user", "mack");
  render(<Profile />, { wrapper: BrowserRouter });
  expect(screen.getByText(/mack/i)).toBeInTheDocument();
  const zipcodeInput = screen.getByRole("textbox", { name: /zipcode/i });
  await userEvent.type(zipcodeInput, "12345");
  const updateButton = screen.getByRole("button", { name: /send/i });
  await userEvent.click(updateButton);
  const zipcodeTag = screen.getByTestId("zipcodetag");
  expect(zipcodeTag.textContent).toBe("12345");
});

test("should update password after input and submit", async () => {
  localStorage.setItem("current_user", "mack");
  render(<Profile />, { wrapper: BrowserRouter });
  expect(screen.getByText(/mack/i)).toBeInTheDocument();

  let newPassword = "abc";
  const passwordInput = screen.getByTestId("passUpdate");
  await userEvent.type(passwordInput, newPassword);

  const passConfInput = screen.getByTestId("passconfUpdate");
  await userEvent.type(passConfInput, newPassword);

  const updateButton = screen.getByRole("button", { name: /send/i });
  await userEvent.click(updateButton);

  const passUpdateTag = screen.getByTestId("passupdatetag");
  expect(passUpdateTag.textContent.length).toBe(newPassword.length);

  const passConfTag = screen.getByTestId("passconftag");
  expect(passConfTag.textContent.length).toBe(newPassword.length);
});
