import { baseApi } from "./base";

// @route    GET /Client
// @desc     Get all Client
// @access   Private - Public For Now
export function getAllClient(options) {
  return baseApi.get("client", options).then((res) => res.data);
}

// @route    GET /Client/:id
// @desc     Get Client by id
// @access   Private - Public For Now
export function getClient(id, options) {
  return baseApi.get(`client/${id}`, options).then((res) => res.data);
}
