// post
export interface PostProps {
  title: string;
  content: string;
}

// postCard
export interface PostCardProps {
  title: string;
  image?: string;
  name?: string;
  date?: string | Date;
}
