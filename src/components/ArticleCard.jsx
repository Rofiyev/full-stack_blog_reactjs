import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ArticleService from '../service/article';
import { getArticleSuccess } from '../slice/article';
import { useState } from 'react';
import Toastfiy from './Toastfiy';

const ArticleCard = ({ title, description, author, slug }) => {
  const navigate = useNavigate();
  const { loggedIn, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [deleteItem, setDeleteItem] = useState(false);

  const getArticle = async () => {
    try {
      const response = await ArticleService.getArticle();
      dispatch(getArticleSuccess(response.articles))
    } catch (error) {
      console.log(error);
    }
  }

  const deleteArticle = async slug => {
    try {
      await ArticleService.deleteArticle(slug);
      setDeleteItem(prev => !prev);
      getArticle();
    } catch (error) {
      setDeleteItem(false);
      console.log(error);
    }
  }

  return (
    <div className="col-xl-4 col-md-6" style={{ minHeight: '470px', marginBottom: '20px' }}>
      <div className='d-none'>
        <>{deleteItem && <Toastfiy color={'#008554'} messege={'Delete Article Successfully'} />}</>
      </div>
      <div className="card mb-4 box-shadow" style={{ height: '100%' }}>
        <img className="card-img-top" alt="Thumbnail" style={{ height: '225px', width: '100%', display: 'block' }}
          src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22208%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20208%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_188317d4042%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A11pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_188317d4042%22%3E%3Crect%20width%3D%22208%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2266.9453125%22%20y%3D%22117.3%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <p className="card-text fw-bold">{title}</p>
            <p className="card-text">{description?.split(" ").length > 15 ? (description?.split(/\s+/))?.slice(0, 20).map((text, i) => i === 19 ? `${text} ...` : `${text} `) : description}</p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => navigate(`/article/${slug}`)}>
                View
              </button>
              {loggedIn && user.username === author.username && (
                <>
                  <button type="button" className="btn btn-sm btn-outline-success" onClick={() => navigate(`/update-article/${slug}`)}>
                    Edit
                  </button>
                  <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deleteArticle(slug)}>
                    Delete
                  </button>
                </>
              )}
            </div>
            <small className="text-muted">{author?.username}</small>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleCard;