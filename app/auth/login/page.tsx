import { redirect } from "next/navigation";
import { getToken } from "@/lib/getverifyToken";
import LoginForm from "@/components/LoginForm"; 

export default async function LoginPage() {
  const token = await getToken();
  if (token) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <LoginForm />
    </div>
  );
}