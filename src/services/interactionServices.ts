import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BASE_URL

export async function addLike(postId:string) {
    const token = localStorage.getItem("token")
    const response = await axios.put(`${API_BASE_URL}/posts/${postId}/like`,{},{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response.data
}
export async function followAction(followUserId:string) {
    const token = localStorage.getItem("token")
    const response = await axios.put(`${API_BASE_URL}/users/${followUserId}/follow`,{},{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response.data
}
export async function getFollowSuggestions() {
    const token = localStorage.getItem("token")
    const response = await axios.get(`${API_BASE_URL}/users/suggestions?limit=5`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response.data
}
export async function savePost(postId:string) {
    const token = localStorage.getItem("token")
    const response = await axios.put(`${API_BASE_URL}/posts/${postId}/bookmark`,{},{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response.data
}

export async function getAllSavedPosts() {
    const token = localStorage.getItem("token")
    const response = await axios.get(`${API_BASE_URL}/users/bookmarks`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response.data
}