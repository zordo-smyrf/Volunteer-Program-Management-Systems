export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  isActive: boolean;
  startDate: string;
}

export interface Volunteer {
  id: string;
  fullName: string;
  email: string;
  age: number;
  projectId: string;
}