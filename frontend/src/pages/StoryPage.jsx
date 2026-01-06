import StoryCard from "@/components/StoryCard";
import axios from "axios";
import React, { useEffect, useState } from "react";

const StoryPage = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStories = async () => {
      try {
        // ✅ Updated endpoint to match backend (public route)
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/stories`);

        if (res.status === 200) {
          setStories(res.data.stories);
        } else {
          setError("Failed to fetch stories");
        }
      } catch (err) {
        console.error("Error fetching stories:", err);
        setError("Unable to load stories right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const tags = [
    "Regular Donor",
    "First Time Donor",
    "Blood Recipient",
    "Recipient to Donor",
    "Volunteer",
  ];

  return (
    <div
      id="stories"
      className="flex flex-col gap-12 justify-center items-center bg-gradient-to-br from-pink-50 to-gray-200 lg:py-25 md:py-20 py-15 sm:px-16 lg:px-20 xl:px-36 px-4"
    >
      <h2 className="text-3xl sm:text-4xl font-bold">Donor Stories</h2>
      <h5 className="text-xl sm:text-2xl text-[#696969] font-normal md:w-[768px] text-center px-1">
        Hear from our amazing donors and recipients about their life-changing experiences with blood donation.
      </h5>

      {/* ✅ Loading State */}
      {loading && (
        <p className="text-gray-500 text-lg animate-pulse">Loading stories...</p>
      )}

      {/* ✅ Error State */}
      {!loading && error && (
        <p className="text-red-600 font-medium">{error}</p>
      )}

      {/* ✅ Empty State */}
      {!loading && !error && stories.length === 0 && (
        <p className="text-gray-600 text-lg">No donor stories found yet.</p>
      )}

      {/* ✅ Stories Grid */}
      {!loading && !error && stories.length > 0 && (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 w-full">
          {stories.map((story, i) => (
            <StoryCard key={i} story={story} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StoryPage;




/*import StoryCard from '@/components/StoryCard'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const StoryPage = () => {
    const [story, setStory] = useState([]);
    useEffect(() => {
      const fetchStories = async()=>{
        const storyRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/bloodServices/stories`);
        if(storyRes.status === 200){
            setStory(storyRes.data.stories);
        }
      }
      fetchStories();
    
    }, [])

    const tags = ["Regular Donor", "First Time Donor", "Blood Recipient", "Recipient to Donor", "Volunteer"];
    return (
        <div id='stories' className='flex flex-col gap-12 justify-center items-center bg-linear-to-br from-pink-50 to-gray-200 lg:py-25 md:py-20 py-15 sm:px-16 lg:px-20 xl:px-36 px-4'>
            <h2 className='text-3xl sm:text-4xl font-bold'>Donor Stories</h2>
            <h5 className='text-xl sm:text-2xl text-[#696969] font-normal md:w-[768px] text-center px-1'>Hear from our amazing donors and recipients about their life-changing experiences with blood donation.</h5>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10'>
                {story.map((story, i) => <StoryCard key={i} story={story} />)}
            </div>
            
        </div>
    )
}

export default StoryPage;*/