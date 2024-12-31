import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

const HomeViewComponent = lazy(async () => ({
  default: (await import("./views/home-view")).HomeView,
}));

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={HomeViewComponent} />
      </Routes>
    </BrowserRouter>
  );
}
