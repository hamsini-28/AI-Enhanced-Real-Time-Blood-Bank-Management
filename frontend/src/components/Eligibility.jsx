import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const basicRequirements = [
    {
        type: "Age",
        description: "17-65 years old (16 with parental consent)"
    },
    {
        type: "Weight",
        description: "At least 110 pounds (50 kg)"
    },
    {
        type: "Health",
        description: "Good general health and feeling well"
    },
    {
        type: "Frequency",
        description: "Wait 56 days between whole blood donations"
    },
];

const beforeDonate = [
    "Get a good night's sleep",
    "Eat a healthy meal before donating",
    "Drink plenty of water",
    "Bring a valid photo ID",
    "Avoid alcohol for 24 hours before",
];

function DropdownMenuCheckboxGroup({ maintext, options, value, onChange }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="font-normal w-full bg-white text-black hover:bg-blue-50 rounded-full focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0 focus:border-blue-500">
                    {value || maintext}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-0 bg-white min-w-[var(--radix-dropdown-menu-trigger-width)] w-full rounded-2xl">
                <DropdownMenuSeparator />
                {options.map((option, i) => (
                    <DropdownMenuCheckboxItem
                        key={i}
                        checked={value === option}
                        onCheckedChange={() => onChange(option)}
                        className={`hover:bg-blue-50 hover:text-blue-500 w-full font-normal ${value === option ? "text-blue-500 bg-blue-50" : "bg-white text-black"} `}
                    >
                        {option}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

const Eligibility = () => {
    const [eligibilityCriteria, setEligibilityCriteria] = useState({
        age: "",
        weight: "",
        days: "",
        well: false
    });
    const [result, setResult] = useState("");

    const handleDropdownChange = (field) => (value) => {
        setEligibilityCriteria(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCheckboxChange = (checked) => {
        setEligibilityCriteria(prev => ({
            ...prev,
            well: checked
        }));
    };

    const checkEligibility = () => {
        const { age, weight, days, well } = eligibilityCriteria;

        if (!age || !weight || !days || !well) {
            setResult("Please complete all fields.");
            return;
        }

        if (age === "16-17 Years") {
            setResult("You may need parental consent to donate.");
            return;
        }
        if (age === "65+ years") {
            setResult("Please consult with a medical professional for eligibility.");
            return;
        }
        if (weight === "Under 50kgs") {
            setResult("You must weigh at least 50kg to donate.");
            return;
        }
        if (days === "Less than 56 days ago") {
            setResult("You must wait at least 56 days between donations.");
            return;
        }
        if (!well) {
            setResult("You must be feeling healthy and well to donate.");
            return;
        }
        setResult("You are likely eligible to donate blood!");
    };

    return (
        <div id="eligibility" className='flex flex-col gap-12 justify-center items-center scroll-mt-20 my-4 md:py-12 py-10 sm:px-16 lg:px-20 xl:px-36 px-4'>
            <h2 className='text-3xl sm:text-4xl font-bold'>Donation Eligibility</h2>
            <h5 className='text-xl sm:text-2xl text-[#696969] font-normal md:w-[768px] text-center px-1'>Check if you're eligible to donate blood. These requirements help ensure the safety of both donors and recipients.</h5>

            <div className='flex flex-col lg:flex-row gap-10'>
                <div className='flex flex-col gap-6 w-full'>
                    <h3 className='text-2xl text-black font-bold'>Basic Requirements</h3>
                    <div className='flex flex-col gap-3'>
                        {basicRequirements.map((requirement, i) => <div
                            key={i}
                            className='flex gap-2 sm:items-center'
                        >
                            <i className="ri-shield-check-line text-green-500 text-lg sm:text-xl"></i>
                            <h6 className='text-lg sm:text-2xl font-semibold'>{requirement.type}:</h6>
                            <p className='text-base sm:text-lg font-normal text-[#696969] '>{requirement.description}</p>
                        </div>)}
                    </div>
                    <h4>Before You Donate</h4>
                    <div className='flex flex-col gap-3 bg-blue-50 p-8 '>
                        {beforeDonate.map((x, i) => <p key={i}
                            className='text-lg font-normal text-[#696969]'
                        >
                            • {x}
                        </p>)}
                    </div>
                </div>
                {/* Quick Eligibility Check */}
                <div className="flex flex-col gap-5  bg-gray-50 p-6 rounded-2xl ">
                    <h3 className='text-2xl text-black font-bold w-full'>Quick Eligibility Check</h3>
                    <div className='bg-gray-50 w-full'>
                        <h6 className="text-[#696969] font-medium mb-3 ">Age</h6>
                        <DropdownMenuCheckboxGroup
                            maintext={"Select your age range"}
                            options={["16-17 Years", "18-65 years", "65+ years"]}
                            value={eligibilityCriteria.age}
                            onChange={handleDropdownChange("age")}
                        />
                    </div>
                    <div className='bg-gray-50 w-full'>
                        <h6 className="text-[#696969] font-medium mb-3">Weight</h6>
                        <DropdownMenuCheckboxGroup
                            maintext={"Select weight range"}
                            options={["Under 50kgs", "50+ kgs"]}
                            value={eligibilityCriteria.weight}
                            onChange={handleDropdownChange("weight")}
                        />
                    </div>
                    <div className='bg-gray-50 w-full'>
                        <h6 className="text-[#696969] font-medium mb-3">Last Donation</h6>
                        <DropdownMenuCheckboxGroup
                            maintext={"When did you last donate?"}
                            options={["Never donated", "Less than 56 days ago", "More than 56 days ago"]}
                            value={eligibilityCriteria.days}
                            onChange={handleDropdownChange("days")}
                        />
                    </div>
                    <div className="flex items-center gap-3 ">
                        <Checkbox
                            id="well"
                            checked={eligibilityCriteria.well}
                            onCheckedChange={handleCheckboxChange}
                            className="border-2 border-[#505050]"
                        />
                        <Label htmlFor="well" className="text-[#696969]">I am currently feeling healthy and well</Label>
                    </div>
                    <button
                        className='text-white hover:cursor-pointer px-2 w-full h-8 bg-red-600 hover:bg-red-700 rounded-lg '
                        onClick={checkEligibility}
                    >
                        Check Eligibility
                    </button>
                    {result && (
                        <div className={`flex gap-2 rounded-3xl p-2 ${result.includes("eligible") ? "bg-green-50" : "bg-yellow-50"}`}>
                            <i className={`ri-information-line ${result.includes("eligible") ? "text-green-700" : "text-yellow-700"} text-2xl`}></i>
                            <h6 className={`text-sm ${result.includes("eligible") ? "text-green-800" : "text-yellow-800"}`}>{result}</h6>
                        </div>
                    )}
                    <div className="flex gap-2 bg-yellow-50 rounded-3xl p-2">
                        <i className="ri-information-line text-yellow-700 text-2xl"></i>
                        <h6 className="text-sm text-yellow-800 ">This is a preliminary check. Final eligibility will be determined during your appointment with a medical professional.</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Eligibility