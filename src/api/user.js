import { buildURL } from "./index";

/**
 * @typedef {Object} LoginPayload
 * @property {String} emailOrUsername
 * @property {String} password
 *
 * Sign in user and return token
 * @param {LoginPayload} payload
 * @returns {String} token
 */
const signIn = async (payload) => {
  try {
    const response = await fetch(buildURL("/user/signin"), {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json",
      },
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }

    return response.json();
  } catch (e) {
    throw new Error(e.message);
  }
};

export default { signIn };
