import { buildURL } from "./index";

export const getAuthUser = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(buildURL("/me"), {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const { message } = await response.json();
      if (message === "Couldn't authenticate user") {
        return null;
      }
      throw new Error(message);
    }

    return response.json();
  } catch (e) {
    throw new Error(e.message);
  }
};
