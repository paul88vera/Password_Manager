import { baseApi } from "./base";

/**
 * @route     GET /Manager
 * @returns   Get all Managers
 * @access    Private
 */
export function getManagers() {
  return baseApi.get("manager").then((res) => res.data);
}

/**
 * @route     GET /Manager/:id
 * @returns   Get one Manager by id
 * @access    Private
 */
export function getManager(id, options) {
  return baseApi.get(`manager/${id}`, options).then((res) => res.data);
}

/**
 * @route     POST /Manager
 * @returns   Create one Manager
 * @access    Private
 */
export function createManager(data, options) {
  return baseApi.post(`manager`, data, options).then((res) => res.data);
}

/**
 * @route     UPDATE /Manager/:id
 * @returns   edit one Manager by id
 * @access    Private
 */
export function editManager(id, data, options) {
  return baseApi.put(`manager/${id}`, data, options).then((res) => res.data);
}

/**
 * @route     DELETE /Manager
 * @returns   delete Manager by id
 * @access    Private
 */
export function deleteManager(id) {
  return baseApi.delete(`manager/${id}`, { method: "DELETE" }).then(() => {
    window.location.replace("/dashboard");
  });
}
