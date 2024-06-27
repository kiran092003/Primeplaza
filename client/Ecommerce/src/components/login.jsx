import {Link,useNavigate} from "react-router-dom";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { useState } from "react";
import {login} from "./services/api";
function Signin(){

        const[email,setemail]=useState("");
        const[password,setpassword]=useState("");
        const[Loading,isLoading]=useState(false);
        const [errorMessage, setErrorMessage] = useState(null);

        const navigate = useNavigate();

        const handelemail=(e)=>{
            setemail(e.target.value);
        }
        const handepassword=(e)=>{
            setpassword(e.target.value);
        }

        const handellogin =async(event)=>{
            event.preventDefault();
            try {
                isLoading(true);
                const logindata=login({
                    email:email,
                    password:password
                });
                const result = await logindata;
                localStorage.setItem("PrimeplazaToken", result.token);
                localStorage.setItem("PrimeplazaId", result.userId);
                if(result.msg=="loged-in sucessfully"){
                    navigate("/");
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
        };

    return (
        <>
            <div className="grid gap-1 grid-cols-2 h-screen">
                <div>
                    <img src="https://firebasestorage.googleapis.com/v0/b/primeplaza-b7db1.appspot.com/o/Logo%20maker%20project.png?alt=media&token=f97be178-05f3-4fb0-816b-a20817eb238c" alt="logo"/>
                </div>
                <div className="flex justify-center">   
                    <div className="flex-col justify-center items-center">
                   <h1 className="te text-5xl font-extrabold mt-14 uppercase text-center text-txt_col">PrimePlaza</h1>
                    <div className="mt-14 flex-col text-center">
                        <h1 className=" text-4xl mb-2 text-txt_col">Welcome Back!</h1>
                        <span className=" text-xs text-txt_col">Enter your email address and password to login</span>
                    </div>
                    <div className="mt-7 flex-col justify-center items-center ">
                        <form method="post" onSubmit={handellogin}>
                        <div className="flex-col justify-center items-center">
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
                            <div className="pb-1 ml-2 text-txt_col">
                                <span>Password</span>
                            </div> 
                            <div class="flex items-center border-2 py-2 px-3 rounded-2xl w-80">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
								fill="currentColor">
								<path fill-rule="evenodd"
									d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
									clip-rule="evenodd" />
							</svg>
							<input class="pl-2 w-80 outline-none border-none" type="text" name="" id="" placeholder="Password" onChange={handepassword} />
                            </div>
                            <div className="mt-3 ml-2 hover:text-log_btn cursor-pointer text-txt_col">
                              <span>Forgot your password?</span>
                            </div>
                            <div>
                                <button type="submit" className="w-80 bg-log_btn mt-3 py-2 rounded-2xl text-white font-semibold mb-2">
                                    {!Loading ? (
                                        "Login"
                                      ) : (
                                        <CgSpinnerTwoAlt className="text-white w-6 h-6 animate-spin ml-36" />
                                      )}
                                </button>
                            </div>
                        </form>
                        <p className="mt-2 text-red-500 lato text-sm text-center">
                        {errorMessage}
                        </p>
                        <div className="mt-3 flex justify-center">
                            <span className="mr-1 text-txt_col">Don't have an account?</span>
                            <Link to="/signup" className="hover:text-log_btn text-txt_col">Sign up</Link>
                        </div>
                    </div>
                   </div>
                </div>
            </div>
        </>
    );

}

export default Signin;