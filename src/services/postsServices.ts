import type { DataType } from "@/types/postsType";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BASE_URL


export async function getAllPosts() {
    const token = localStorage.getItem("token")
    const response = await axios.get<DataType>(`${API_BASE_URL}/posts`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response.data
}

export async function getSinglePostId(id:string) {
    const token = localStorage.getItem("token")
    const response = await axios.get<DataType>(`${API_BASE_URL}/posts/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response.data
}
export async function createNewPost(formData:any) {
    const token = localStorage.getItem("token")
    const response = await axios.post(`${API_BASE_URL}/posts`, formData ,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response.data
}
export async function addLike(postId:string) {
    const token = localStorage.getItem("token")
    const response = await axios.put(`${API_BASE_URL}/posts/${postId}/like`,{},{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response.data
}