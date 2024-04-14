import { http } from "@/services/api"

export async function getUsers() {
    const res = await http.get(`/users`)
    return res.data
}