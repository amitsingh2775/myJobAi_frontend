
import { redirect } from "next/navigation";
import { getToken } from "../../lib/getverifyToken";


export default async function Dashboard() {
  const tokenData = await getToken();
  console.log("tokenData",tokenData)

  if (!tokenData) {
    redirect("/auth/login");
  }
  else{
    redirect("/dashboard/products")
  }
}