import type { NewsArticle } from "@/types/healthNews/newsModel"
import { fetchNews } from "@/api/query/newsApi"
import { useQuery } from "@tanstack/react-query"

export const useNewsApi = () => {
    return useQuery<NewsArticle[]>({
        queryKey: ['news'],
        queryFn: fetchNews
    })
}