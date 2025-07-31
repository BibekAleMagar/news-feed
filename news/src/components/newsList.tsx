import { useNewsApi } from "@/hooks/newsHook"
import { Loader} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import dummy from '../assets/dummy.png'
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { useState } from "react";

export const NewList = () => {
    const navigate = useNavigate()
    const {data, isLoading, error} = useNewsApi()
    const [searchTerm, setSearchTerm] = useState("")
    const hanleReadmore = (index: number ) => {
        navigate(`/home/article/${index}`)
    }
    const filteredData = data?.filter((article) => article?.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase().trim()))
    return (
        <>
          <p className="text-3xl font-bold text-center">Get Latest Health News</p>
            <div className="flex justify-center mb-3 relative">
            <Input
              className="md:w-2xl pr-10"
              placeholder="Search by title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        {
            isLoading ? (
                <div className="h-screen flex justify-center items-center">
                    <Loader className="animate-spin" />
                </div>
            ) : error ? (
                <div className="h-screen flex justify-center items-center">
                    <p>Something Went Wrong</p>
                </div>
            ) : filteredData&& filteredData.length > 0 ? (
                <> 
              
                <div className="grid lg:grid-cols-2 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {filteredData.map((article,index) => (
                        <Card key={index} className="shadow">
                            <CardHeader>
                                <CardTitle className="text-justify text-xl">{article.title}</CardTitle>
                                    
                                    <img src={article.urlToImage ? article.urlToImage : dummy} alt="image" className="w-full md:h-64 h-50"/>                               
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-md">{article.description? article.description.slice(0,100) + "...." : "No description found"}</CardDescription>
                            </CardContent>
                            <CardFooter >
                              <Button onClick={() => hanleReadmore(index)} className="cursor-pointer">Read More</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                </>
            ) : (
                <div className="h-screen flex justify-center items-center">
                    <p className="text-center">No data found</p>
                </div>
            )
        }
        </>
    )
}