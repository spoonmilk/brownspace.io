import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home.tsx'
import Members from './pages/Members.tsx'
import './main.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from './components/theme-provider.tsx';
import { SessionProvider } from "next-auth/react";
import ProjectsPage from './pages/ProjectsPage.tsx'
import SubgroupsPage from './pages/SubgroupsPage.tsx'
import SponsorsPage from './pages/SponsorsPage.tsx'
import BlogPage from './pages/BlogPage.tsx'
import BlogPostPage from './pages/BlogPostPage.tsx'
import BlogSubmitPage from './pages/BlogSubmitPage.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Home />
  },
  {
    path: "/members",
    element: <Members />,
    errorElement: <Home />
  },
  {
    path: "/projects",
    element: <ProjectsPage />,
    errorElement: <Home />
  },
  {
    path: "/subgroups",
    element: <SubgroupsPage />,
    errorElement: <Home />
  },
  {
    path: "/sponsors",
    element: <SponsorsPage />,
    errorElement: <Home />
  },
  {
    path: "/blog",
    element: <BlogPage />,
    errorElement: <Home />
  },
  {
    path: "/blog/submit",
    element: <BlogSubmitPage />,
    errorElement: <Home />
  },
  {
    path: "/blog/:slug",
    element: <BlogPostPage />,
    errorElement: <Home />
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SessionProvider>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </SessionProvider>
  </React.StrictMode>,
)
