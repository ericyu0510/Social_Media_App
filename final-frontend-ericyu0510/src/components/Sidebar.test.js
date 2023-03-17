import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Main from "../pages/Main";
import { BrowserRouter } from "react-router-dom";

test("should show error when enter random user", async () => {
  localStorage.setItem("current_user", "Bret");
  localStorage.setItem("current_userId", 1);
  localStorage.setItem("headline", "Welcome to Rice. Let's go Owls!");

  render(<Main />, { wrapper: BrowserRouter });
  const addFollowInput = screen.getByTestId("add_follow");
  await userEvent.type(addFollowInput, "abc");

  const addFollowBtn = screen.getByTestId("addfollowbtn");
  await userEvent.click(addFollowBtn);

  const errorMsg = screen.getByText("No such user.");
  expect(errorMsg).toBeInTheDocument();
});

test("should show error when add current follower as friend", async () => {
  localStorage.setItem("current_user", "Bret");
  localStorage.setItem("current_userId", 1);
  localStorage.setItem("headline", "Welcome to Rice. Let's go Owls!");

  render(<Main />, { wrapper: BrowserRouter });
  const addFollowInput = screen.getByTestId("add_follow");
  await userEvent.type(addFollowInput, "Antonette");

  const addFollowBtn = screen.getByTestId("addfollowbtn");
  await userEvent.click(addFollowBtn);

  const errorMsg = screen.getByText("The user is already your friend.");
  expect(errorMsg).toBeInTheDocument();
});

test("should do nothing when add friend input is empty", async () => {
  localStorage.setItem("current_user", "Bret");
  localStorage.setItem("current_userId", 1);
  localStorage.setItem("headline", "Welcome to Rice. Let's go Owls!");

  render(<Main />, { wrapper: BrowserRouter });

  const addFollowBtn = screen.getByTestId("addfollowbtn");
  await userEvent.click(addFollowBtn);

  const followedUsers = screen.getByTestId("followedUsers");
  expect(followedUsers.children.length).toBe(3);
});

test("should show error when add self as friend", async () => {
  localStorage.setItem("current_user", "Bret");
  localStorage.setItem("current_userId", 1);
  localStorage.setItem("headline", "Welcome to Rice. Let's go Owls!");

  render(<Main />, { wrapper: BrowserRouter });
  const addFollowInput = screen.getByTestId("add_follow");
  await userEvent.type(addFollowInput, "Bret");

  const addFollowBtn = screen.getByTestId("addfollowbtn");
  await userEvent.click(addFollowBtn);

  const errorMsg = screen.getByText("You cannot add yourself as friend.");
  expect(errorMsg).toBeInTheDocument();
});
