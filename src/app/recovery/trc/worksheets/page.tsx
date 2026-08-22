"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WorksheetsPage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/recovery/trc/downloads");
  }, [router]);
  return null;
}
