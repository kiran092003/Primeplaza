import Navbar from "../elements/navbar";
import { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { deleteSingleproduct, addquantity, deleteAllproduct, userinfo, cartdetail } from "../services/api";
import { RiDeleteBin2Line } from "react-icons/ri";

function Cart() {
    const [isLoading, setIsLoading] = useState(false);
    const [CartData, setCartData] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [userIdd, setUserId] = useState("");

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const data = await userinfo();
                setUserId(data.user.userId);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserInfo();
    }, []);

    useEffect(() => {
        const fetchCartInfo = async () => {
            if (userIdd) {
                try {
                    setIsLoading(true);
                    const value = { userId: userIdd };
                    const data = await cartdetail(value);
                    setCartData(data.products);
                } catch (error) {
                    console.log(error);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchCartInfo();
    }, [userIdd]);

    const handleQuantityIncrement = async (id) => {
        try {
            const actionId = { id: id, action: "increment" };
            await addquantity(actionId);
            fetchCartInfo();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDecQua = async (id) => {
        try {
            const actionId = { id: id, action: "decrement" };
            await addquantity(actionId);
            fetchCartInfo();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteSingleItem = async (id) => {
        try {
            await deleteSingleproduct(id);
            fetchCartInfo();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteAll = async () => {
        try {
            await deleteAllproduct();
            fetchCartInfo();
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCartInfo = async () => {
        try {
            setIsLoading(true);
            const value = { userId: userIdd };
            const data = await cartdetail(value);
            setCartData(data.products);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    let total = 0;
    CartData.map((x) => {
        total += x.price * x.quan;
    });

    return (
        <>
            <Navbar />
            <div className="flex">
                <div className="w-[60vw] flex flex-col">
                    <div className="p-4 border-b-2 ml-4 flex items-center justify-between">
                        <span className="text-2xl font-semibold">Shopping Cart</span>
                        <RiDeleteBin2Line className="text-2xl mt-3 cursor-pointer" onClick={handleDeleteAll} />
                    </div>
                    <div className="flex flex-col w-full h-fit flex-wrap gap-1">
                        {CartData.length > 0 ? (
                            CartData.map((product) => (
                                <div key={product._id}>
                                    <div className="flex w-[95%] justify-between h-48  ml-4 mt-3 rounded-lg border border-gray-200 bg-white shadow-sm">
                                        <div>
                                            <img src={product.imgUrl} alt="img" className="w-36 h-40 rounded-sm ml-3 mt-4" />
                                        </div>
                                        <div className="flex flex-col mr-16 mt-4">
                                            <span className="font-semibold text-xl">{product.brandName}</span>
                                            <span className="mt-1">{product.name}</span>
                                            <span className="mt-1">Size: {product.quantityAvailable.size}</span>
                                            <div className="mt-1">
                                                <span className="text-gray-400">Color:</span>
                                                <span className="pl-1">{product.color}</span>
                                            </div>
                                            <div className="mt-3 cursor-pointer" onClick={() => handleDeleteSingleItem(product._id)}>
                                                <span className="text-red-600 hover:border-b border-red-600">Remove</span>
                                            </div>
                                        </div>
                                        <div className="flex mt-[85px] mr-20">
                                            <div className="flex flex-col gap-4 items-center w-full h-full">
                                                <div className="flex items-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDecQua(product._id)}
                                                        className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200"
                                                    >
                                                        <FaMinus className="text-gray-600 text-sm" />
                                                    </button>
                                                    <p className="w-10 text-center text-sm font-medium text-gray-900">
                                                        {product.quan}
                                                    </p>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleQuantityIncrement(product._id)}
                                                        className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200"
                                                    >
                                                        <FaPlus className="text-gray-600 text-sm" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mr-4 flex items-center">
                                            <span className="text-lg">Price:</span>
                                            <span className="ml-1">&#8377;{product.price * product.quan}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center w-full mt-10">No products available</p>
                        )}
                    </div>
                </div>
                <div className="w-[40vw] p-20">
                    <div className="w-[400px] h-96 space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                        <div className="border-b-2 p-2">
                            <span className="text-2xl font-semibold">Order summary</span>
                        </div>
                        <div className="flex justify-between mt-5">
                            <span className="text-lg">Delivery</span>
                            <span className="text-lg">&#8377;100</span>
                        </div>
                        <div className="flex justify-between mt-5">
                            <span className="text-lg">Tax</span>
                            <span className="text-lg">&#8377;20</span>
                        </div>
                        <div className="flex justify-between mt-5 border-b-2 pb-3">
                            <span className="text-lg">Subtotal</span>
                            <span className="text-lg">&#8377;{total}</span>
                        </div>
                        <div className="flex justify-between mt-5 border-b-2 pb-3">
                            <span className="text-lg">Total</span>
                            <span className="text-lg">&#8377;{total + 120}</span>
                        </div>
                        <div>
                            <button type="submit" className="w-80 ml-5 bg-log_btn mt-3 py-2 rounded-2xl text-white font-semibold mb-2">
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;
