import { CgSpinnerTwoAlt } from "react-icons/cg";
import { useState } from "react";
import {Link,useNavigate} from "react-router-dom";
import {email_verification} from "./services/api";

function Signup(){

    const[email,setemail]=useState("");
    const[Loading,isLoading]=useState(false);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);

    const handelemail=(e)=>{
        setemail(e.target.value);
    }

    const handelverification = async (event)=>{
        event.preventDefault();
        try {
            isLoading(true);
            const data=await email_verification(email);
            if(data=="Verification code sent successfully"){
                navigate("/signup");
            }
            else{
                setErrorMessage(data);
            }
        } catch (error) {
            console.error(
                "Login failed:",
                error.response.data.msg || error.message
              );
            setErrorMessage(error.response.data.msg);  
        }
        finally{
            isLoading(false);
            setTimeout(function(){ 
                setErrorMessage(null);
            },3000);
        }
    }


    return (
        <>
            <div className="grid gap-1 grid-cols-2 h-screen">
                 <div>
                    <img src="https://firebasestorage.googleapis.com/v0/b/primeplaza-b7db1.appspot.com/o/Logo%20maker%20project.png?alt=media&token=f97be178-05f3-4fb0-816b-a20817eb238c" alt="logo"/>
                </div>
                <div>
                <div className="flex-col justify-center items-center">
                   <h1 className="te text-5xl font-extrabold mt-14 uppercase text-center text-txt_col">PrimePlaza</h1>
                    <div className="mt-14 flex-col text-center">
                        <h1 className=" text-4xl mb-2 text-txt_col">Welcome to Primeplaza!</h1>
                        <span className=" text-xs text-txt_col">Enter your email address for verification</span>
                    </div>
                    <div className="flex justify-center items-center">
                    <div className="mt-7 flex-col justify-center items-center">
                        <form method="post" onSubmit={handelverification}>
                        <div className="flex-col justify-center items-center ml-10">
                            <div className="pb-1 ml-2 text-txt_col">
                                <span>Email Address</span>
                            </div> 
                            <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 w-80">  
						        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
							        viewBox="0 0 24 24" stroke="currentColor">
							        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
						        </svg>
						        <input class="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Email Address" onChange={handelemail} />
                            </div>   
                        </div>
                            <div>
                                <button type="submit" className="w-80 bg-log_btn mt-3 py-2 ml-10 rounded-2xl text-white font-semibold mb-2">
                                    {!Loading ? (
                                        "Send"
                                      ) : (
                                        <CgSpinnerTwoAlt className="text-white w-6 h-6 animate-spin ml-36" />
                                      )}
                                </button>
                            </div>
                        </form>
                        <p className="mt-2 text-red-500 lato text-sm text-center">
                        {errorMessage}
                        </p>
                        <div className="mt-3 flex flex-col items-center justify-center">
                            <span className="mr-1 text-txt_col">Ready to verify? </span>
                            <span className="mr-1 text-txt_col">Click "Send" we'll send you a code to confirm your account.</span>
                        </div>
                    </div>
                    </div>
                   </div>
                </div>
            </div>
        </>
    );

}

export default Signup;