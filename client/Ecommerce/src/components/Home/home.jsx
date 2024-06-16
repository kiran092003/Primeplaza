import Navbar from "../elements/navbar";
import Example from "../elements/example";
import Review from "../elements/adds";
import Promo from "../elements/promo";
import Footer from "../elements/footer";

function Home(){
    return (
        <>
        <Navbar/>
        <Promo/>
        <Example/>  
        <Review/>
        <Footer/>
        </>
    );

}

export default Home;