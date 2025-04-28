export interface SortOption {
    id: string;
    icon: React.ReactNode;
    label: string;
    badges: string[];
}
export type SortType = {
  clientName: string;
  createdAt: string;
  updatedAt: string;
  clientId: string;
};