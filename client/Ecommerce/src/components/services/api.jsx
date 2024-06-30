import axios from "axios";
import Product from "../elements/product";

// const API_URL="http://localhost:8000/api/v1";
const API_URL="https://primeplaza.onrender.com/api/v1";


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

export const user_signup = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.log('Error during company registration:', error.response.data.msg);
    return error.response.data;
  }
};
 
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

export const womenproducts = async ()=>{
  try {
    const response = await axios.get(`${API_URL}/getWomenFashionProducts`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; 
  } catch (error) {
    console.log(error);
  }
}

export const kidsproducts = async ()=>{
  try {
    const response = await axios.get(`${API_URL}/getKidsFashionProducts`, {
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

export const getWomenFilteredData = async (data) => {
  try {
    const concatenatedString = data.join(",");
    const response = await axios.get(`${API_URL}/getWomenFilterProducts?subCatogaries=${concatenatedString}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getKidsFilteredData = async (data) => {
  try {
    const concatenatedString = data.join(",");
    const response = await axios.get(`${API_URL}/getKidsFilterProducts?subCatogaries=${concatenatedString}`, {
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

export const getWomenPriceFilteredData = async (data) => {
  try {
    const concatenatedString = data;
    const response = await axios.get(`${API_URL}/getWomenFilterProducts?priceRange=${concatenatedString}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getKidsPriceFilteredData = async (data) => {
  try {
    const concatenatedString = data;
    const response = await axios.get(`${API_URL}/getKidsFilterProducts?priceRange=${concatenatedString}`, {
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

export const getWomencolorFilteredData = async (data) => {
  try {
    const concatenatedString = data.join(",");
    const response = await axios.get(`${API_URL}/getWomenFilterProducts?color=${concatenatedString}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getKidscolorFilteredData = async (data) => {
  try {
    const concatenatedString = data.join(",");
    const response = await axios.get(`${API_URL}/getKidsFilterProducts?color=${concatenatedString}`, {
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

export const getWomensortFilteredData = async (data) => {
  try {
    const response = await axios.get(`${API_URL}/getWomenFilterProducts?sort=${data}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getKidssortFilteredData = async (data) => {
  try {
    const response = await axios.get(`${API_URL}/getKidsFilterProducts?sort=${data}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getsingleproductdata = async (data) => {
  try {
    const response = await axios.get(`${API_URL}/getSingleProduct?Id=${data}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const addcartproduct = async (data) =>{
  const response = await axios.post(`${API_URL}/addCartproduct`,data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data; 
}

export const cartdetail = async (data) =>{
  try {
    const response = await axios.post(`${API_URL}/getCartProducts`,data ,{
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const deleteSingleproduct = async (data)=>{
  try {
    const response = await axios.delete(`${API_URL}/deleteSingleProduct/${data}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}


export const addquantity = async (data)=>{
  try {
      const action=data.action;
      const id = data.id;
      const reqbody = {
        action:action
      }
      const response = await axios.post(`${API_URL}/updatequantity/${id}`,reqbody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
     return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const deleteAllproduct = async ()=>{
  try {
    const response = await axios.delete(`${API_URL}/deleteAllProduct`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getproductidbyName = async (data) =>{
  try {
    const response = await axios.post(`${API_URL}/getproductidbyName`,data,{
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.product[0]._id; 
  } catch (error) {
    console.log(error);
  }
}

export const email_verification = async (email)=>{
  const data = {email:email}
  try {
    const response = await axios.post(`${API_URL}/emailVerification`,data,{
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data.message  
  } catch (error) {
    console.log('Error during company registration:', error.response.data.message);
    return error.response.data.message;
  }

}

export const place_order = async (data) => {
  try {
      const token = localStorage.getItem("PrimeplazaToken");
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${API_URL}/checkoutSession`,
        data,
        config
      );
      return response.data;
  } catch (error) {
      console.error('Error in API call:', error);
      throw error;
  }
};

