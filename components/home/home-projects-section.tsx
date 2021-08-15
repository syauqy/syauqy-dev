import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import clsx from "clsx";
import _ from "lodash";

export default function HomeProjectsSection() {
  const [projects, setProjects] = useState({});

  const stackColors = [
    {
      stack_name: "Next.js",
      class: "bg-gray-100 text-gray-600",
    },
    {
      stack_name: "Typescript",
      class: "bg-blue-50 text-blue-500",
    },
    {
      stack_name: "Gatsby",
      class: "bg-purple-50 text-purple-500",
    },
    {
      stack_name: "Chart.js",
      class: "bg-pink-50 text-pink-500 ",
    },
    {
      stack_name: "Supabase",
      class: "bg-green-50 text-brand-supabase",
    },
    {
      stack_name: "Tensorflowjs",
      class: "bg-yellow-50 text-yellow-500",
    },
    {
      stack_name: "Mapbox",
      class: "bg-blue-50 text-blue-700",
    },
    {
      stack_name: "Jala API",
      class: "bg-blue-50 text-brand-jala",
    },
    {
      stack_name: "Chakra UI",
      class: "bg-green-50 text-brand-chakra",
    },
    {
      stack_name: "Netlify CMS",
      class: "bg-green-50 text-brand-netlify",
    },
    {
      stack_name: "Tailwind CSS",
      class: "bg-green-50 text-brand-tailwind",
    },
  ];

  const stackClass = (stack: string) => {
    const classes = _.find(stackColors, { stack_name: stack });
    return ["text-xs p-1 rounded", classes?.class];
  };

  function showProjects() {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/recent_projects?sort%5B0%5D%5Bfield%5D=last_update
&sort%5B0%5D%5Bdirection%5D=desc`,
        {
          headers: {
            Authorization: `Bearer ` + process.env.NEXT_PUBLIC_AIRTABLE_TOKEN,
          },
        }
      )
      .then((res) => setProjects(res.data))
      .catch((error) => console.log(error.data));
  }

  useEffect(() => {
    showProjects();
  }, []);

  return (
    <div className="head p-5 pb-6 w-full bg-white bg-opacity-50 rounded-md shadow-md">
      <h2 className="text-lg font-semibold pb-4 text-gray-700">
        💻 Recent projects and contributions
      </h2>
      <div className="flex flex-col space-y-4">
        {projects?.records ? (
          projects?.records.map((project, i: number) => (
            <div
              key={i}
              className="border-gray-300 rounded-md border hover:shadow-md"
            >
              <div className="space-y-3 p-4">
                <div className="space-y-1">
                  <Link href={project.fields.main_url} passHref>
                    <a target="_blank" rel="nofollow noopener noreferrer">
                      <h2 className="text-md text-gray-700 font-semibold truncate">
                        {project.fields.name}
                      </h2>
                    </a>
                  </Link>
                  <p className="text-gray-500 text-sm font-light">
                    {project.fields.description}
                  </p>
                </div>
                <div className="">
                  {project.fields.repo_url ? (
                    <Link
                      href={
                        project.fields.repo_url ? project.fields.repo_url : ""
                      }
                      passHref
                    >
                      <a
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className={clsx(
                          project.fields.repo_url ? "" : "cursor-default"
                        )}
                      >
                        <p className="text-blue-400 text-sm font-medium">
                          {project.fields.repo_title}
                        </p>
                      </a>
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-wrap space-x-2">
                  {project.fields.stacks.map((stack, i: number) => (
                    <div key={i} className={clsx(stackClass(stack))}>
                      {stack}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="border-gray-300 rounded-md border p-4">
            <div className="flex flex-col space-y-4 animate-pulse">
              <div className="bg-gray-400 h-5 w-1/3"></div>
              <div className="bg-gray-400 h-10"></div>
              <div className="bg-gray-400 h-4 w-1/4"></div>
              <div className="bg-gray-400 h-3 w-1/2"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
