import type { loginSchemaType, registerSchemaType } from "@/lib/AuthSchema.ts/authSchema";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BASE_URL

export async function registerForm(formData:registerSchemaType) {
    const data = await axios.post(`${API_BASE_URL}/users/signup` , formData ,{
        headers:{
            "Content-Type": "application/json"
        }
    })
    return data
}

export async function loginForm(formData:loginSchemaType) {
    const data = await axios.post(`${API_BASE_URL}/users/signin` , formData)
    return data
}

export async function changeUserPassword(passwordObj:{password?:string , newPassword?:string}) {
    const token = localStorage.getItem("token")
    const data = await axios.patch(`${API_BASE_URL}/users/change-password` , passwordObj ,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return data
}