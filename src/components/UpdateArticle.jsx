import { useNavigate, useParams } from "react-router-dom";
import Form from "../ui/Form"
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getArticleDetailFailure,
  getArticleDetailStart,
  getArticleDetailSuccess,
  postArticleFailure,
  postArticleStart,
  postArticleSuccess,
} from "../slice/article";
import ArticleService from "../service/article";
import { Loader } from "../ui";
import { toast } from "react-toastify";

const UpdateArticle = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [description, setDescription] = useState('');
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (title) setLoading(false);
  }, [title]);

  const getArticleDetail = async () => {
    dispatch(getArticleDetailStart());
    try {
      const { article } = await ArticleService.getArticleDetail(slug);
      setTitle(article.title);
      setBody(article.body);
      setDescription(article.description);
      dispatch(getArticleDetailSuccess(article));
    } catch (error) {
      dispatch(getArticleDetailFailure(error));
    }
  }
  useEffect(() => { getArticleDetail() }, [slug]);

  const formSubmit = async e => {
    e.preventDefault();
    dispatch(postArticleStart());
    const { body, title, description } = ref.current;
    const data = {
      body: body.value,
      title: title.value,
      description: description.value,
    }

    try {
      await ArticleService.editArticle(slug, data);
      dispatch(postArticleSuccess());
      setAlert(true);
      setTimeout(() => { navigate('/'); }, 500);
      ref.current.reset();
    } catch (error) {
      dispatch(postArticleFailure('Error'));
    }
  }

  return (
    <div className='container'>
      {loading ? <div style={{ height: '75vh', width: '100%' }} className="d-flex align-items-center justify-content-center"><Loader /></div> : <>
        <h2 className='text-center mt-5 fw-bold'>Update Article</h2>
        <div className='d-none'>
          {alert &&
            toast.success('Update Article Successfully', {
              position: 'top-right',
              autoClose: 2000,
              progress: 0,
              progressStyle: { background: '#fff' },
              theme: 'colored',
              style: { background: '#008554' },
            })}
        </div>
        <div className="row mt-5">
          <div className="col-md-8 mx-auto">
            <Form refForm={ref} onSubmit={formSubmit} state={{ title, body, description, setTitle, setBody, setDescription }} buttonText={'Update'} />
          </div>
        </div>
      </>}
    </div>
  )
}

export default UpdateArticle;