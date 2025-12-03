import axios from "axios"

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL
if (!STRAPI_URL) throw new Error("Missing NEXT_PUBLIC_STRAPI_URL")

const API_TOKEN = process.env.STRAPI_API_TOKEN
const headers: Record<string, string> = {
  "Content-Type": "application/json",
}

if (API_TOKEN) {
  headers.Authorization = `Bearer ${API_TOKEN}`
} else {
  console.warn("STRAPI_API_TOKEN is not set. Public endpoints only.")
}

const api = axios.create({
  baseURL: STRAPI_URL,
  headers,
  timeout: 5000,
})

export default api
