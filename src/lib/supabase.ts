import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://seccjybpqsbdkktythci.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlY2NqeWJwcXNiZGtrdHl0aGNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0NzY1OTgsImV4cCI6MjA2ODA1MjU5OH0.BY_A4HA9M3OivZRpIksK4UXL61nn1fa2dNEzM1OeZNs";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Content {
  id: number;
  title: string;
  textHtml: string;
  banner?: string;
  createdBy: string;
  createdDate: string;
  updatedBy?: string;
  updatedDate: string;
  status: "Draft" | "Published" | "Scheduled";
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  createdDate: string;
  updatedDate: string;
}

export interface Tag {
  id: number;
  name: string;
  color: string;
  createdDate: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
  email?: string;
  role: "admin" | "editor" | "viewer";
  createdDate: string;
  lastLogin?: string;
}

export interface ContentTag {
  contentId: number;
  tagId: number;
}

export interface ContentCategory {
  contentId: number;
  categoryId: number;
}
