"use client";
import { useEffect } from "react";

export default function TokenDebug({ tokenData }: { tokenData: any }) {
  useEffect(() => {
    console.log("Client-side tokenData:", tokenData);
  }, [tokenData]);

  return null;
}
