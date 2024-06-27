import Navbar from "../elements/navbar";
import {useParams,useNavigate} from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useEffect,useState} from "react";
import {getsingleproductdata,addcartproduct,userinfo} from "../services/api";
import { BsBagHeart } from "react-icons/bs";
import Footer from "../elements/footer";


function card() {
    const { id }= useParams();
    const [filteredproduct,setfilteredproduct]=useState([]);
    const [arating,setrating]=useState([]);
    const [sizee,setsize]=useState([]);
    const [quantity,setquantity]=useState([]);
    const navigate = useNavigate();
    const [selectedSize, setSelectedSize] = useState(false);
    const [userIdd,setuserId]=useState("");

    useEffect(()=>{
        const getsingledata = async () =>{
            const data=await getsingleproductdata(id);
            setfilteredproduct(data.product[0]);
            setrating(data.product[0].rating);
            setsize(data.product[0].quantityAvailable.size);
            setquantity(data.product[0].quantityAvailable.quantity);
        }
        getsingledata();
    },[id])

    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const data = await userinfo();
          setuserId(data.user.userId);
        } catch (error) {}
      };
      fetchUserInfo();
    }, []);

    const handelcart = async () => {
      try { 
        if(selectedSize){
          const data ={
            name:filteredproduct.name,
            price:filteredproduct.price,
            discription:filteredproduct.discription,
            quantityAvailable:{
                size:selectedSize,
                quantity:filteredproduct.quantity
            },
            imgUrl:filteredproduct.imgUrl,
            subCatogaries:filteredproduct.subCatogaries,
            Catogarie:filteredproduct.Catogarie,
            brandName:filteredproduct.brandName,
            color:filteredproduct.color,
            rating:filteredproduct.arating,
            averageRating:filteredproduct.averageRating,
            quan:1,
            userId:userIdd
         };
         const product=await addcartproduct(data);
         navigate(`/cart`);
        }
        else{
          
        }
      } catch (error) {
          console.log(error);
      }
    }


    return (
        <>
            <Navbar/>
            <div className="flex h-[80vh]">
                <div className="w-[45vw] border-r-2 flex items-center justify-center">
                    <img src={filteredproduct.imgUrl} alt="dog" className="w-[450px] h-[500px]" />
                </div>
                <div className="w-[55vw] flex flex-col p-6">
                    <span className="text-2xl font-normal text-txt">{filteredproduct.brandName}</span>
                    <span className="text-lg  font-bold pt-2 text-txt">{filteredproduct.name}</span>
                    <span className=" text-txt_col pt-2">
                       {filteredproduct.discription}
                    </span>
                    <div className="pt-2 text-lg flex flex-col">
                        <span className="text-txt">Rs.{filteredproduct.price}</span>
                        <span className="pt-2 text-txt">Color - {filteredproduct.color}</span>
                    </div>
                    <div className="flex pt-2 items-center">
                    {arating.map((x, index) => (
                        x === 1
                    ? <FaStar key={index} className="text-yellow-500 h-4 w-4 ml-1" />
                    : <FaStar key={index} className="text-gray-300 h-4 w-4 ml-1" />
                    ))}
                        <span className="pl-2">{filteredproduct.averageRating}</span>
                    </div>
                    <div className="pt-2 pl-1 text-txt">
                    <span>Size</span>
                    </div>
                    <div className="flex gap-2 flex-wrap pt-2">
                    {sizee.map((size, index) =>
                      quantity[index] > 0 ? (
                        <button
                          className={`py-1 px-2 border-2 border-gray-300 rounded-t-lg hover:scale-110 w-12 text-sm ${
                            size === selectedSize ? "bg-page_theam text-txt" : ""
                          }`}
                          key={index}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ) : (
                        <button
                          className={`py-0.5 px-1 w-8 text-xs line-through`}
                          disabled
                          key={index}
                        >
                          {size}
                        </button>
                      )
                    )}
                  </div>
                  <div className="flex mt-6">
                    <div className="mr-4" onClick={handelcart}>
                    <button type='button'
                    class='flex break-inside mt-7 bg-log_btn text-white border-2 border-transparent rounded-3xl px-6 py-3 mb-4 w-80 dark:bg-slate-800 dark:text-white'>
                    <div class='m-auto'>
                    <div class='flex items-center justify-start flex-1 space-x-4'>
                     <BsBagHeart className="w-26 h-26"/>   
                    <span class='font-medium mb-[-3px]'>Add to cart</span>
                    </div>
                    </div>
                     </button>
                    </div>
                    <div className="ml-2">
                    <button type='button'
                    class='flex break-inside mt-7 outline border-log_btn text-txt hover:bg-log_btn hover:text-white border-2 border-transparent rounded-3xl px-6 py-3 mb-4 w-80 dark:bg-slate-800 dark:text-white'>
                    <div class='m-auto'>
                    <div class='flex items-center justify-start flex-1 space-x-4'>
                    <span class='font-medium mb-[-3px]'>Buy Now</span>
                    </div>
                    </div>
                     </button>
                    </div>
                  </div>
                </div>
            </div>
            <div className="mt-10"> 
                <Footer/>
            </div>
        </>
    );
}

export default card;