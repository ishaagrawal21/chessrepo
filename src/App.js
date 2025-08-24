
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout/Layout';
import Category from './Screens/Category/Category';
import Dashboard from './Screens/Dashboard/Dashboard';
import Product from './Screens/Product/Product';
import Blog from './Screens/Blogs/Blog';
import AddBlog from './Screens/Blogs/AddBlog';
import Chess from './Screens/chess/Chess';

function App() {
const Screens = (
  <Routes>
  <Route path='/' element={<Dashboard/>}/>
  <Route path='/category' element={<Category/>}/>
  <Route path='/product' element={<Product/>}/>
  <Route path='/blog' element={<Blog/>}/>
  <Route path='/addblog' element={<AddBlog/>}/>
  <Route path='/chess' element={<Chess/>}/>
 </Routes>
)

  return (
   <BrowserRouter>
    <Layout Screens={Screens}/>
   </BrowserRouter>
  );
}

export default App;
