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



