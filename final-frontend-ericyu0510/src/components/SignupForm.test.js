import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Auth from "../pages/Auth";
import SignupForm from "./SignupForm";
import { BrowserRouter } from "react-router-dom";

test("should log in a new registered user (status is login)", async () => {
  render(<SignupForm />, { wrapper: BrowserRouter });
  const accountNameInput = screen.getByRole("textbox", {
    name: /account name/i,
  });
  await userEvent.type(accountNameInput, "Mack");

  const emailInput = screen.getByRole("textbox", { name: /your email/i });
  await userEvent.type(emailInput, "mack@rice.edu");

  const passInputEl = screen.getByLabelText("Password");
  await userEvent.type(passInputEl, "abc");

  const passConfEl = screen.getByLabelText("Password Confirmation:");
  await userEvent.type(passConfEl, "abc");

  const phoneInput = screen.getByRole("textbox", { name: /phone number:/i });
  await userEvent.type(phoneInput, "1234567890");

  const dobInput = screen.getByLabelText(
    /date of birth: \(must be 18\+ to register\)/i
  );
  fireEvent.change(dobInput, { target: { value: "1990-05-12" } });

  const zipcodeInput = screen.getByRole("textbox", { name: /zip code:/i });
  await userEvent.type(zipcodeInput, "77030");

  const signupButton = screen.getByRole("button", { name: /sign up/i });
  await userEvent.click(signupButton);

  const UsernameElement = localStorage.getItem("status");
  expect(UsernameElement).toBe("login");
});
