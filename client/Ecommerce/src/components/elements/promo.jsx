function promo (){
    return (
        <>
            <div className="w-full h-[500px] items-center flex ">
                <div className="h-[450px] w-[600px]  bg-txt ml-10 mr-4 my-5 rounded-2xl shadow-lg">
                    <h1 className="text-7xl pt-5 pl-5 pb-1 text-page_theam">Limited-Time Deal!</h1>
                    <h1 className="text-7xl pl-5 text-page_theam">Up to 50% off!</h1>
                    <div className="w-70%">
                        <p className="p-5 mt-2 text-xl text-page_theam">
                        Don't miss out! Huge savings on your favorite items across all categories. Shop now before they're gone!
                        </p>
                    </div> 
                    <div className="p-5">
                    <button className="h-12 px-5 py-3 bg-page_theam text-txt rounded-lg">Explore now</button>
                    </div>
                </div>
                <div className="h-[450px] w-[600px] flex-col mr-10 my-10 items-center">
                    <div className="h-[270px] w-full  mb-5 rounded-2xl shadow-lg">
                        <div className="relative">
                        <img src="https://images.autods.com/OfficialSite/New/20240528140132/Beauty-Dropshipping-Products-768x432.webp" alt="beauty" className="h-[270px] w-full rounded-2xl "/>
                        <p className="absolute top-20 left-10 text-4xl text-page_theam  font-bold ">Get quality beauty products</p>
                        <p className="absolute top-32 left-10 text-4xl text-page_theam  font-bold">Up to 30% off!</p>
                        </div>
                    </div>
                    <div className="h-[160px] w-full rounded-2xl shadow-lg">
                        <div className="relative">
                        <img src="https://static01.nyt.com/images/2023/04/02/fashion/27GARDE-ROBE-ARCHIVING-01-bcjw/27GARDE-ROBE-ARCHIVING-01-bcjw-videoSixteenByNineJumbo1600.jpg" alt="cloth" className="h-[160px] w-full rounded-2xl "/>
                        <p className="absolute top-10 left-10 text-4xl text-page_theam  font-bold ">Get branded cloths</p>
                        <p className="absolute top-20 left-10 text-4xl text-page_theam font-bold">Up to 40% off!</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default promo;