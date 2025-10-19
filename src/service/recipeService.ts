import axios from "axios";

export const getAllRecipes = async() => {
    const res = await axios.get(`${import.meta.env.VITE_API_KEY}/recipe/getAllRecipes`);
    return res.data;
};