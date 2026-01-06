import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DonationCenters = () => {
    const navigate = useNavigate();
    const [centers, setCenters] = useState([]);
    const [loading, setLoading] = useState(false);

    const getNearbyCenters = () => {
        if (!navigator.geolocation) {
            alert("Geolocation not supported!");
            return;
        }

        setLoading(true);

        navigator.geolocation.getCurrentPosition(async (pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;

            try {
                const centersResponse = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/bloodServices/allOrgs`,
                    { params: { location: `${lat},${lng}` } }
                );

                const centersData = centersResponse.data?.orgs.map((x) => ({
                    orgId: x._id,
                    name: x.orgName,
                    distance: (x.distance / 1000).toFixed(2),
                    address: x.location.address,
                    mobile: x.contactNumber,
                    timings: x.timings
                }));
                setCenters(centersData);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        });
    };

    if (!centers) return <div>Loading...</div>;

    return (
        <div id='centers' className='flex flex-col gap-12 justify-center items-center scroll-m-15 bg-gray-50 my-14 lg:py-16 md:py-12 py-10 sm:px-16 lg:px-20 xl:px-36 px-4'>
            <h2 className='text-3xl sm:text-4xl font-bold'>Donation Centers</h2>
            <h5 className='text-xl sm:text-2xl text-[#696969] font-normal md:w-[768px] text-center px-1'>
                Find a convenient location near you using your device GPS.
            </h5>

            <button
                onClick={getNearbyCenters}
                className='bg-red-600 hover:bg-red-700 text-lg text-white font-medium w-full max-w-[180px] py-1 rounded-full'
            >
                Detect My Location
            </button>

            {loading && <h3>Detecting your location...</h3>}

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {centers.map((center, i) => (
                    <div key={i} className='flex flex-col gap-3 bg-white p-7 w-full rounded-2xl'>
                        <h4 className='text-xl font-semibold'>{center.name.toUpperCase()}</h4>
                        <h6 className='text-base text-[#696969]'>{center.distance} km away</h6>
                        <h6 className='text-base text-[#696969]'>{center.address}</h6>
                        <h6 className='text-base text-[#696969]'>{center.mobile}</h6>
                        <h6 className='text-base text-[#696969]'>{center.timings}</h6>
                        <div className='flex justify-center'>
                            <button
                                onClick={() => navigate(`/org/${center.orgId}`)}
                                className='text-white text-lg font-medium py-1 px-2 w-2xs bg-red-600 hover:bg-red-700 rounded-full'
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {centers.length === 0 && !loading ? <h3>No Organization found nearby</h3> : null}
        </div>
    );
};

export default DonationCenters;
