"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useId, useState } from "react";

import { useTheme } from "next-themes";

import { Switch } from "@/components/ui/switch";

export default function SwitchTheme() {
  const id = useId();
  const { setTheme, theme } = useTheme();
  const [checked, setChecked] = useState<boolean>(true);

  const handleChangeTheme = (checked: boolean) => {
    if (checked === true) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
    setChecked(checked);
  };
  return (
    <div
      className="group inline-flex items-center gap-2"
      data-state={checked ? "checked" : "unchecked"}
    >
      <span
        aria-controls={id}
        className="flex-1 cursor-pointer text-right font-medium text-sm group-data-[state=checked]:text-muted-foreground/70"
        id={`${id}-off`}
        onClick={() => setChecked(false)}
      >
        <MoonIcon aria-hidden="true" size={16} />
      </span>
      <Switch
        aria-label="Toggle between dark and light mode"
        aria-labelledby={`${id}-off ${id}-on`}
        checked={checked}
        id={id}
        onCheckedChange={handleChangeTheme}
      />
      <span
        aria-controls={id}
        className="flex-1 cursor-pointer text-left font-medium text-sm group-data-[state=unchecked]:text-muted-foreground/70"
        id={`${id}-on`}
        onClick={() => setChecked(true)}
      >
        <SunIcon aria-hidden="true" size={16} />
      </span>
    </div>
  );
}
