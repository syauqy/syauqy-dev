import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";

import remarkGfm from "remark-gfm";

export const ROOT = process.cwd();
export const POSTS_PATH = path.join(ROOT, "data/blog");

export const getSourceOfFile = (fileName: string) => {
  return fs.readFileSync(path.join(POSTS_PATH, fileName), "utf8");
};

const getCompiledMDX = async (content: string) => {
  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(
      ROOT,
      "node_modules",
      "esbuild",
      "esbuild.exe"
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      ROOT,
      "node_modules",
      "esbuild",
      "bin",
      "esbuild"
    );
  }
  // Add your remark and rehype plugins here
  const remarkPlugins: [] = [];
  const rehypePlugins: [] = [];

  try {
    return await bundleMDX(content, {
      xdmOptions(options) {
        options.remarkPlugins = [
          ...(options.remarkPlugins ?? []),
          ...remarkPlugins,
        ];
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          ...rehypePlugins,
        ];

        return options;
      },
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllPosts = () => {
  return fs
    .readdirSync(POSTS_PATH)
    .filter((path) => /\.mdx?$/.test(path))
    .map((fileName) => {
      const source = getSourceOfFile(fileName);
      const slug = fileName.replace(/\.mdx?$/, "");
      const { data } = matter(source);

      return {
        frontmatter: data,
        slug: slug,
      };
    });
};

export const getSinglePost = async (slug: string) => {
  const source = getSourceOfFile(slug + ".mdx");

  const { code, frontmatter } = await getCompiledMDX(source);
  return {
    frontmatter,
    code,
  };
};
