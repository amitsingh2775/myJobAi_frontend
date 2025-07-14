"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

function Page() {
  const [email, setEmail] = useState("");
  const [name,setName]=useState("")
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   

    try {
      
      const res = await api.post("/api/auth/register", { email,name, password });
    

      if (res.status === 200) {
        toast.success("Account Created")
        sessionStorage.setItem("email",email);
        router.push("/auth/otp");
      } else {
       
       toast.error("Registration Faild")
      }
    } catch (error) {
     
      toast.error("someting went wrong")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
          <CardAction>
            <Link href="/auth/login">
              <Button variant="link">Sign In</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
               <Label htmlFor="name">name</Label>
                <Input
                  id="name"
                  type="name"
                  value={name}
                  placeholder="jhon"
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                    
                  }}
                />
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  placeholder="m@example.com"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                   
                  }}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  value={password}
                  id="password"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    
                  }}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-6">
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
        
        </CardFooter>
      </Card>
    </div>
  );
}

export default Page;