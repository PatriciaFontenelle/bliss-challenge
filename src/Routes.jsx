import {
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ListPage, { questionsLoader } from "./pages/listPage";
import DetailsPage from "./pages/detailsPage";
import Layout from "./components/layout";
import PageNotFound from "./pages/pageNotFound";
import HealthCheckPage from "./pages/healthCheckPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<HealthCheckPage />} path="/" />
      <Route element={<Layout />} path="/">
        <Route
          element={<ListPage />}
          path="/questions"
          loader={questionsLoader}
        />
        <Route element={<DetailsPage />} path="/questions/:id" />
      </Route>
      <Route element={<PageNotFound />} path="*" />
    </>
  )
);

export default router;
