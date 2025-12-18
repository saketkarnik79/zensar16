import './App.css'
import ProjectsPage from './projects/ProjectsPage'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router';
import HomePage from './HomePage';
import NotFound from './NotFound';
import ProjectPage from './projects/ProjectPage';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {

  return (
    <>
      {/* <h1>Ready to build projects with React.</h1> */}
      {/* <blockquote cite="Benjamin Franklin">
        An investment in knowledge pays the best interest.
      </blockquote> */}

      {/* <div className='container'>
        <ProjectsPage/>
      </div> */}
      <Provider store={store}>
        <BrowserRouter>
          <header className='sticky'>
            <span className='logo'>
              <img src='/assets/logo-3.svg' alt='logo' width='49' height='99' />
            </span>
            <NavLink to='/' className='button rounded'>
              <span className='icon-home'></span>
              Home
            </NavLink>
            <NavLink to='/projects' className='button rounded'>
              Projects
            </NavLink>
          </header>

          <div className='container'>
            <Routes>
              <Route path='/' element={<HomePage/>} />
              <Route path='/projects' element={<ProjectsPage/>} />
              <Route path='/projects/:id' element={<ProjectPage/>} />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App;
