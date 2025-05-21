export interface Certification {
  id: string;
  name: string;
  issuerInitials: string; // e.g., "CCMP"
  issuerFullName?: string; // e.g., "Certified Change Management Professional"
  link?: string;
}
