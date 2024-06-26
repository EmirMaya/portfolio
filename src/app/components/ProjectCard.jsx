import React from "react";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl }) => {

  return (
    <div className="bg-[#2f2f2f] rounded-xl h-[370px] md:h-[450px]">
      <div
        className="h-52 md:h-72 rounded-t-xl relative group"
        style={{ background: `url(${imgUrl})`, backgroundSize: "cover" }}
      >
        <div className="overlay items-center justify-center rounded-t-xl absolute top-0 left-0 w-full h-full bg-[#151515] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500">
          <Link
            href={gitUrl}
            target="_blank"
            className="h-14 w-14 mr-2 border-2 relative border-white hover:border-white group/link"
          >
            <CodeBracketIcon className="h-10 w-10 text-neutral-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white" />
          </Link>
          <Link
            href={previewUrl}
            target="_blank"
            className="h-14 w-14 mr-2 border-2 relative border-white hover:border-white group/link"
          >
            <EyeIcon className="h-10 w-10 text-neutral-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white" />
          </Link>
        </div>
      </div>
      <div className="text-white rounded-b-xl mt-3  py-6 px-4">
            <h5 className="text-xl font-semibold mb-2">
                {title}
            </h5>
            <p className="text-[#b2b1a9]">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
