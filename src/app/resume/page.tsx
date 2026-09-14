import { redirect } from "next/navigation";
import { site } from "@/content/site";

export default function ResumePage() {
  redirect(site.resume);
}
