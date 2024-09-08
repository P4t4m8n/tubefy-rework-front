import assert from "node:assert";
import { describe, it } from "node:test";
import { validateSignup } from "./auth";

describe("#validateSignup", () => {
  it("should return an error if email is not provided", () => {
    assert.strictEqual(
      validateSignup({ email: "", username: "test", password: "Test1234" }).get(
        "email"
      ),
      "Email is required"
    );
  });

  it("should return an error if email is invalid", () => {
    assert.strictEqual(
      validateSignup({
        email: "test",
        username: "test",
        password: "Test1234",
      }).get("email"),
      "Email is invalid"
    );
  });

  it("should return an error if username is not provided", () => {
    assert.strictEqual(
      validateSignup({
        email: "test@test.com",
        username: "",
        password: "Test1234",
      }).get("username"),
      "Username is required"
    );
  });

  it("should return an error if username is invalid", () => {
    assert.strictEqual(
      validateSignup({
        email: "test@test.com",
        username: "test@",
        password: "Test1234",
      }).get("username"),
      "Username can only include letters and numbers"
    );
  });

  it("should return an error if username length is less than 3", () => {
    assert.strictEqual(
      validateSignup({
        email: "test@test.com",
        username: "te",
        password: "Test1234",
      }).get("username"),
      "User name needs to be between 3-20 characters"
    );
  });

  it("should return an error if username length is more than 20", () => {
    assert.strictEqual(
      validateSignup({
        email: "test@test.com",
        username: "a".repeat(21),
        password: "Test1234",
      }).get("username"),
      "User name needs to be between 3-20 characters"
    );
  });

  it("should return an error if password is not provided", () => {
    assert.strictEqual(
      validateSignup({
        email: "test@test.com",
        username: "test",
        password: "",
      }).get("password"),
      "Password is required"
    );
  });

  it("should return an error if password is invalid", () => {
    assert.strictEqual(
      validateSignup({
        email: "test@test.com",
        username: "test",
        password: "test",
      }).get("password"),
      "Password most contain at least one uppercase letter, one lowercase letter and one number"
    );
  });

  it("should return an error if password length is less than 6", () => {
    assert.strictEqual(
      validateSignup({
        email: "test@test.com",
        username: "test",
        password: "T1a",
      }).get("password"),
      "Password needs to be between 6-20 characters"
    );
  });

  it("should return an error if password length is more than 20", () => {
    assert.strictEqual(
      validateSignup({
        email: "test@test.com",
        username: "test",
        password: "T1" + "a".repeat(19),
      }).get("password"),
      "Password needs to be between 6-20 characters"
    );
  });
});
