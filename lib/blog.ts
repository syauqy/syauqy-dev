export type BlogProps = {
  code: string;
  frontmatter: {
    image: string;
    publishedAt: string;
    summary: string;
    title: string;
  };
};

export type PostsProps = {
  posts: Post[];
};

export type Post = {
  slug: string;
  frontmatter: {
    image: string;
    publishedAt: string;
    summary: string;
    title: string;
  };
};
