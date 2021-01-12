import { buildURL } from "./index";

export const uploadFile = async (filename, file) => {
  try {
    const url = buildURL(`/files/${filename}`);
    const response = await fetch(url, {
      method: "POST",
      body: file,
      headers: {
        "Content-type": file.type,
      },
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }

    return url;
  } catch (e) {
    throw new Error(e.message);
  }
};
