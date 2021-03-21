export interface Issue {
  id: number;
  state: string;
  created_at: Date;
  title: string;
  body: string;
  url: string;
  user: {
    login: string;
    url: string;
    avatar_url: string;
  };
}
export type Issues = Issue[];
