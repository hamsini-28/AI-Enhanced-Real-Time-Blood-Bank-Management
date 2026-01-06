import StoryCard from '@/components/StoryCard'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const StoryPage = () => {
    const [story, setStory] = useState([]);
    useEffect(() => {
      const fetchStories = async()=>{
        const storyRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/bloodServices/stories`);
        if(storyRes.status === 200){
            setStory(storyRes.data.stories.slice(0,3));
        }
      }
      fetchStories();
    
    }, [])
    

    return (
        <div id='stories' className='flex flex-col gap-12 justify-center items-center bg-linear-to-br from-pink-50 to-gray-200 lg:py-30 md:py-20 py-15 sm:px-16 lg:px-20 xl:px-36 px-4'>
            <h2 className='text-3xl sm:text-4xl font-bold'>Donor Stories</h2>
            <h5 className='text-xl sm:text-2xl text-[#696969] font-normal md:w-[768px] text-center px-1'>Hear from our amazing donors and recipients about their life-changing experiences with blood donation.</h5>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10'>
                {story.map((story, i) => <StoryCard key={i} story={story} />)}
            </div>
            <SharingStory />
        </div>
    )
}

const SharingStory = () => {
    const tags = ["Regular Donor", "First Time Donor", "Blood Recipient", "Recipient to Donor", "Volunteer"];
    const navigate = useNavigate();
    const [isSharing, setIsSharing] = useState(false);
    const [storySubmitted, setStorySubmitted] = useState(false);
    const [storyId, setStoryId] = useState('');
    const [sharingStory, setSharingStory] = useState({
        story: "",
        tag: ""
    })
    const handleSubmit = async () => {
        try {
            if (storySubmitted) {
                const editRes = await axios.put(`${import.meta.env.VITE_BASE_URL}/user/story/${storyId}`,
                    sharingStory,
                {
                    headers : {
                        Authorization : `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if(editRes.status == 200){
                    setStorySubmitted(true);
                    setIsSharing(false);
                    setSharingStory({
                        story: editRes.data.story.story,
                        tag: editRes.data.story.tag
                    })
                }
            } else {
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/story`, sharingStory, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.status == 201) {
                    setStoryId(response.data.story.storyId);
                    setSharingStory({
                        story: response.data.story.story,
                        tag: response.data.story.tag
                    })
                    setStorySubmitted(true);
                    setIsSharing(false);
                }
            }
        } catch (error) {
            console.log("Error while posting story " + error)
        }
    }
    return (
        <div className='p-3 flex flex-col items-center gap-2 '>
            <div className='flex flex-col gap-4 items-center p-6 bg-white rounded-2xl'>
                <h4 className='text-2xl font-semibold'>Share Your Story</h4>
                <p className='text-lg text-[#696969] max-w-xl'>Have you donated blood or received a transfusion? We'd love to hear your experience and share it with others to inspire more donations.</p>
                <button className='text-white hover:cursor-pointer flex gap-2 items-center justify-center px-4 w-fit h-8 bg-red-600 hover:bg-red-700 rounded-full '
                    onClick={() => {
                        const token = localStorage.getItem('token');
                        if(!token){
                            navigate('/signin')
                        }
                        setIsSharing(!isSharing)
                    }}
                >
                    {!isSharing ? <i className="ri-add-line"></i> : <i className="ri-close-line"></i>} {!isSharing ? <h5>{storySubmitted ? "Edit your story" : "Share your story"}</h5> : <h5>Cancel</h5>}
                </button>
            </div>
            {isSharing && <div className='w-full bg-white p-2 rounded-2xl flex flex-col items-center'>
                <textarea placeholder="Write your story here..."
                    value={sharingStory.story}
                    className='border-2 border-red-800 w-full h-30 p-2  bg-white resize-none'
                    onChange={(e) => {
                        setSharingStory((prev) => ({ ...prev, story: e.target.value }))
                    }} />
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 my-3'>
                    {tags.map((tag, i) => <div
                        key={i}
                        className={`p-1 text-sm font-medium border text-center border-black rounded-xl ${sharingStory.tag === tag ? "bg-red-600 text-white" : "bg-white text-black"}`}
                        onClick={() => { setSharingStory((prev) => ({ ...prev, tag: tag })) }}
                    >
                        {tag}
                    </div>)}
                </div>
                <button
                    onClick={handleSubmit}
                    className='text-white hover:cursor-pointer px-2 w-full max-w-[200px] h-8 bg-gradient-to-br from-red-500 to-red-700 dark:from-red-700 dark:to-red-900 rounded-lg '>
                    {storySubmitted ? "Edit" : "Submit"}
                </button>
            </div>}
            <button className='bg-blue-200 text-blue-600 px-3 py-1 rounded-3xl hover:bg-blue-300'
            onClick={()=>{
                navigate('/stories')
            }}
            >See more</button>
        </div>
    )
}

export default StoryPage;