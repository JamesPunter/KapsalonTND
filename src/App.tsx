import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { HomePage } from "@/components/home-page";
import { LocationPage } from "@/components/location-page";
import { SiteShell } from "@/components/site-shell";
import { locationsBySlug } from "@/data/site-content";

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<SiteShell />}>
          <Route index element={<HomePage />} />
          <Route
            path="amsterdam-oost"
            element={
              <LocationPage location={locationsBySlug["amsterdam-oost"]} />
            }
          />
          <Route
            path="amsterdam-west"
            element={
              <LocationPage location={locationsBySlug["amsterdam-west"]} />
            }
          />
          <Route
            path="zaandam"
            element={<LocationPage location={locationsBySlug.zaandam} />}
          />
          <Route
            path="amsterdam"
            element={<Navigate replace to="/amsterdam-oost" />}
          />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
