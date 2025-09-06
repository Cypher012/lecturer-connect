"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export function FormSubmit({ children, className }: { children?: React.ReactNode; className?: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className={className} disabled={pending} aria-disabled={pending}>
      {pending ? "Please wait..." : children ?? "Submit"}
    </Button>
  );
}


