import type { Metadata } from "next";
import { LoginForm } from "@/features/admin/login-form";

export const metadata: Metadata = {
  title: "Admin · We Make",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string; error?: string }>;
}) {
  const { redirect, error } = await searchParams;
  return <LoginForm redirectTo={redirect || "/admin"} initialError={error} />;
}
