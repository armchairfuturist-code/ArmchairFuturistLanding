export const revalidate = 3600; // Edge cache: serve stale while revalidating from origin
import { getServiceSystem } from "@/content/service-catalog";
import ServiceSystemPage, { serviceSystemMetadata } from "@/components/services/ServiceSystemPage";

const system = getServiceSystem("frontline-help");

export const metadata = serviceSystemMetadata(system);

export default function FrontlineHelpPage() {
  return <ServiceSystemPage system={system} />;
}
