import { http } from "@/services/api"

export async function deleteUser(id: string) {
    const response = await http.delete(`/users/${id}`)
    if (response) {
        return response.status
    }
}