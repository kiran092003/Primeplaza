import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


function Footer () {
    return(
        <>
        <div className="bg-page_theam  bottom-0">
             <footer class="relative bg-blueGray-200 pt-8 pb-6">
          <div class="container mx-auto px-4">
            <div class="flex flex-wrap text-left lg:text-left">
              <div class="w-full lg:w-6/12 px-4">
                <h4 class="text-3xl fonat-semibold text-txt">Let's keep in touch!</h4>
                <h5 class="text-lg mt-1 mb-2 text-txt">
                  Find us on any of these platforms.
                </h5>
                <div class="mt-4 lg:mb-0 mb-4 flex">
                    <div className="bg-white text-txt cursor-pointer shadow-lg flex font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2">
                        <FaInstagram size="20px"/>
                    </div>
                    <div className="bg-white text-txt cursor-pointer shadow-lg flex font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2">
                        <FaTwitter size="20px"/>
                    </div>
                    <div className="bg-white text-txt cursor-pointer shadow-lg flex font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2">
                        <FaGithub size="20px"/>
                    </div>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="flex flex-wrap items-top mb-6">
                  <div class="w-full lg:w-4/12 px-4 ml-auto">
                    <span class="block uppercase text-txt text-sm font-semibold mb-2">Useful Links</span>
                    <ul class="list-unstyled">
                      <li>
                        <a class="text-txt hover:text-amber-700 font-semibold block pb-2 text-sm" href="#">About Us</a>
                      </li>
                      <li>
                        <a class="text-txt hover:text-amber-700 font-semibold block pb-2 text-sm" href="#">Github</a>
                      </li>
                    </ul>
                  </div>
                  <div class="w-full lg:w-4/12 px-4">
                    <span class="block uppercase text-txt text-sm font-semibold mb-2">Other Resources</span>
                    <ul class="list-unstyled">
                      <li>
                        <a class="text-txt hover:text-amber-700 font-semibold block pb-2 text-sm" href="#">Terms &amp; Conditions</a>
                      </li>
                      <li>
                        <a class="text-txt hover:text-amber-700 font-semibold block pb-2 text-sm" href="#">Privacy Policy</a>
                      </li>
                      <li>
                        <a class="text-txt hover:text-amber-700 font-semibold block pb-2 text-sm" href="#">Contact Us</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap items-center md:justify-between justify-center">
              <div class="w-full md:w-4/12 px-4 mx-auto text-center">
                <div class="text-sm text-txt font-semibold py-1">
                  Copyright © <span id="get-current-year">2024</span>
                  <a href="https://www.creative-tim.com?ref=njs-profile" class="text-txt hover:text-blueGray-800"> Primeplaza</a>.
                </div>
              </div>
            </div>
          </div>
        </footer>
        </div>
        </>     
    );
}

export default Footer;
