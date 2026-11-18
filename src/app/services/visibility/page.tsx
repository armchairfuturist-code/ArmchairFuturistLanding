export const revalidate = 3600; // Edge cache: serve stale while revalidating from origin
import { getServiceSystem } from "@/content/service-catalog";
import ServiceSystemPage, { serviceSystemMetadata } from "@/components/services/ServiceSystemPage";

const system = getServiceSystem("visibility");

export const metadata = serviceSystemMetadata(system);

export default function VisibilityPage() {
  return <ServiceSystemPage system={system} />;
}
