import type { AllCommentsDataType } from "@/types/commentsType";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BASE_URL

export async function getAllComments(id:string) {
    const token = localStorage.getItem("token")
    const response = await axios.get<AllCommentsDataType>(`${API_BASE_URL}/posts/${id}/comments?page=1&limit=10`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response.data
}
export async function createComment(postId:string , formData:FormData) {
    const token = localStorage.getItem("token")
    const response = await axios.post(`${API_BASE_URL}/posts/${postId}/comments`, formData, {
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response.data
}
export async function updateComment(postId:string , formData:FormData , commentId:string) {
    const token = localStorage.getItem("token")
    const response = await axios.put(`${API_BASE_URL}/posts/${postId}/comments/${commentId}`, formData, {
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response.data
}
export async function deleteComment(postId:string , commentId:string) {
    const token = localStorage.getItem("token")
    const response = await axios.delete(`${API_BASE_URL}/posts/${postId}/comments/${commentId}`, {
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response.data
}
export async function likeComment(postId:string , commentId:string) {
    const token = localStorage.getItem("token")
    const response = await axios.put(`${API_BASE_URL}/posts/${postId}/comments/${commentId}/like`,{}, {
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response.data
}
export async function createReply(postId:string , commentId:string , formData:FormData) {
    const token = localStorage.getItem("token")
    const response = await axios.post(`${API_BASE_URL}/posts/${postId}/comments/${commentId}/replies`,formData, {
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response.data
}
export async function getCommentReplies(postId:string , commentId:string) {
    const token = localStorage.getItem("token")
    const response = await axios.get(`${API_BASE_URL}/posts/${postId}/comments/${commentId}/replies?page=1&limit=10`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response.data
}



