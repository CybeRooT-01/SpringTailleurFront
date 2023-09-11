import { BrowserRouter, Routes, Route } from "react-router-dom"
import CategoriesPage from "./pages/CategoriesPage.jsx"
import ArticleConfections from "./pages/ArticleConfections"
import ArticleVentes from "./pages/ArticleVentes"
function App() {

  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/ArticleConfections" element={<ArticleConfections />} />
        <Route path="/ArticleVente" element={<ArticleVentes />} />
        <Route path="*" element={<CategoriesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
