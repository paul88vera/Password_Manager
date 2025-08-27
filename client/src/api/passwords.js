import { baseApi } from "./base";

// @route    GET /passwords
// @desc     Get all passwordss
// @access   Private - Public For Now
export function getPasswords(options) {
  return baseApi.get("passwords", options).then((res) => res.data);
}

// @route    GET /passwords/:id
// @desc     Get passwords by id
// @access   Private - Public For Now
export function getPassword(id, options) {
  return baseApi.get(`passwords/${id}`, options).then((res) => res.data);
}

// @route    PUT /passwords/:id
// @desc     Update passwords by id
// @access   Private - Public For Now
export function editPassword(id, options) {
  return baseApi.put(`passwords/${id}`, options).then((res) => res.data);
}

// @route    DELETE /passwords/:id
// @desc     Delete passwords by id
// @access   Private - Public For Now
export function deletePassword(id) {
  return baseApi.delete(`passwords/${id}`, { method: "DELETE" }).then(() => {
    window.location.replace("/dashboard");
  });
}
