import apiClient from "../apiClient";


export const googleLogIn = async(data) => {
    try {
      const response = await apiClient.post(`/auth/google-sso`, data);
      return response.data;
    } catch (error) {
      return error;
    }
  };
