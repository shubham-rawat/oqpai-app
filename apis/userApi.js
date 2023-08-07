import axios from "axios";

const PUBLIC_API = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Get UserData
export async function registerUser(user) {
  try {
    const {
      firstName,
      lastName,
      username,
      phoneNumber,
      hash,
      city,
      fcm_token,
    } = user;
    const response = await PUBLIC_API.post(`/users/register`, {
      firstName,
      lastName,
      username,
      phoneNumber,
      hash,
      city,
      fcm_token,
    });
    return response.data;
  } catch (err) {
    return err.respose;
  }
}
