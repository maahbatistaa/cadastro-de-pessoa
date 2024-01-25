import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LoginPage } from './pages/login/LoginPage';
import { RegisterPage } from './pages/register/RegisterPage';
import { CadastroPessoa } from './pages/cadastro/CadastroPessoa';
import { HomePage } from './pages/home/HomePage';
import { Providers } from './providers';
import { PrivateRoute } from './routes/PrivateRoute';
import { NotFound } from './components/notfound/notfound'


export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Providers>
          <Header />
          <main className="Appbody">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/cadastro" element={<CadastroPessoa />} />
              </Route>
              <Route path='*' element={<NotFound/>} />
            </Routes>
          </main>
          <Footer />
        </Providers>
      </BrowserRouter>
    </div>
  );
}