import { getServiceSystem } from "@/content/service-catalog";
import ServiceSystemPage, { serviceSystemMetadata } from "@/components/services/ServiceSystemPage";

const system = getServiceSystem("data-foundation");

export const metadata = serviceSystemMetadata(system);

export default function DataFoundationPage() {
  return <ServiceSystemPage system={system} />;
}
