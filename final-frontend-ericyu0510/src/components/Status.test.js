import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Main from "../pages/Main";
import { BrowserRouter } from "react-router-dom";

test("should update status headline after enter and submit", async () => {
  localStorage.setItem("current_user", "Bret");
  localStorage.setItem("current_userId", 1);
  localStorage.setItem("headline", "Welcome to Rice. Let's go Owls!");

  render(<Main />, { wrapper: BrowserRouter });
  const updateStatusInput = screen.getByTestId("update_status");
  await userEvent.type(updateStatusInput, "This is the updated status.");

  const updateStatusBtn = screen.getByTestId("updateStatusBtn");
  await userEvent.click(updateStatusBtn);

  const statusText = screen.getByTestId("statusText");
  expect(statusText.textContent).toBe("This is the updated status.");
});
