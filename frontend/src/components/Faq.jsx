import React, {useState} from 'react'

const Faq = () => {
    const faqItems = [
        {
            question: "How long does the blood donation process take?",
            answer: "The entire process typically takes about 30-45 minutes. The actual blood collection only takes 8-10 minutes, while the rest of the time is spent on registration, health screening, and post-donation refreshments."
        },
        {
            question: "Is blood donation safe?",
            answer: "Yes, blood donation is very safe. We use sterile, single-use equipment for every donor. All needles and collection bags are used only once and then safely disposed of. Our trained staff follows strict safety protocols to ensure your well-being."
        },
        {
            question: "How often can I donate blood?",
            answer: "You can donate whole blood every 56 days (8 weeks). This waiting period allows your body to replace the donated blood cells. Platelet donations can be made more frequently, up to 24 times per year with at least 7 days between donations."
        },
        {
            question: "What should I do before donating?",
            answer: "Before donating: get a good night's sleep, eat a healthy meal, drink plenty of water, avoid alcohol for 24 hours, and bring a valid photo ID. It's also helpful to eat iron-rich foods in the days leading up to your donation."
        },
        {
            question: "What happens to my blood after donation?",
            answer: "Your donated blood is tested for infectious diseases and blood type. It's then separated into components (red cells, plasma, platelets) which can help different patients. The blood is stored under strict conditions and distributed to hospitals when needed, typically within days of donation."
        },
        {
            question: "Can I donate if I'm taking medication?",
            answer: "Most medications don't prevent you from donating blood. However, some medications may require a waiting period or may make you ineligible. It's best to check with our medical staff during your screening. Please bring a list of all medications you're currently taking."
        }
    ];

    return (
        <div id='faqs' className='flex flex-col gap-12 justify-center items-center scroll-mt-20 my-4 md:py-12 py-10 sm:px-16 lg:px-20 xl:px-36 px-4 w-full'>
            <h2 className='text-3xl sm:text-4xl font-bold'>Frequently Asked Questions</h2>
            <h5 className='text-xl sm:text-2xl text-[#696969] font-normal md:w-[768px] text-center px-1'>Get answers to common questions about blood donation and the donation process.</h5>
            <div className='flex flex-col items-center gap-5 w-full max-w-4xl'>
                {faqItems.map((faq,i)=> <FaqCard faq={faq} key={i} />)}
            </div>
        </div>
    )
}

const FaqCard = ({ faq }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='px-4 py-3 rounded-3xl bg-gray-100 hover:bg-gray-200 w-full'
        onClick={()=>{setIsOpen(!isOpen)}}
        >
            <div className='flex justify-between items-center mb-3'>
                <h5 className='text-xl font-medium'>{faq.question}</h5>
                <i className="ri-arrow-drop-down-line text-2xl text-[#696969]"></i>
            </div>
            {isOpen &&
                <p className='text-lg text-[#696969]'>
                    {faq.answer}
                </p>}
        </div>
    )
}

export default Faq