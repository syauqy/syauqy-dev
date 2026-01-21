import type { ProjectProps } from "@/lib/projects";

export const PROJECTS: ProjectProps = {
  records: [
    {
      fields: {
        name: "HiringFast",
        description: "AI powered CV and resume screening tool.",
        last_update: "2026-01-15",
        main_url: "https://hiringfa.st",
        repo_title: "hiringfa.st",
        repo_url: "https://hiringfa.st",
        stacks: ["React", "Node.js", "IoT"],
      },
    },
    {
      fields: {
        name: "ShrimpHack",
        description: "Jala's internal hackathon website.",
        last_update: "2025-12-10",
        main_url: "https://www.shrimphack.com/",
        repo_title: "shrimphack.com",
        repo_url: "https://www.shrimphack.com/",
        stacks: ["Next.js", "Express", "Hardware"],
      },
    },
    {
      fields: {
        name: "Corgy Porgy",
        description: `Silicon Valley's "hotdog not a hotdog app" spin off for corgi 🐶.`,
        last_update: "2025-12-10",
        main_url: "https://corgyporgy.vercel.app",
        repo_title: "syauqy/corgyporgy",
        repo_url: "https://github.com/syauqy/corgyporgy",
        stacks: ["Next.js", "Express", "Hardware"],
      },
    },
    {
      fields: {
        name: "Handsign",
        description: `Simple web app to learn ASL (American Sign Language) alphabet gesture using TensorFlow and Handpose model 🤟.`,
        last_update: "2025-12-10",
        main_url: "https://handsign-tensorflow.vercel.app/",
        repo_title: "syauqy/handsign-tensorflow",
        repo_url: "https://github.com/syauqy/handsign-tensorflow",
        stacks: ["Next.js", "Express", "Hardware"],
      },
    },
    {
      fields: {
        name: "Warga Bantu Warga",
        description: `Society initiative of Indonesian people to circulate information about health facilities for COVID-19.`,
        last_update: "2025-12-10",
        main_url: "https://www.wargabantuwarga.com",
        repo_title: "kawalcovid19/wargabantuwarga.com",
        repo_url: "https://github.com/kawalcovid19/wargabantuwarga.com",
        stacks: ["Next.js", "Express", "Hardware"],
      },
    },
  ],
};

export default PROJECTS;
