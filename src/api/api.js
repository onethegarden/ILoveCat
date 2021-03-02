const API_ENDPOINT =
  'https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev';

const request = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const error = await response.json();
      throw error;
    }
  } catch (e) {
    throw {
      message: e.message,
    };
  }
};

export const api = {
  fetchCats: (keyword) => {
    try {
      return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
    } catch (e) {
      console.log(error);
    }
  },
  fetchCatDetail: (id) => {
    try {
      return request(`${API_ENDPOINT}/api/cats/${id}`);
    } catch (e) {
      console.log(error);
    }
  },
  randomCat: () => {
    try {
      return request(`${API_ENDPOINT}/api/cats/random50`);
    } catch (e) {
      console.log(error);
    }
  },
};
