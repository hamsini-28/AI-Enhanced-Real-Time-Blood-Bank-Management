import { useNavigate } from "react-router-dom";
import whitelogo from '../assets/lifeapi_logo_white.png';
import redlogo from '../assets/lifeapi_logo_red.png';
import { useEffect, useState } from 'react';
import useMediaQuery from '../hooks/useMediaQuery';

const NavBar = () => {
    const navigate = useNavigate();
    const isDesktop = useMediaQuery("(min-width : 768px)");
    const [openHeader, setOpenHeader] = useState(false);
    const token = localStorage.getItem("token");
    const [buttonText, setButtonText] = useState("Sign In");

    useEffect(() => {
        setOpenHeader(isDesktop);
    }, [isDesktop]);

    useEffect(() => {
      if(token){
        setButtonText("Sign Out");
      }else{
        setButtonText("Sign In");
      }
    
    }, [])
    

    const headerOptions = [
        { name: "Home", herf: "#home" },
        { name: "About", herf: "#about" },
        { name: "Eligibility", herf: "#eligibility" },
        { name: "Events", herf: "#events" },
        { name: "FAQs", herf: "#faqs" }
    ];

    const handleNavClick = (hash) => {
        if (window.location.pathname !== "/") {
            // Navigate to home page with hash
            navigate("/" + hash);
        } else {
            // Already on home page → just scroll
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    const headerElements = headerOptions.map((element, i) => (
        <span
            className="text-medium transition-all duration-1000 text-[#808080] font-normal hover:text-red-500 hover:cursor-pointer w-full md:w-auto"
            onClick={() => {
                handleNavClick(element.herf);
                if (!isDesktop) {
                    setOpenHeader(false);
                }
            }}
            key={i}
        >
            {element.name}
        </span>
    ));

    return (
        <div className="flex flex-col md:flex-row md:items-center gap-1 justify-between fixed top-0 bg-white shadow-lg w-full mb-2 py-0 md:px-18 z-50">
            <div className="px-3 md:px-0 py-2 shadow-lg md:shadow-none flex justify-between items-center">
                <img src={redlogo} alt="logo" className="w-40" onClick={() => { navigate('/') }} />
                <i
                    className="ri-menu-line text-xl font-medium md:hidden hover:cursor-pointer hover:text-red-500"
                    onClick={() => setOpenHeader(!openHeader)}
                ></i>
            </div>
            {openHeader && (
                <div className="flex flex-col items-center md:flex-row px-3 pb-1 md:px-0 gap-5">
                    {headerElements}

                    <span
                        onClick={() => {
                            if (token) {
                                localStorage.removeItem("token");
                                setButtonText("Sign In");
                            } else {
                                navigate('/signin');
                            }
                            if (!isDesktop) {
                                setOpenHeader(false);
                            }
                        }}
                        className="text-white hover:cursor-pointer px-2 py-1 w-full h-8 bg-red-600 hover:bg-red-700 rounded-lg"
                    >
                        {buttonText}
                    </span>
                </div>
            )}
        </div>
    );
};

export default NavBar;
