import { Link, useNavigate } from 'react-router-dom';
import logo from '../image/logo-size.png';
import { navbarData } from '../data';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../helpers/persistance-storage.js';
import { reset } from '../slice/auth';

const Navbar = () => {
  const { loggedIn, user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    removeItem('token');
    navigate('/login');
    dispatch(reset());
  }

  return (
    <div className="container-fluid d-flex justify-content-between flex-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
      <h5 className="my-0 mr-md-auto font-weight-normal">
        <Link to={'/'} style={{ color: 'inherit', display: 'flex', gap: '68x', alignItems: 'center' }}>
          <img width={'50px'} height={'50px'} style={{ objectFit: 'cover' }} src={logo} alt="Logo" />
          <span className='d-sm-block d-none'>Rofiyev Dilshod</span>
        </Link>
      </h5>
      <nav className="my-2 my-md-0 mr-md-3">
        {loggedIn ?
          <div className='d-flex align-items-center gap-2'>
            <div style={{ cursor: 'pointer' }} className='d-flex align-items-center gap-1'>
              <p className="py-2 text-dark mb-0 me-1">{user?.username?.split(' ').length > 1 ? `${user.username?.split(' ')[0] + '. ' + user.username?.split(' ')[1].charAt(0)}` : `${user.username?.split(' ')[0]}`}</p>
              <div style={{ width: '40px', height: '40px', display: 'grid', placeItems: 'center' }} className="bg-secondary rounded-circle text-light">
                <span className="fw-bold">{user.username.split(' ').map(n => n[0]).join('')}</span>
              </div>
            </div>
            <Link to={'create-article'}>
              <button className='btn btn-outline-dark'>create</button>
            </Link>
            <button className='btn btn-outline-danger' onClick={logoutHandler}>Logout</button>
          </div>
          :
          <>{navbarData.map(({ slug, name, id }) => (
            <Link key={id} to={slug} className="p-2 text-dark">{name}</Link>
          ))}</>}
      </nav>
    </div>
  )
}

export default Navbar;