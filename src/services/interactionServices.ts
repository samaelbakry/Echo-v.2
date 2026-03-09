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
export async function getPostLikes(postId:string) {
    const token = localStorage.getItem("token")
    const response = await axios.get(`${API_BASE_URL}/posts/${postId}/likes?page=1&limit=20`,{
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
export async function sharePost(postId:string , shareText:string) {
    const token = localStorage.getItem("token")
    const response = await axios.post(`${API_BASE_URL}/posts/${postId}/share`, shareText ,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response.data
}

export async function uploadNewProfilePhoto(formData:FormData) {
    const token = localStorage.getItem("token")
    const response = await axios.put(`${API_BASE_URL}users/upload-photo`, formData ,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response.data
}
