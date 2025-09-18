import { baseApi } from "./base";

// @route    GET /passwords
// @desc     Get all passwordss
// @access   Private
export function getPasswords() {
  return baseApi.get("passwords").then((res) => res.data);
}

// @route    GET /passwords/:id
// @desc     Get passwords by id
// @access   Private
export function getPassword(id, options) {
  return baseApi.get(`passwords/${id}`, options).then((res) => res.data);
}

// @route    PUT /passwords/:id
// @desc     Update passwords by id
// @access   Private
export function editPassword(id, data, options) {
  return baseApi.put(`passwords/${id}`, data, options).then((res) => res.data);
}
// @route    POST /passwords
// @desc     Create a password
// @access   Private
export function createPassword(data, options) {
  return baseApi.post("passwords", data, options).then((res) => res.data);
}

// @route    DELETE /passwords/:id
// @desc     Delete passwords by id
// @access   Private
export function deletePassword(id, Client) {
  return baseApi.delete(`passwords/${id}`).then(() => {
    window.location.replace(`/client/${Client}`);
  });
}
