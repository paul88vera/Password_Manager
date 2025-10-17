import { baseApi } from "./base";

/**
 * @route     GET /passwords
 * @returns   Get all passwords
 * @access    Private
 */
export function getPasswords() {
  return baseApi.get("passwords").then((res) => res.data);
}

/**
 * @route     GET /passwords/:id
 * @returns   Get one password
 * @access    Private
 */
export function getPassword(id, options) {
  return baseApi.get(`passwords/${id}`, options).then((res) => res.data);
}

/**
 * @route     PUT /passwords/:id
 * @returns   Edit one password by id
 * @access    Private
 */
export function editPassword(id, data, options) {
  return baseApi.put(`passwords/${id}`, data, options).then((res) => res.data);
}

/**
 * @route     POST /passwords
 * @returns   Create one password
 * @access    Private
 */
export function createPassword(data, options) {
  return baseApi.post("passwords", data, options).then((res) => res.data);
}

/**
 * @route     DELETE /passwords/:id
 * @returns   Delete one passwords by id
 * @access    Private
 */
export function deletePassword(id, Client) {
  return baseApi.delete(`passwords/${id}`).then(() => {
    window.location.replace(`/client/${Client}`);
  });
}
