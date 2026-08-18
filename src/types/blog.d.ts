// src/types/blog.d.ts

export interface Blog {
  id: string;
  slug: string;
  body: string;
  collection: string;
  render: any;
  data: {
    title: string;
    description: string;
    featuredImg: string;
    date: Date;
    author: string;
    tags: string[];
    readingTime: string;
  };
}
