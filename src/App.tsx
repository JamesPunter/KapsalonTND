import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { HomePage } from "@/components/home-page";
import { LocationPage } from "@/components/location-page";
import { SiteShell } from "@/components/site-shell";
import { locationsBySlug } from "@/data/site-content";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteShell />}>
          <Route index element={<HomePage />} />
          <Route
            path="amsterdam"
            element={<LocationPage location={locationsBySlug.amsterdam} />}
          />
          <Route
            path="zaandam"
            element={<LocationPage location={locationsBySlug.zaandam} />}
          />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
