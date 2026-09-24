import { getServiceSystem } from "@/content/service-catalog";
import ServiceSystemPage, { serviceSystemMetadata } from "@/components/services/ServiceSystemPage";

const system = getServiceSystem("revenue-operations");

export const metadata = serviceSystemMetadata(system);

export default function RevenueOpsPage() {
  return <ServiceSystemPage system={system} />;
}
