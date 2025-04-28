import { Route, Routes } from "react-router";
import { Congregation } from "./Congregation";
import { Homepage } from "./Homepage";
import { NotFound } from "./NotFound";
import { Section } from "./Section";

export const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="congregation" element={<Congregation />} />
      <Route path="section" element={<Section />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
