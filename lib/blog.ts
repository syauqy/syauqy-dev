export type BlogProps = {
  code: string;
  frontmatter: {
    image: string;
    publishedAt: string;
    summary: string;
    title: string;
    published: boolean;
  };
};

export type PostsProps = {
  posts: Post[];
};

export type PostProps = {
  post: Post;
};

export type Post = {
  slug: string;
  frontmatter: {
    image: string;
    publishedAt: string;
    summary: string;
    title: string;
    published: boolean;
  };
};
