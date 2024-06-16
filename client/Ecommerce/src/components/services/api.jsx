import axios from "axios";
import Product from "../elements/product";

const API_URL="http://localhost:8000/api/v1";

export const login = async(data)=>{
    try {
        const response = await axios.post(`${API_URL}/login`,data, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          return response.data;
    } catch (error) {
        throw error;
    }
}
 
export const userinfo = async()=>{
    try {
        const token = localStorage.getItem("PrimeplazaToken");
        const config = {
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`${API_URL}/userInfo`, config);
        return response.data;
      } catch (error) {
        throw error;
      }
}

export const menproducts = async ()=>{
  try {
    const response = await axios.get(`${API_URL}/getMenFashionProducts`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; 
  } catch (error) {
    console.log(error);
  }
}

export const getFilteredData = async (data) => {
    try {
      const concatenatedString = data.join(",");
      const response = await axios.get(`${API_URL}/getMenFilterProducts?subCatogaries=${concatenatedString}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
}

export const getPriceFilteredData = async (data) => {
  try {
    const concatenatedString = data;
    const response = await axios.get(`${API_URL}/getMenFilterProducts?priceRange=${concatenatedString}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getcolorFilteredData = async (data) => {
  try {
    const concatenatedString = data.join(",");
    const response = await axios.get(`${API_URL}/getMenFilterProducts?color=${concatenatedString}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getsortFilteredData = async (data) => {
  try {
    const response = await axios.get(`${API_URL}/getMenFilterProducts?sort=${data}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}