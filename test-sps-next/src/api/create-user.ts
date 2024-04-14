import { http } from "@/services/api"

type Payload = {
    name: string
    email: string,
    type: 'ADMIN' | 'DEFAULT'
    password: string
}
export async function createUser({ name, email, type, password }: Payload) {
    const res = await http.post(`/users`, {
        name,
        email,
        type,
        password
    })
    return res
}