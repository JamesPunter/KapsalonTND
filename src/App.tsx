import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { HomePage } from "@/components/home-page";
import { LocationPage } from "@/components/location-page";
import { SiteShell } from "@/components/site-shell";
import { locations } from "@/data/site-content";

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<SiteShell />}>
          <Route index element={<HomePage />} />
          {locations.map((location) => (
            <Route
              key={location.slug}
              path={location.slug}
              element={<LocationPage location={location} />}
            />
          ))}
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
