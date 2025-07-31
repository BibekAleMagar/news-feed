import { Link, useNavigate, useParams } from "react-router-dom"
import { useNewsApi } from "@/hooks/newsHook"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { UserRoundPen } from 'lucide-react';
import { Calendar, Loader } from 'lucide-react';
import { Button } from "./ui/button";

export const NewsDetails = () => {
    const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const index = Number(id) 
  const { data, isLoading, error } = useNewsApi()

  if (isLoading) 
  return <div className="flex justify-center items-center">
            <Loader className="animate-spin" />
        </div>
  if (error) return <div className="flex justify-center items-center">
            <p>Something Went Wrong</p>
        </div>
  if (!data || index < 0 || index >= data.length) {
    return <div className="flex justify-center items-center">
            <p>No Data Found</p>
        </div>
  }

  const article = data[index]

  return (
   <>
        <div className="flex justify-center">
            <Card className="w-3xl">
            <CardHeader>
                <CardTitle className="md:text-2xl lg:text-3xl mb-2 leading-snug">{article.title}</CardTitle>
                <div className="flex md:flex-row flex-col justify-between">
                    <p className="flex items-center"><UserRoundPen className="mr-2" />{article.author? article.author : "DummyName"}</p>
                    <p className="flex items-center"><Calendar className="mr-2" /> {new Date(article.publishedAt).toISOString().split('T')[0]}</p>
                </div>
            </CardHeader>
            <CardContent>
                <img src={article.urlToImage} alt="description" className="w-full mb-3" />
                <p className="md:text-lg lg:text-xl text-justify ">{`${article.description} ${article.content}`}</p>
                <div className="flex justify-between mt-4">
                    <Button onClick={() => navigate(-1)} className="cursor-pointer">Back</Button>
                    <Button className="cursor-pointer"><Link to={article.url} target="_blank">Read on Web</Link></Button>
                </div>
            </CardContent>
            </Card>
        </div>
   </>
  )
}
