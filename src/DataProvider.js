import { useState } from "react";
import constate from "constate";

function useContent() {
  const [route, setRoute] = useState("");
  return { route, setRoute };
}

export const [DataProvider, useRoute, useSetRoute] = constate(
  useContent,
  (val) => val.route,
  (val) => val.setRoute
);
