import { useEffect } from "react";
import { useParams } from "react-router-dom"
import ArticleService from "../service/article";
import { useDispatch, useSelector } from "react-redux";
import { getArticleDetailFailure, getArticleDetailStart, getArticleDetailSuccess } from "../slice/article";
import { Loader } from "../ui";
import moment from "moment";
import { convert } from "html-to-text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const ArticleDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { articleDetail, isLoading } = useSelector(state => state.article);

  const getArticleDetail = async () => {
    dispatch(getArticleDetailStart());
    try {
      const response = await ArticleService.getArticleDetail(slug);
      dispatch(getArticleDetailSuccess(response.article));
    } catch (error) {
      dispatch(getArticleDetailFailure(error));
    }
  }
  useEffect(() => { getArticleDetail() }, [slug]);

  const text = () => {
    return articleDetail?.body?.split("").map(data => data === '\\' ? ' <br/> ' : data).join('').split(' ').map(data => data.indexOf('n') ? data : data.slice(1)).join(' ');
  };

  return (
    <div className="container mt-5">
      {isLoading
        ?
        <div style={{ height: '70vh', width: '100%' }} className="d-flex align-items-center justify-content-center"><Loader /></div>
        :
        <>
          <div className="py-5 px-2 mb-4 bg-light rounded-3">
            <h1 className="display-5 fw-bold">{articleDetail?.title}</h1>
            <p className="col-12 fs-4">{articleDetail?.description}</p>

            <div className="d-flex gap-3">
              <p className='text-muted'>
                <span className='fw-bold'>Created at:</span> &nbsp; {moment(articleDetail?.createdAt).format("DD MMM, YYYY")}
              </p>
            </div>

            <div className="row">
              <div className="col">
                <div style={{ textAlign: 'justify' }}>
                  <div className="card flex-row box-shadow m-3" style={{ height: '320px', maxWidth: '550px', float: 'right' }}>
                    <div className="card-body d-flex flex-column align-items-start position-relative">
                      <div className="position-absolute top-1 end-0">
                        <button className="me-3 btn border-0">
                          <FontAwesomeIcon icon={faHeart} style={{ color: articleDetail?.favorited ? 'crimson' : 'white' }} />
                        </button>
                      </div>
                      <div>
                        {articleDetail?.tagList.length > 0 ?
                          <>
                            <small><b>Tags:</b><br /></small>
                            <div className="d-flex gap-1 mb-2">
                              {articleDetail?.tagList?.map((data, i) => (
                                <button key={i} className="btn btn-secondary p-1" style={{ fontSize: '12px' }}>
                                  <span>#{data}</span>
                                </button>
                              ))}
                            </div>
                          </> : <></>}
                      </div>
                      <div>
                        <small><b>Username:</b><br /></small>
                        <h3 className="mb-0"> {articleDetail?.author.username}</h3>
                      </div>
                      <small><b>Information:</b><br /></small>
                      <p className="text-muted" style={{ fontSize: '14px' }}>{articleDetail?.description}</p>
                    </div>
                    <img className="card-img-right flex-auto d-none d-md-block" alt="Thumbnail" src={articleDetail?.author.image} style={{ width: '200px', objectFit: 'cover' }} />
                  </div>
                  <p>{convert(text())}</p>
                </div>
              </div>
            </div>

          </div>
        </>
      }
    </div >
  )
}

export default ArticleDetail;