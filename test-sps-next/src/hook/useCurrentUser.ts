import { GetUsersTypes } from '@/@types/get-users-types';
import { create } from 'zustand'
type State = {
    currentUser: GetUsersTypes;
    setCurrentUser: (userId: GetUsersTypes) => void;
}
export const useCurrentUser = create<State>((set) => ({
    currentUser: {
        id: "",
        email: "",
        name: "",
        type: ""
    },
    setCurrentUser: (value) => set({ currentUser: value })

}))