import { BrowserRouter, Route, Routes } from 'react-router';
import Loading from './pages/Loading';
import Layout from './pages/Layout';
import Game from './pages/Game';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Loading />} />
          <Route path="game" element={<Game />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
