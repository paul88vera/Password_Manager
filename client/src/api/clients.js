import { baseApi } from "./base";

// @route    GET /Client
// @desc     Get all Client
// @access   Private - Public For Now
export function getClients() {
  return baseApi.get("client").then((res) => res.data);
}

// @route    GET /Client/:id
// @desc     Get Client by id
// @access   Private - Public For Now
export function getClient(id, options) {
  return baseApi.get(`client/${id}`, options).then((res) => res.data);
}

// @route    PUT /Client/:id
// @desc     Update Client by id
// @access   Private - Public For Now
export function editClient(id, options) {
  return baseApi.put(`client/${id}`, options).then((res) => res.data);
}

// @route    POST /Client
// @desc     Create Client
// @access   Private - Public For Now
export function createClient(data, options) {
  return baseApi.put(`client`, data, options).then((res) => res.data);
}

// @route    DELETE /Client/:id
// @desc     Delete Client by id
// @access   Private - Public For Now
export function deleteClient(id) {
  return baseApi.delete(`client/${id}`, { method: "DELETE" }).then(() => {
    window.location.replace("/dashboard");
  });
}
