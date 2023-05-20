import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { ArticleDetail, CreateArticle, Login, Main, Navbar, Register, UpdateArticle } from './components';
import { useEffect } from 'react';
import AuthService from './service/auth';
import { useDispatch } from 'react-redux';
import { signUserSuccess } from './slice/auth';
import { getItem } from './helpers/persistance-storage';

const App = () => {
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const response = await AuthService.getUser();
      dispatch(signUserSuccess(response.user));
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    const token = getItem('token');
    if (token) getUser();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/article/:slug' element={<ArticleDetail />} />
        <Route path='/create-article' element={<CreateArticle />} />
        <Route path='/update-article/:slug' element={<UpdateArticle />} />
      </Routes>
    </>
  )
}

export default App;

