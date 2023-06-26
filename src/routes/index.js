import HomePage from "../pages/HomePage";
import Catalog from "../pages/Catalog";
import Detail from "../pages/Detail/Detail";
export const publicRoutes = [
    { path: "/", component: HomePage },
    { path: "/:category", component: Catalog },
    { path: "/:category/:id", component: Detail },
    { path: "/:category/search/:keyword", component: Catalog },
];
