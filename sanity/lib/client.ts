import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "zhfs6dr9", 
  dataset: "production",
  apiVersion: "2024-01-01", 
  // السطر السحري اللي بيقفل الكاش وبيخلي الموقع لايف
  useCdn: false, 
});