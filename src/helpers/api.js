import axios from "axios";

const baseUrl = "https://private-bbbe9-blissrecruitmentapi.apiary-mock.com";

export const getHealth = () => {
  return axios
    .get(`${baseUrl}/health`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.error(error));
};

export const listQuestions = (limit, offset, filter) => {
  return axios
    .get(
      `${baseUrl}/questions?limit=${limit}&offset=${offset}&filter=${filter}`
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.error(error));
};

export const getQuestion = (id) => {
  return axios
    .get(`${baseUrl}/questions/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.error(error));
};

export const shareList = (email, url) => {
  return axios
    .post(`${baseUrl}/share?destination_email=${email}&content_url=${url}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.error(error));
};

export const updateQuestion = (id, data) => {
  return axios.put(`${baseUrl}/questions/${id}`, data)
  .then((res) => {
    return
  })
  .catch((error) => console.log(error))
};
