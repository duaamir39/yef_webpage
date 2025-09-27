"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, className, id, ...props }, ref) => {
    const [show, setShow] = React.useState(false);

    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={id} className="text-sm font-medium">
            {label}
          </label>
        )}
        <div className="relative">
          <Input
            id={id}
            ref={ref}
            type={show ? "text" : "password"}
            className={`h-12 pr-12 ${className ?? ""}`}
            {...props}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShow((prev) => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
            <span className="sr-only">{show ? "Hide password" : "Show password"}</span>
          </Button>
        </div>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
