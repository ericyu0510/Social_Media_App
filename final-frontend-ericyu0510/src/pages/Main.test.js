import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Main from "./Main";
import { BrowserRouter } from "react-router-dom";

test("should fetch all articles for current logged in user (posts state is set)", () => {
  localStorage.setItem("current_user", "mack");
  localStorage.setItem("current_userId", 1);
  localStorage.setItem("headline", "Welcome to Rice. Let's go Owls!");

  render(<Main />, { wrapper: BrowserRouter });
  const postDiv = screen.getByTestId("postDiv");
  expect(postDiv.childElementCount).toBe(40);
});

test("should fetch subset of articles for current logged in user given search keyword (posts state is filtered)", async () => {
  localStorage.setItem("current_user", "Bret");
  localStorage.setItem("current_userId", 1);
  localStorage.setItem("headline", "Welcome to Rice. Let's go Owls!");

  render(<Main />, { wrapper: BrowserRouter });
  const searchBar = screen.getByTestId("searchBar");
  await userEvent.type(searchBar, "Bret");

  const searchBarBtn = screen.getByRole("button", { name: /search/i });
  await userEvent.click(searchBarBtn);

  const postDiv = screen.getByTestId("postDiv");
  expect(postDiv.childElementCount).toBe(10);
});
test("should add articles when adding a follower (posts state is larger )", async () => {
  localStorage.setItem("current_user", "mack");
  localStorage.setItem("current_userId", 1);
  localStorage.setItem("headline", "Welcome to Rice. Let's go Owls!");

  render(<Main />, { wrapper: BrowserRouter });
  const addFollowInput = screen.getByTestId("add_follow");
  await userEvent.type(addFollowInput, "Moriah.Stanton");

  const addFollowBtn = screen.getByTestId("addfollowbtn");
  await userEvent.click(addFollowBtn);

  const postDiv = screen.getByTestId("postDiv");
  expect(postDiv.childElementCount).toBe(50);
});

test("should remove articles when removing a follower (posts state is smaller)", async () => {
  localStorage.setItem("current_user", "mack");
  localStorage.setItem("current_userId", 1);
  localStorage.setItem("headline", "Welcome to Rice. Let's go Owls!");

  render(<Main />, { wrapper: BrowserRouter });
  const unfollowBtn = screen.getAllByTestId("unfollowbtn")[0];
  await userEvent.click(unfollowBtn);

  const postDiv = screen.getByTestId("postDiv");
  expect(postDiv.childElementCount).toBe(30);
});

test("should add post when new post is sent", async () => {
  localStorage.setItem("current_user", "mack");
  localStorage.setItem("current_userId", 1);
  localStorage.setItem("headline", "Welcome to Rice. Let's go Owls!");

  render(<Main />, { wrapper: BrowserRouter });
  const newPostTextarea = screen.getByTestId("newpost");
  await userEvent.type(newPostTextarea, "This is a new post.");

  const newPostSendBtn = screen.getByRole("button", { name: /send/i });
  await userEvent.click(newPostSendBtn);

  const postDiv = screen.getByTestId("postDiv");
  expect(postDiv.childElementCount).toBe(41);
});
