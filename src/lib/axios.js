import axios from 'axios';
// import AxiosMockAdapter from 'axios-mock-adapter';

const axiosInstance = axios.create({
  baseURL: 'http://ec2-52-91-38-168.compute-1.amazonaws.com:8080/indevhub'
});

axiosInstance.interceptors.response.use((response) => response,
  (error) => {
    console.log('erroryyyyy');
    console.log(error);
    return Promise.reject((error.response && error.response.data) || 'Something went wrong111');
  });

// export const mock = new AxiosMockAdapter(axiosInstance, { delayResponse: 0 });

export default axiosInstance;
