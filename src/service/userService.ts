import axios from "axios"

export const loginUser = (email: string, password: string) => {
    return axios.get(`${import.meta.env.VITE_API_KEY}/users/loginUsers/${email}/${password}`);
}