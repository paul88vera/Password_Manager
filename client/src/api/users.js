import { baseApi } from "./base";

// @route    GET /user
// @desc     Get all users
// @access   Private - Public For Now
export function getUsers() {
  return baseApi.get("user").then((res) => res.data);
}

// @route    GET /user/:id
// @desc     Get user by id
// @access   Private - Public For Now
export function getUser(id, options) {
  return baseApi.get(`user/${id}`, options).then((res) => res.data);
}
// @route    POST /user
// @desc     Create user
// @access   Private - Public For Now
export function createUser(data, options) {
  return baseApi.post(`user/`, data, options).then((res) => res.data);
}

// @route    PUT /user/:id
// @desc     Update user by id
// @access   Private - Public For Now
export function editUser(id, options) {
  return baseApi.put(`user/${id}`, options).then((res) => res.data);
}

// @route    DELETE /user/:id
// @desc     Delete user by id
// @access   Private - Public For Now
export function deleteUser(id) {
  return baseApi.delete(`user/${id}`, { method: "DELETE" }).then(() => {
    window.location.replace("/profile");
  });
}
