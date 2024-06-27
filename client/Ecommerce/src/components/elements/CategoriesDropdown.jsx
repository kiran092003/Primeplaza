import {Link} from "react-router-dom";

function CategoriesDropdown () {
    return (
        <>
                <div className="flex flex-col w-full">
                    <div className="roboto text-txt font-semibold w-full hover:bg-page_theam text-left pb-2 pl-3 pt-1">
                        <Link to="/men">Men's</Link>
                    </div>
                    <div className="roboto text-txt font-semibold hover:bg-page_theam  text-left pb-2 pl-3 pt-1">
                        <Link to="/women">Women's</Link>
                    </div>
                    <div className="roboto text-txt font-semibold text-left hover:bg-page_theam pb-2 pl-3 pt-1">
                        <Link to="/kids">Kid's</Link>
                    </div>   
                </div>
        </>
    );
}

export default CategoriesDropdown;