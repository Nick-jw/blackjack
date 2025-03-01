import { BrowserRouter, Route, Routes } from 'react-router';
import Loading from './pages/Loading';
import Layout from './pages/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Loading />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
