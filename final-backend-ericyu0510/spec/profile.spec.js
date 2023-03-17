require("es6-promise").polyfill();
require("isomorphic-fetch");

const url = (path) => `http://localhost:3000${path}`;

var reporters = require("jasmine-reporters");

var junitReporter = new reporters.JUnitXmlReporter({
  savePath: "./report",
  filePrefix: "Testing-",
  consolidateAll: true,
});

jasmine.getEnv().addReporter(junitReporter);

describe("validate functionality of login/register", () => {
  let cookie;

  it("POST /register register a new user named testUser", (done) => {
    fetch(url("/register"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "testUser",
        email: "testUser@rice.com",
        dob: "1999-01-01",
        zipcode: "12345",
        password: "123",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        expect(res.result).toEqual("success");
        expect(res.username).toEqual("testUser");
        done();
      })
      .catch((err) => console.log(err));
  });

  it("POST /login log in with testUser", (done) => {
    fetch(url("/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "testUser", password: "123" }),
    })
      .then((res) => {
        cookie = res.headers.get("set-cookie");
        return res.json();
      })
      .then((res) => {
        expect(res.result).toEqual("success");
        expect(res.username).toEqual("testUser");
        done();
      })
      .catch((err) => console.log(err));
  });

  let pid = "";
  it("POST /article Create a new article", (done) => {
    fetch(url("/article"), {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: cookie },
      body: JSON.stringify({ text: "text for testing" }),
    })
      .then((res) => res.json())
      .then((res) => {
        pid = res.articles[0].pid;
        expect(res.articles[0].text).toEqual("text for testing");
        done();
      })
      .catch((err) => console.log(err));
  });

  it("GET /article Verify that the article was added", (done) => {
    fetch(url("/articles/" + pid), {
      method: "GET",
      headers: { "Content-Type": "application/json", Cookie: cookie },
    })
      .then((res) => res.json())
      .then((res) => {
        expect(res.articles[0].pid).toEqual(pid);
        expect(res.articles[0].text).toEqual("text for testing");
        done();
      })
      .catch((err) => console.log(err));
  }, 1000);

  it("PUT /headline Update the status headline", (done) => {
    fetch(url("/headline"), {
      method: "PUT",
      headers: { "Content-Type": "application/json", Cookie: cookie },
      body: JSON.stringify({ headline: "This is the updated headline" }),
    })
      .then((res) => res.json())
      .then((res) => {
        expect(res.username).toEqual("testUser");
        expect(res.headline).toEqual("This is the updated headline");
        done();
      })
      .catch((err) => console.log(err));
  });

  it("GET /headline Verify the headline change", (done) => {
    fetch(url("/headline/testUser"), {
      method: "GET",
      headers: { "Content-Type": "application/json", Cookie: cookie },
    })
      .then((res) => res.json())
      .then((res) => {
        expect(res.username).toEqual("testUser");
        expect(res.headline).toEqual("This is the updated headline");
        done();
      })
      .catch((err) => console.log(err));
  });

  it("PUT /logout Log out testUser", (done) => {
    fetch(url("/logout"), {
      method: "PUT",
      headers: { "Content-Type": "application/json", Cookie: cookie },
    })
      .then((res) => {
        expect(res.status).toEqual(200);
        done();
      })
      .catch((err) => console.log(err));
  });
});
