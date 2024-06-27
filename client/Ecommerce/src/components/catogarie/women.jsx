import Navbar from "../elements/navbar";
import Footer from "../elements/footer";
import { IoIosArrowDown } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { useState,useEffect } from "react";
import {womenproducts,getWomenFilteredData,getWomenPriceFilteredData,getWomencolorFilteredData,getWomensortFilteredData,userinfo} from "../services/api";
import Product from "../elements/product";
import { FaEarlybirds } from "react-icons/fa6";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

function Women(){

    const [isLoading, setIsLoading] = useState(false);
    const [productsData, setUserData] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedColor, setSelectedColor] = useState([]);
    const [minval,setminval]=useState("");
    const [maxval,setmaxval]=useState("");  
    const [Loading, setLoading] = useState(false);
    const [sortdropdown,setdortdropdown]=useState(false);
    const [selectedsort,setselectedsort]=useState("");
    const navigate = useNavigate();
    const [userinfoo, setUserinfoo] = useState(null);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const fetchWomenInfo = async () => {
            try { 
                setIsLoading(true);
                const data = await womenproducts();
                setUserData(data.products);
            } catch (error) {
                console.log(error);
            }
            finally{
                setIsLoading(false);
            }
        };
        fetchWomenInfo();
      }, []);

      const fetchdata = async () => {
        try { 
            setIsLoading(true);
            const data = await womenproducts();
            setUserData(data.products);
        } catch (error) {
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
      }

      useEffect(() => {
        const fetchUserInfo = async () => {
          try {
            const data = await userinfo();
            setUserinfoo(data.user);
            setIsLogin(true);
          } catch (error) {
            console.log(error);
          }
        };
        fetchUserInfo();
      }, []);

      const handleChange = async (id) => {
        if(isLogin){
            navigate(`/card/${id}`);   
        }
        else{
            navigate(`/userlogin`)
        }
        };

      const handleCheckbox =async (event) => {
        const isChecked = event.target.checked;
        const subCategory = event.target.value;
    
        if (isChecked) {
          setSelectedCategories([...selectedCategories, subCategory]);
        } else {
          setSelectedCategories(selectedCategories.filter((item) => item !== subCategory));
        }
       
      };

      const handleColor = async (event) =>{
            const isChecked = event.target.checked;
            const color = event.target.value;
            if (isChecked) {
                setSelectedColor([...selectedColor, color]);
              } else {
                setSelectedColor(selectedColor.filter((item) => item !== color));
              }
            
      }

      const handelminval = async (event) => {
            setminval(event.target.value);
      }

      const handelmaxval = async (event) =>{
            setmaxval(event.target.value);
      }

      const handelprice = async ()=>{
        try {
            setLoading(true)
            const pricestring=`${minval}-${maxval}`;
            const filteredData = await getWomenPriceFilteredData(pricestring);
            setUserData(filteredData.products); 
        } catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false);
        } 
      }

      useEffect(()=>{
        const demo = async ()=>{
                const filteredData= await getWomensortFilteredData(selectedsort);
                setUserData(filteredData.products); 
        }
        demo()
      },[selectedsort])

      useEffect(()=>{
        const demo = async ()=>{
                const filteredData= await getWomenFilteredData(selectedCategories);
                setUserData(filteredData.products);  
        }
        demo()
      },[selectedCategories])

      useEffect(()=>{
        const demo = async ()=>{
                const filteredData= await getWomencolorFilteredData(selectedColor);
                setUserData(filteredData.products);  
            }
        demo()
      },[selectedColor])

      if (isLoading) {
        return (
          <div className="flex flex-col w-full h-[100vh] justify-center items-center">
            <FaEarlybirds className="h-6 w-6 animate-bounce" size="30px"/>
            <span>Products are beging fetched...</span>
          </div>
        );
      }

    return (
        <>
            <Navbar/>
            <div>
                <div className="h-16 w-[97vw] pt-3 ml-5">
                    <span className="font-bold text-txt text-xl">Women's Clothing & Accessories</span>
                </div>
                <div className="h-16 w-[97vw] pt-3 ml-5 border-b-2 flex justify-between">
                    <div className="pt-3 pl-1">
                        <span className="font-semibold text-txt text-xl">FILTERS</span>
                    </div>
                    <div>
                        <div className="mr-4" onMouseLeave={() => setdortdropdown(false)}>
                            <button className="py-2 text-txt px-4 border-2 flex items-center gap-8 font-medium"  onMouseEnter={() => setdortdropdown(true)}>
                            Sort by Recommended <IoIosArrowDown />
                            </button>
                        {sortdropdown && (
                            <div className="h-[204px] w-[250px]  bg-white absolute border-2">
                                <div className="flex items-center justify-center pt-2 text-txt  pb-2 cursor-pointer hover:bg-page_theam" onClick={fetchdata}>
                                    <span>Recommended</span>
                                </div>
                                <div className="flex items-center justify-center pt-2 text-txt  pb-2 cursor-pointer hover:bg-page_theam" onClick={()=> setselectedsort("-price")}>
                                    <span>Price:High to Low</span>
                                </div>
                                <div className="flex items-center justify-center pt-2 pb-2 text-txt  cursor-pointer hover:bg-page_theam" onClick={()=> setselectedsort("price")}>
                                    <span>Price:Low to High</span>
                                </div>
                                <div className="flex items-center h-fit justify-center pt-2 pb-2 text-txt  cursor-pointer hover:bg-page_theam" onClick={()=> setselectedsort("-averageRating")}>
                                    <span>Rating:High to Low</span>
                                </div>
                                <div className="flex items-center h-fit justify-center pt-2 pb-2 text-txt  cursor-pointer hover:bg-page_theam" onClick={()=> setselectedsort("averageRating")}>
                                    <span>Rating:Low to High</span>
                                </div>
                            </div>
                        )}
                         </div>
                    </div>
                </div>
                <div className="flex h-screen p-2 ml-3 w-[97.7vw]">
                    <div className="h-screen w-[20vw]">
                        <div className="flex flex-col border-b-2 pb-3 pt-2">
                            <span className=" text-sm font-medium text-txt pl-1">SUBCATEGORY</span>
                            <div className="flex items-center p-2 pt-3">
                                <input type="checkbox" className="h-3 w-3 rounded-xl" value="Dresses"  onChange={handleCheckbox} />
                                <span className="pl-2 text-xs font-medium text-txt ">DRESSES</span>
                            </div>
                            <div className="flex items-center p-2 pt-1">
                                <input type="checkbox" className="h-3 w-3 rounded-xl" value="Pant"  onChange={handleCheckbox}/>
                                <span className="pl-2 text-xs font-medium text-txt">PANTS</span>
                            </div>
                            <div className="flex items-center p-2 pt-1">
                                <input type="checkbox" className="h-3 w-3 rounded-xl" value="Handbag"  onChange={handleCheckbox}/>
                                <span className="pl-2 text-xs font-medium text-txt">HANDBAGS</span>
                            </div>
                            <div className="flex items-center p-2 pt-1">
                                <input type="checkbox" className="h-3 w-3 rounded-xl" value="Saree"  onChange={handleCheckbox}/>
                                <span className="pl-2 text-xs font-medium text-txt">SAREES</span>
                            </div>
                            <div className="flex items-center p-2 pt-1">
                                <input type="checkbox" className="h-3 w-3 rounded-xl" value="Tops"  onChange={handleCheckbox}/>
                                <span className="pl-2 text-xs font-medium text-txt">TOPS</span>
                            </div>
                            <div className="flex items-center p-2 pt-1">
                                <input type="checkbox" className="h-3 w-3 rounded-xl" value="Footware"  onChange={handleCheckbox}/>
                                <span className="pl-2 text-xs font-medium text-txt">FOOTWARE</span>
                            </div>
                        </div>
                        <div className="flex flex-col border-b-2 pb-3 pt-3">
                            <span className=" text-sm font-medium pl-1 text-txt">PRICE RANGE</span>
                            <div className="flex items-center">
                                <div className="flex items-center pl-0 pb-3 pt-3">
                                    <span className="p-1">Rs.</span>
                                    <input
                                    type="text"
                                    className=" w-20 py-2 px-5 outline-none bg-page_theam  text-[0.8rem] placeholder-txt_col rounded-md"
                                    placeholder="Min" onChange={handelminval}
                                    />
                                </div>
                                <div className="pl-5">
                                    <span className="text-2xl text-txt">-</span>
                                </div>
                                <div className="flex items-center pl-4 pb-3 pt-3">
                                    <span className="p-1 text-txt">Rs.</span>
                                    <input
                                    type="text"
                                    className=" w-20 py-2 px-5  bg-page_theam outline-none text-[0.8rem] placeholder-txt_col rounded-md"
                                    placeholder="Max" onChange={handelmaxval}
                                    />
                                </div>
                            </div>
                            <div>
                            <button type="submit" className=" w-24 bg-log_btn mt-3  py-2 rounded-2xl text-white font-semibold mb-2" onClick={handelprice}>
                                    {!Loading ? (
                                        "Filter"
                                      ) : (
                                        <CgSpinnerTwoAlt className="text-white w-6 h-6 animate-spin ml-36" />
                                      )}
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col border-b-2 pb-3 pt-3">
                            <span className=" text-sm font-medium pl-1 text-txt">COLOR</span>
                            <div className="flex items-center p-2 pt-3">
                                <input type="checkbox" className="h-3 w-3 rounded-xl" value="Blue"  onChange={handleColor} />
                                <span className="pl-2 text-xs font-medium text-txt ">BLUE</span>
                            </div>
                            <div className="flex items-center p-2 pt-1">
                                <input type="checkbox" className="h-3 w-3 rounded-xl" value="White"  onChange={handleColor}/>
                                <span className="pl-2 text-xs font-medium text-txt">WHITE</span>
                            </div>
                            <div className="flex items-center p-2 pt-1">
                                <input type="checkbox" className="h-3 w-3 rounded-xl" value="Black"  onChange={handleColor}/>
                                <span className="pl-2 text-xs font-medium text-txt">BLACK</span>
                            </div>
                            <div className="flex items-center p-2 pt-1">
                                <input type="checkbox" className="h-3 w-3 rounded-xl" value="Brown"  onChange={handleColor}/>
                                <span className="pl-2 text-xs font-medium text-txt">BROWN</span>
                            </div>
                            <div className="flex items-center p-2 pt-1">
                                <input type="checkbox" className="h-3 w-3 rounded-xl" value="Red"  onChange={handleColor}/>
                                <span className="pl-2 text-xs font-medium text-txt">RED</span>
                            </div>
                            <div className="flex items-center p-2 pt-1">
                                <input type="checkbox" className="h-3 w-3 rounded-xl" value="Pink"  onChange={handleColor}/>
                                <span className="pl-2 text-xs font-medium text-txt">PINK</span>
                            </div>
                            <div className="flex items-center p-2 pt-1">
                                <input type="checkbox" className="h-3 w-3 rounded-xl" value="Green"  onChange={handleColor}/>
                                <span className="pl-2 text-xs font-medium text-txt">GREEN</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-screen w-full ml-5">    
                        <div className="pl-2 pt-1">
                             <div className="flex w-full h-fit flex-wrap gap-1
                             ">
                                {productsData.length > 0 ? (
                                 productsData.map((product) => (
                                 <div key={product._id} onClick={() => handleChange(product._id)}>
                                 <Product data={product} />
                                </div>
                                ))
                                 ) : (
                                 <p className="text-center w-full">No products available</p>
                                 )}
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Women;