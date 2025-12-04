import fs from "fs";
import path from "path";

export function getAppRoutes() {
  const appDir = path.join(process.cwd(), "app");

  const folders = fs
    .readdirSync(appDir, { withFileTypes: true })
    .filter((file) => file.isDirectory())
    .map((folder) => folder.name)
    .filter(
      (name) => !name.startsWith("(") && !name.startsWith("_") && name !== "api"
    );

  return folders.map((name) => ({
    title: name.charAt(0).toUpperCase() + name.slice(1),
    href: `/${name}`,
  }));
}
