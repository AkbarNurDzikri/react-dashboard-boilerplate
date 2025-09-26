import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type InputType = "text" | "number" | "email" | "password";

interface ControllerInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  label: string;
  name: Path<T>;
  placeholder?: string;
  type?: InputType;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  leftIconClassName?: string;
  rightIconClassName?: string;
  className?: string;
}

export const ControllerInput = <T extends FieldValues>({
  form,
  label,
  name,
  placeholder,
  type = "text",
  leftIcon,
  rightIcon,
  leftIconClassName,
  rightIconClassName,
  className,
}: ControllerInputProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={`${className} mb-3`}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              {/* Left Icon */}
              {leftIcon && (
                <div
                  className={cn(
                    "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500",
                    leftIconClassName
                  )}
                >
                  {leftIcon}
                </div>
              )}

              <Input
                placeholder={placeholder}
                type={type}
                {...field}
                className={cn(
                  leftIcon && "pl-10",
                  rightIcon && "pr-10",
                  "transition-colors"
                )}
              />

              {/* Right Icon */}
              {rightIcon && (
                <div
                  className={cn(
                    "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500",
                    rightIconClassName
                  )}
                >
                  {rightIcon}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
