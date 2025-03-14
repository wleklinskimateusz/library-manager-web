import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export const FormField = ({
  label,
  inputOptions,
}: {
  label: string;
  inputOptions: React.ComponentProps<typeof Input>;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label
        htmlFor={inputOptions.id}
        className={cn(inputOptions.required && "font-extrabold")}
      >
        {label}
      </Label>
      <Input {...inputOptions} />
    </div>
  );
};
