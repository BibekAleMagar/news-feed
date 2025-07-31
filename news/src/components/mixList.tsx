import { useMixNews } from "@/hooks/mixHook";
import { useEffect, useRef } from "react";
import dummy from '../assets/dummy.png'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button";

export const MixList = () => {
    const { 
        data, 
        error, 
        fetchNextPage, 
        hasNextPage, 
        isFetching, 
        isFetchingNextPage,
        status 
    } = useMixNews();
    
    const loaderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const firstEntry = entries[0];
                if (firstEntry.isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1, rootMargin: '100px' }
        );

        const currentLoader = loaderRef.current;
        if (currentLoader) {
            observer.observe(currentLoader);
        }

        return () => {
            if (currentLoader) {
                observer.unobserve(currentLoader);
            }
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const articles = data?.pages.flatMap(page => page.articles || []);

    if (isFetching && !isFetchingNextPage) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-64 bg-gray-100 rounded-lg animate-pulse" />
                ))}
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg">
                Error: {error?.message || 'Failed to load news'}
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> 
                {articles?.map((article, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="md:text-lg lg:text-xl">{article.title}</CardTitle>
                        </CardHeader>
                        <CardDescription className="p-2">
                            <img src={article.urlToImage? article.urlToImage : dummy} alt="picture" className="w-90" />
                            <p className="mt-2 text-justify">{article.description}</p>
                        </CardDescription>
                        
                    </Card>
                ))}
                
                {hasNextPage && (
                    <div ref={loaderRef} className="h-10 flex justify-center items-center">
                        {isFetchingNextPage && <div>Loading more...</div>}
                    </div>
                )}
                {!hasNextPage && (
                    <div>No page</div>
                )}
            </div>
        </>
    );
};