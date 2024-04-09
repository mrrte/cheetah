import apiClient from "../apiClient";


export const getCurrentUser = async(data) => {
    try {
      const response = await apiClient.post(`/user/currentUser`, data);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  // /create-user


  export const createUser = async(data) => {
    try {
      const response = await apiClient.post(`/user/create-user`, data);
      return response.data;
    } catch (error) {
      return error;
    }
  };


  export const logInUser = async(data) => {
    try {
      const response = await apiClient.post(`/user/sign-in`, data);
      return response.data;
    } catch (error) {
      return error;
    }
  };
