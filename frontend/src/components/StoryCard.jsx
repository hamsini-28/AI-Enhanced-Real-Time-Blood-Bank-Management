import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"

const StoryCard = ({ story }) => {

  return (
    <div className="flex flex-col gap-3 shadow-lg hover:shadow-xl bg-white p-5 rounded-2xl ">
      {/* Header */}
      <div className="flex gap-3 items-center">
        <img
          src="https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
          alt="profile"
          className="w-15 h-15 rounded-full"
        />
        <div>
          <h5 className="text-base font-medium">{story.name}</h5>
          <h6 className="text-sm text-[#696969]">{story.timeStamp}</h6>
        </div>
      </div>

      {/* Comment */}
      <ScrollArea className=" h-50 border-0  rounded-md px-1  ">
        {story.comment}
      </ScrollArea>

      {/* Footer */}
      <h5 className="text-sm font-medium text-[#696969] py-1 px-3 rounded-2xl bg-blue-50 w-fit">{story.tag}</h5>
    </div>
  );
};

export default StoryCard;
