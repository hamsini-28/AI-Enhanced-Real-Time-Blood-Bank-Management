import React from "react";
import whitelogo from '../assets/lifeapi_logo_white.png';
import redlogo from '../assets/lifeapi_logo_red.png';

const Footer = () => (
    <footer id="footer" className="bg-gray-900 text-white flex flex-wrap justify-center items-start gap-16 lg:py-16 md:py-12 py-10 sm:px-16 lg:px-20 xl:px-36 px-4">
        <div>
            <img src={redlogo} alt="Logo" className="w-40" />
            <h5 className="text-lg  max-w-2xs">Connecting donors with those in need. Every donation matters, every life counts.</h5>
        </div>
        {/* Quick Links */}
        <div className="flex-1 min-w-[220px]">
            <div className="text-lg font-bold mb-4 tracking-wide">Quick Links</div>
            <ul className="list-none p-0 m-0 ">
                <li><a href="/" className="block mb-2 hover:text-red-400 transition-colors">Home</a></li>
                <li><a href="#about" className="block mb-2 hover:text-red-400 transition-colors">About Us</a></li>
                <li><a href="#eligibility" className="block mb-2 hover:text-red-400 transition-colors">Eligibility</a></li>
                <li><a href="#centers" className="block mb-2 hover:text-red-400 transition-colors">Locations</a></li>
                <li><a href="#events" className="block mb-2 hover:text-red-400 transition-colors">Events</a></li>
            </ul>
        </div>
        {/* Resources */}
        <div className="flex-1 min-w-[220px]">
            <div className="text-lg font-bold mb-4 tracking-wide">Resources</div>
            <ul className="list-none p-0 m-0">
                <li><a href="#eligibility" className="block mb-2 hover:text-red-400 transition-colors">Donor Education</a></li>
                <li><a href="#blood-types" className="block mb-2 hover:text-red-400 transition-colors">Blood Types Info</a></li>
                <li><a href="https://www.medindia.net/health/procedure/blood-donation-screening.htm" className="block mb-2 hover:text-red-400 transition-colors">Health Screening</a></li>
                <li><a href="https://www.cdc.gov/nhsn/biovigilance/blood-safety/index.html#:~:text=Blood%20safety%20encompasses%20activities%20intended%20to%20mitigate%20risks,laboratory%20testing%2C%20component%20collection%2C%20and%20monitoring%20transfusion%20recipients."
                 className="block mb-2 hover:text-red-400 transition-colors">Safety Protocols</a></li>
                <li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6132011/" className="block mb-2 hover:text-red-400 transition-colors">Research</a></li>
            </ul>
        </div>
        {/* Contact */}
        <div className="flex-1 min-w-[220px]">
            <div className="text-lg font-bold mb-4 tracking-wide">Contact</div>
            <div className="flex items-center mb-2 gap-2">
                <span role="img" aria-label="phone">📞</span>
                <span>9247175733</span>
            </div>
            <div className="flex items-center mb-2 gap-2">
                <span role="img" aria-label="email">✉️</span>
                <span>griet@lifeapi.org</span>
            </div>
            <div className="flex items-center mb-2 gap-2">
                <span role="img" aria-label="location">📍</span>
                <span>
                    <div className="mt-2 leading-relaxed">
                        GRIET College<br />
                         Bachupally<br />
                        Hyderabad, State Telangana
                    </div>
                </span>
            </div>
        </div>
    </footer>
);

export default Footer;
