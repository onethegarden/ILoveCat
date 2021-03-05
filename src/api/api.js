const API_ENDPOINT =
  'https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev';

const request = async (url) => {
  const response = await fetch(url);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(response.status);
  }
};

export const api = {
  fetchCats: (keyword) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
  },
  fetchCatDetail: (id) => {
    return request(`${API_ENDPOINT}/api/cats/${id}`);
  },
  randomCat: () => {
    return request(`${API_ENDPOINT}/api/cats/random50`);
  },
};
