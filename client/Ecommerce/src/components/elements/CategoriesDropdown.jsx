import {Link} from "react-router-dom";

function CategoriesDropdown () {
    return (
        <>
            <div className="grid gap-1 grid-cols-3 h-full">
                <div className="flex flex-col">
                    <div className="roboto text-txt font-semibold text-left border-b-2 pb-2 pl-3 pt-1">
                        <Link to="/men">Men's</Link>
                    </div>
                    <div>
                         <ul className="text-left flex flex-col gap-1 h-40 flex-wrap">
                             <li className="hover:text-txt_col  cursor-pointer w-fit pl-3 pt-1" >
                                Shirts</li>
                                <li className="hover:text-txt_col cursor-pointer pl-3 pt-1">
                                Pants</li> 
                                <li className="hover:text-txt_col cursor-pointer pl-3 pt-1">
                                Jackets</li> 
                                <li className="hover:text-txt_col cursor-pointer pl-3 pt-1">
                                Wallets</li> 
                                <li className="hover:text-txt_col cursor-pointer pl-3 pt-1">
                                Belts</li> 
                                <li className="hover:text-txt_col cursor-pointer pl-3 pt-1">
                                Shoes</li>   
                                <li className="hover:text-txt_col cursor-pointer pl-3 pt-1">
                                T-Shirts</li>                
                            </ul>
                    </div>
                </div>
                <div className="">
                    <div className="roboto text-txt font-semibold text-left border-b-2 pb-2 pl-3 pt-1">
                        <Link to="/">Women's</Link>
                    </div>
                    <div>
                         <ul className="text-left flex flex-col gap-1 h-40 flex-wrap">
                             <li className="hover:text-txt_col cursor-pointer w-fit pl-3 pt-1" >
                                Dresses</li>
                                <li className="hover:text-txt_col cursor-pointer pl-3 pt-1">
                                Pants</li> 
                                <li className="hover:text-txt_col cursor-pointer pl-3 pt-1">
                                Handbags</li> 
                                <li className="hover:text-txt_col cursor-pointer pl-3 pt-1">
                                Bottoms</li> 
                                <li className="hover:text-txt_col cursor-pointer pl-3 pt-1">
                                Saree</li> 
                                <li className="hover:text-txt_col cursor-pointer pl-3 pt-1">
                                Tops</li>   
                                <li className="hover:text-txt_col cursor-pointer pl-3 pt-1">
                                Jewelry</li>
                                <li className="hover:text-txt_col cursor-pointer pl-3 pt-1">
                                Footwear</li>                 
                            </ul>
                    </div>
                </div>
                <div className="">
                    <div className="roboto text-txt font-semibold text-left border-b-2 pb-2 pl-3 pt-1">
                        <Link to="/">Kid's</Link>
                    </div>
                    <div>
                         <ul className="text-left flex flex-col gap-1 h-40 flex-wrap">
                             <li className="hover:text-txt_col  cursor-pointer w-fit pl-3 pt-1" >
                                Shirts</li>
                                <li className="hover:text-txt_col  cursor-pointer pl-3 pt-1">
                                Pants</li> 
                                <li className="hover:text-txt_col cursor-pointer pl-3 pt-1">
                                Jackets</li> 
                                <li className="hover:text-txt_col  cursor-pointer pl-3 pt-1">
                                Caps</li> 
                                <li className="hover:text-txt_col  cursor-pointer pl-3 pt-1">
                                Belts</li> 
                                <li className="hover:text-txt_col  cursor-pointer pl-3 pt-1">
                                Shoes</li>   
                                <li className="hover:text-txt_col  cursor-pointer pl-3 pt-1">
                                T-Shirts</li>                
                            </ul>
                    </div>  
                </div>
            </div>
        </>
    );
}

export default CategoriesDropdown;