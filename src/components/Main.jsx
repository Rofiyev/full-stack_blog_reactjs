import { useDispatch, useSelector } from "react-redux";
import ArticleCard from "./ArticleCard";
import { Loader } from "../ui";
import { useEffect } from "react";
import { getArticleStart, getArticleSuccess } from "../slice/article";
import ArticleService from "../service/article";

const Main = () => {
  const { articles, isLoading } = useSelector(state => state.article);
  const dispatch = useDispatch();

  const getArticle = async () => {
    dispatch(getArticleStart());
    try {
      const response = await ArticleService.getArticle();
      dispatch(getArticleSuccess(response.articles))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => { getArticle() }, [])

  return (
    <div className='container'>
      {isLoading
        ? <div style={{ height: '75vh', width: '100%' }} className="d-flex align-items-center justify-content-center"><Loader /></div>
        : <div className="row mt-5">
          {articles?.map((item, i) => (
            <ArticleCard {...item} key={i} />
          ))}
        </div>}
    </div>
  )
}

export default Main;