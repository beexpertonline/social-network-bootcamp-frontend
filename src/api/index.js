import UserAPI from "./user";

const API_URL = process.env.REACT_APP_API_URL;

export function buildURL(path) {
  if (path[0] !== "/") {
    path = `/${path}`;
  }
  return `${API_URL}${path}`;
}

export { UserAPI };
