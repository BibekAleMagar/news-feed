import axios from "axios";
import type { NewsApiResponse, NewsArticle} from "@/types/healthNews/newsModel";

export const fetchNews = async () : Promise<NewsArticle[]>=> {
    const response = await axios.get<NewsApiResponse>(import.meta.env.VITE_NEWS_URL)
    return response.data.articles
}