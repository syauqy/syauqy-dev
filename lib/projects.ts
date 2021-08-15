import _ from "lodash";

export type ProjectProps = {
  readonly records: ProjectRecords[];
};

export type ProjectRecords = {
  readonly fields: {
    readonly description?: string;
    readonly last_update?: string;
    readonly main_url: string;
    readonly name?: string;
    readonly repo_title: string;
    readonly repo_url: string;
    readonly stacks: string[];
  };
};

export const stackColors = [
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

export const stackClass = (stack: string) => {
  const classes = _.find(stackColors, { stack_name: stack });
  return [classes?.class, "text-xs p-1 rounded mr-2 mb-1"];
};
