import Navbar from "../elements/navbar";
import { useState, useEffect } from "react";
import {userinfo, cartdetail ,place_order} from "../services/api";
import {loadStripe} from '@stripe/stripe-js';
import { CgSpinnerTwoAlt } from "react-icons/cg";

function Checkout () {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phonenumber, setphonenumber] = useState("");
    const [Pincode, setpincode] = useState("");
    const [address, setaddress] = useState("");
    const [town, settown] = useState("");
    const [City, setcity] = useState("");
    const [state, setstate] = useState("");
    const [CartData, setCartData] = useState([]);
    const [userIdd, setUserId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

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

    const handlePlaceOrder = async () => {
        const stripe = await loadStripe("pk_test_51OnfkLSJEheouhPFrVND64pugmEvkKC61ZbYPFzmQkyU6fw8dINn8PneQ8IARENxgNkwv74ebK7kyhOARvZXNtKg003kiQAl9O");
    
        const Address = {
            pinCode: Pincode,
            address: address,
            Town: town,
            city: City,
            state: state,
        };
    
        const value = {
            FirstName: firstName,
            LastName: lastName,
            phoneNumber: phonenumber,
            Address: Address,
            userId: userIdd
        };
    
        try {
            setIsLoading(true);
            const data = await place_order(value);
            const result = await stripe.redirectToCheckout({
                sessionId: data.id
            });
    
            if (result.error) {
               setErrorMessage(result.error);
            }
        } catch (error) {
            console.log('Error in placing order:', error);
            setErrorMessage(error.response.data.msg);  
        }
        finally{
            setIsLoading(false);
            setTimeout(function(){ 
                setErrorMessage(null);
            },3000);
        }
    };
    

    let total = 0;
    CartData.map((x) => {
        total += x.price * x.quan;
    });

    return <>
        <div>
        <Navbar/>
            <div className="flex">
            <div className="w-[60vw] flex flex-col">
                    <div className="p-4 border-b-2 ml-4 flex items-center justify-between">
                        <span className="text-2xl font-semibold">Complete your order</span>
                    </div>     
              <div className="p-10">
                <h3 className="font-semibold text-gray-800 mb-5 ml-1 text-xl">
                  Personal Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      autocomplete="off"
                      placeholder="First Name"
                      required
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                      className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                    />
                  </div>

                  <div className="relative flex items-center">
                    <input
                      type="text"
                      placeholder="Last Name"
                      autocomplete="off"
                      required
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                      className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                    />
                  </div>

                  <div className="relative flex items-center">
                    <input
                      type="number"
                      autocomplete="off"
                      onChange={(e) => setphonenumber(e.target.value)}
                      value={phonenumber}
                      placeholder="Phone No."
                      required
                      className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="pl-10 pt-3">
                <h3 className="font-semibold text-gray-800 mb-5 ml-1 text-xl">
                  Address Details
                </h3>
                <div className="flex flex-col">
                <div className="relative flex items-center w-[700px]">
                    <input
                      type="text"
                      placeholder="Pin Code"
                      autocomplete="off"
                      required
                      onChange={(e) => setpincode(e.target.value)}
                      value={Pincode}
                      className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                    />
                  </div>
                  <div className="relative flex items-center w-[700px] mt-5">
                    <input
                      type="text"
                      placeholder="Address"
                      autocomplete="off"
                      required
                      onChange={(e) => setaddress(e.target.value)}
                      value={address}
                      className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                    />
                  </div>
                  <div className="relative flex items-center w-[700px] mt-5">
                    <input
                      type="text"
                      placeholder="Town"
                      autocomplete="off"
                      required
                      onChange={(e) => settown(e.target.value)}
                      value={town}
                      className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                    />
                  </div>
                  <div className="relative flex items-center w-[700px] mt-5">
                    <input
                      type="text"
                      placeholder="City"
                      autocomplete="off"
                      required
                      onChange={(e) => setcity(e.target.value)}
                      value={City}
                      className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                    />
                  </div>
                  <div className="relative flex items-center w-[700px] mt-5 mb-5">
                    <input
                      type="text"
                      placeholder="State"
                      autocomplete="off"
                      required
                      onChange={(e) => setstate(e.target.value)}
                      value={state}
                      className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                    />
                  </div>
                </div>
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
                            <button onClick={handlePlaceOrder}  type="submit" className="w-80 ml-5 bg-log_btn mt-3 py-2 rounded-2xl text-white font-semibold mb-2">
                                {!isLoading ? (
                                        "Place Order"
                                      ) : (
                                        <CgSpinnerTwoAlt className="text-white w-6 h-6 animate-spin ml-36" />
                                      )}
                            </button>
                        </div>
                    </div>
                    <p className="mt-2 ml-10 text-red-500 lato text-sm text-center">
                        {errorMessage}
                    </p>
                </div>
            </div>
        </div>
    </>
}

export default Checkout;