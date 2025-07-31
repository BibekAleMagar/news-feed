import { useInfiniteQuery } from "@tanstack/react-query";
import { getTopHeadline } from "@/api/query/mixApi";


export const useMixNews = () => {
    return useInfiniteQuery({
        queryKey: ['headLines'],
        queryFn: ({pageParam = 1}) =>  getTopHeadline(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const totalLoaded = allPages.length * 10;
            const moreAvailable = totalLoaded < lastPage.totalResults
            return moreAvailable ? allPages.length + 1 : undefined
        }
        }
    )
}