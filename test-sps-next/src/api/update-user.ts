import { http } from "@/services/api"

type Payload = {
    id: string
    name?: string
    email?: string,
    type?: 'ADMIN' | 'DEFAULT'
    password?: string
}
export async function updateUser({ id, name, email, type, password }: Payload) {

    const res = await http.patch(`/users/${id}`, {
        name,
        email,
        type,
        password
    })
    return res
}