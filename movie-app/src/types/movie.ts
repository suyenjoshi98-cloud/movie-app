export interface Movie  {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
}

export interface MovieResponse {
    results: Movie[];
    total_results: number;
    total_pages: number
}

export interface Video {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
}

export interface VideoResponse {
    results: Video[];
}

export interface Review {
  id: string;
  author: string;
  content: string;
  created_at: string;
  author_details: {
    rating: number;
    avatar_path: string;
  };
}

export interface ReviewResponse {
  results: Review[];
  total_results: number;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export interface CreditsResponse {
  cast: Cast[];
}