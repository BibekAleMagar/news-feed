import axios from 'axios'
import type { NewsApiResponse } from '@/types/mixedNews/mixResponse'

export const getTopHeadline = async(pageParam: number) : Promise<NewsApiResponse> => {

        const response = await axios.get<NewsApiResponse>("https://newsapi.org/v2/top-headlines", {
            params: {
                page: pageParam,
                pageSize: 6,
                apiKey: import.meta.env.VITE_API_KEY,
                q: 'us'
            
            }
        })

        return response.data
}

