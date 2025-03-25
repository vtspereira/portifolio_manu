export interface Project {
  id: number;
  title: string;
  year: string;
  location: string;
  description: string;
  images: string[];
  technicalDiagram?: string;
  projectType?: string;
  area?: string;
  status?: string;
  sustainability?: string;
  designProcess?: string;
}

export interface PageProps {
  children: React.ReactNode;
  className?: string;
}

export interface NavigationProps {
  currentPage: number;
  totalPages: number;
  onNavigate: (direction: 'prev' | 'next') => void;
  onNavigateToPage?: (pageIndex: number) => void;
  pageTitles?: string[];
}