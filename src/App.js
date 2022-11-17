import './assets/style/global.scss'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme } from './hooks/useTheme';
import { useEffect, useState } from 'react';
import { Header } from './components/layout/Header';
import { Home } from './pages/Home';
import { Sidebar } from './components/layout/Sidebar';
import { useToggle } from './hooks/useToggle';
import { Redirect } from './components/Redirect';
import { ToastrNotification } from './components/ToastrNotification';
import { ControlPages } from './pages/controls-pages/ControlPages';
import { Settings } from './pages/Settings/Settings';
import { PageInfinityScroll } from './pages/PageInfinityScroll/PageInfinityScroll';
import { PageContextMenu } from './pages/PageContextMenu/PageContextMenu';
import { PageDropdown } from './pages/PageDropdown/PageDropdown';
import { PageTable } from './pages/PageTable/PageTable';
import { PageAccordion } from './pages/PageAccordion/PageAccordion';
import { PageToastrNotification } from './pages/PageToastrNotification/PageToastrNotification';
import { PagePopup } from './pages/PagePopup/PagePopup';
import { PageVideoPlayer } from './pages/PageVideoPlayer/PageVideoPlayer';
import { PageCarrousel } from './pages/PageCarrousel/PageCarrousel';
import { OutletInputs } from './pages/controls-pages/outlet/OutletInputs';
import { OutletPickers } from './pages/controls-pages/outlet/OutletPickers';
import { OutletButtons } from './pages/controls-pages/outlet/OutletButtons';
import { PageStyledScrollbar } from './pages/PageStyledScrollbar/PageStyledScrollbar';
function App() {

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTheme()
  }, [])

  const [isSidebarOpen, toggleIsSidebarOpen] = useToggle();

  /*
  TODO: 
    Inputs: 
    pickers:
    components: 
  */


  return (
    <div className="App">
      <Header
        toggleIsSidebarOpen={toggleIsSidebarOpen}
      />

      <ToastrNotification />

      <div className='flex align-start content'>
        <Router>
          <Sidebar
            isSidebarOpen={isSidebarOpen}
          />
          <Routes>
            <Route exact path="/" element={<Redirect to='/home' />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="infinityScroll" element={<PageInfinityScroll />} />
            <Route exact path="contextMenu" element={<PageContextMenu />} />
            <Route exact path="dropdown" element={<PageDropdown />} />
            <Route exact path="table" element={<PageTable />} />
            <Route exact path="accordion" element={<PageAccordion />} />
            <Route exact path="toastrNotification" element={<PageToastrNotification />} />
            <Route exact path="popup" element={<PagePopup />} />
            <Route exact path="video-player" element={<PageVideoPlayer />} />
            <Route exact path="styledScrollbar" element={<PageStyledScrollbar />} />
            <Route exact path="carrousel" element={<PageCarrousel />} />
            <Route exact path="/controls" element={<ControlPages />}>
              <Route exact path="input" element={<OutletInputs />} />
              <Route exact path="picker" element={<OutletPickers />} />
              <Route exact path="button" element={<OutletButtons />} />
              <Route exact path="" element={<Redirect to='input' />} />
            </Route>
            <Route exact path="/settings" element={<Settings />} />
          </Routes>
        </Router>
      </div>
    </div >
  );
}

export default App;
