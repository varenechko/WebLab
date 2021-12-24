import { AxiosInstance } from "./axios";

export const sendGetRequest = async (url: string) => {
  try {
    const response = await AxiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error();
  }
};

export const sendPostRequest = async (url: string, body: object) => {
  try {
    await AxiosInstance.post(url, body);
  } catch (error) {
    console.error();
  }
};

export const sendEditRequest = async (url: string, body: object) => {
  try {
    await AxiosInstance.put(url, body);
  } catch (error) {
    console.error();
  }
};

export const sendDeleteRequest = async (id: string) => {
  try {
    await AxiosInstance.delete(`order/Delete?id=${id}`);
  } catch (error) {
    console.error();
  }
};
