import { ApiReference } from "@scalar/nextjs-api-reference";

const config = {
  url: "/openapi.yaml",
  cdn: "https://cdn.jsdelivr.net/npm/@scalar/api-reference@1.31.11",
  darkMode: true,
  showSidebar: true,
};

export const GET = ApiReference(config);
