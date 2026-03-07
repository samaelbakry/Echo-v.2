import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getUserData() {
  const token = localStorage.getItem("token");

  const data = await axios.get(`${API_BASE_URL}/users/profile-data`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
export async function getUserPosts(userId:string) {
  const token = localStorage.getItem("token");

  const data = await axios.get(`${API_BASE_URL}/users/${userId}/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
