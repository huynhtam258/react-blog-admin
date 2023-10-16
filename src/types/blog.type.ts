import { User } from "./user.type";

export interface Post {
  id: number,
  title: string,
  description: string,
  thumbnail: string,
  status: number,
  created_at: string,
  updated_at: string,
  content: string,
  publish: boolean,
  publish_date: string,
  user: User | null
}