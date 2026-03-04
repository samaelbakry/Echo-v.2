import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BASE_URL


export async function getAllNotifications() {
    const token = localStorage.getItem("token")
    const response = await axios.get(`${API_BASE_URL}/notifications?unread=false&page=1&limit=10`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response.data
}
export async function markAllNotificationsAsRead() {
    const token = localStorage.getItem("token")
    const response = await axios.patch(`${API_BASE_URL}/notifications/read-all`,{},{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response.data
}
