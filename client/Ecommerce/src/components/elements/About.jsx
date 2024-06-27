import Navbar from "./navbar";
import { FaBagShopping } from "react-icons/fa6";
import { MdDesignServices } from "react-icons/md";
import { FaLandmark } from "react-icons/fa6";
import classes from "./About.module.css";
import Footer from "./footer";

function About() {
    return (
      <div>
        <Navbar/>
        <div className={classes.heading}>
          <img src="https://firebasestorage.googleapis.com/v0/b/primeplaza-b7db1.appspot.com/o/img51.jpg?alt=media&token=1305b6a6-2e56-4206-8f20-4cb5c7e73188" alt="header"/>
          <div className={classes.About} >
            <span className={classes.about}>About Us</span>
            <span className={classes.subabout}>/ About Us</span>
          </div>
        </div>
        <div className={classes.story_container}>
          <div className={classes.story_contone}>
            <span className={classes.onetitle}>Our Story</span>
            <span className={classes.onecontent}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur illo sed aperiam asperiores quam error, exercitationem qui repellendus totam nam, nihil possimus excepturi reprehenderit minima! Quam suscipit rem vitae saepe.</span>
          </div>
          <div className={classes.story_conttwo}>
            <img src="https://htmlbeans.com/html/elegant/images/img52.jpg" alt="story"/>
            <span className={classes.onecontentdisp}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur illo sed aperiam asperiores quam error, exercitationem qui repellendus totam nam, nihil possimus excepturi reprehenderit minima! Quam suscipit rem vitae saepe.</span>
          </div>
        </div>
       <div className={classes.elegant_container}>
          <div className={classes.elegant}>
            <span className={classes.about_elegant}>OUR SERVICES</span>
            <span className={classes.about_content}>What We Do</span>
          </div>
          <div className={classes.intro}>
            <div className={classes.branding}>
              <FaBagShopping className={classes.icon}/>
              <span className={classes.brand}>BRANDING</span>
              <span className={classes.content}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incid- idunt ut labore et dolore magna aliqua.</span>
            </div>
            <div className={classes.branding}>
              <MdDesignServices className={classes.icon}/>
              <span className={classes.brand}>DESIGN AND DEVELOPE</span>
              <span className={classes.content}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incid- idunt ut labore et dolore magna aliqua.</span>
            </div>
            <div className={classes.branding}>
              <FaLandmark className={classes.icon}/>
              <span className={classes.brand}>MARKETING</span>
              <span className={classes.content}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incid- idunt ut labore et dolore magna aliqua.</span>
            </div>
          </div>
       </div>
       <div className={classes.join_container}>
          <div className={classes.elegant}>
                <span className={classes.about_elegant}>OUR TEAM</span>
                <span className={classes.about_content}>Meet Expert Team</span>
          </div>
          <div className={classes.main_container}>
              <div className={classes.main_content}>
                <img src="https://media.istockphoto.com/id/692879918/photo/what-more-can-a-girl-ask-for.jpg?s=612x612&w=0&k=20&c=wpJmrY5Nm_J-EBtOImafaYJpDLQ9vMsoSlwj1AqgPWo=" alt="yo1" />
                <span className={classes.name}>Cody Harvey</span>
                <span className={classes.position}>Chief Strategy Officer</span>
              </div>
              <div className={classes.main_content}>
              <img src="https://static.vecteezy.com/system/resources/previews/030/557/451/large_2x/ai-generative-portrait-of-handsome-male-model-fashion-background-banner-with-copy-space-text-commercial-template-free-photo.jpg" alt="" />
                <span className={classes.name}>John's Milga</span>
                <span className={classes.position}>Chief Executive Officer</span>
              </div>
              <div className={classes.main_content}>
              <img src="https://assets.vogue.com/photos/5876fe0a8a28e998768824d3/4:3/w_795,h_597,c_limit/david-gandy.jpg" alt="" />
                <span className={classes.name}>Elliot Drake</span>
                <span className={classes.position}>Chief Marketing Officer</span>
              </div>
          </div>
       </div>
       <Footer/>
      </div>
    );
  }
  
  export default About;
  