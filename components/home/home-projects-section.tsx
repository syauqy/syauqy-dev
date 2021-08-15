import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import clsx from "clsx";
import { ProjectProps, stackClass } from "~/lib/projects";

export default function HomeProjectsSection() {
  const [projects, setProjects] = useState<ProjectProps>({} as ProjectProps);
  console.log(projects);

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
                <div className="flex flex-wrap">
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
        <p className="text-blue-400 text-light">
          View more on{" "}
          <a
            className="font-medium"
            href="https://github.com/syauqy"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </div>
    </div>
  );
}
