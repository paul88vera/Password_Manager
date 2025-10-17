import { baseApi } from "./base";

/**
 * @route     GET /organizations
 * @returns   Get all organizations
 * @access    Private
 */
export function getOrgs() {
  return baseApi.get("org").then((res) => res.data);
}

/**
 * @route     GET /organizations/:id
 * @returns   Get one organization by id
 * @access    Private
 */
export function getOrg(id, options) {
  return baseApi.get(`org/${id}`, options).then((res) => res.data);
}
/**
 * @route     UPDATE /organizations/:id
 * @returns   Edit one organization by id
 * @access    Private
 */
export function editOrg(id, data, options) {
  return baseApi.get(`org/${id}`, data, options).then((res) => res.data);
}
