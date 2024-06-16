import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";

function Product ({data}) {
    return (
        <>
            <div className="w-56 hover:scale-95 mb-5 ml-2 cursor-pointer transition-all duration-200 flex flex-col">
            <img className="w-[220px] h-[300px]" src={data.imgUrl} alt="product image"/>
            <div>
                <div className="flex flex-col pl-1">
                    <span className="font-semibold text-medium">{data.brandName}</span>
                    <span className="font-light text-sm">{data.name}</span>
                </div>
            </div>
            <div className="flex justify-between">
            <div className="flex items-center p-1">
                <FaStar className=" text-amber-400 text-sm"/>
                <span className=" ml-1 text-sm">{data.averageRating}</span>
            </div>
            <div className="pr-2">
                    <span className="font-semibold text-sm">Rs.{data.price}</span>
                </div>
            </div>
            </div>
        </>
    );
}

export default Product;