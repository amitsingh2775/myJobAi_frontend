import { redirect } from "next/navigation";
import { getToken } from "../../lib/getverifyToken";
import TokenDebug from "@/components/TokenDebug"; 

export default async function Dashboard() {
  const tokenData = await getToken();

  if (!tokenData) {
    redirect("/auth/login");
  }

  return (
    <div>
      <TokenDebug tokenData={tokenData} />
      <h1>Dashboard</h1>
      <p>click on sidebar and explore</p>
    </div>
  );
}
