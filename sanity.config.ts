import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { colorInput } from "@sanity/color-input";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Portfolio Studio",
  
  projectId: "zhfs6dr9", 
  dataset: "production",
  basePath: "/studio",

  plugins: [
    structureTool(),
    colorInput()
  ],

  schema: {
    types: schemaTypes,
  },
});