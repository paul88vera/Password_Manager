import { baseApi } from "./base";

// @route    GET /users
// @desc     Get all users
// @access   Private - Public For Now
export function getAllUsers(options) {
  return baseApi.get("user", options).then((res) => res.data);
}

// @route    GET /users/:id
// @desc     Get user by id
// @access   Private - Public For Now
export function getUser(id, options) {
  return baseApi.get(`user/${id}`, options).then((res) => res.data);
}
