import axiosClient from "./axiosClient";

const productApi = {
  getAll: (params) => {
    const url = "/photos";
    return axiosClient.get(url, { params });
  },
  get: (id) => {
    const url = `/photos/${id}`;
    return axiosClient.get(url);
  },
};

export default productApi;
