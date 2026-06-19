const API_URL = "http://localhost:4000/api";

export async function getProjects() {
  const response = await fetch(
    `${API_URL}/projects`
  );

  return response.json();
}

export async function getVolunteers() {
  const response = await fetch(
    `${API_URL}/volunteers`
  );

  return response.json();
}

export async function createProject(data: {
  title: string;
  description: string;
  location: string;
  isActive: boolean;
  startDate: string;
}) {
  const response = await fetch(api.projects,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();
}

export async function createVolunteer(data: {
  fullName: string;
  email: string;
  age: number;
  projectId: string;
}) {
  const response = await fetch(api.volunteers,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();
}

export async function getProject(id: string) {
  const response = await fetch(`${API}/api/projects/${id}`)
  return response.json();
}

const API = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  projects: `${API}/api/projects`,
  projectById: (id: string) => `${API}/api/projects/${id}`,

  volunteers: `${API}/api/volunteers`,
  volunteerById: (id: string) => `${API}/api/volunteers/${id}`,

  volunteerSearch: (q: string) =>
    `${API}/api/volunteers/search?q=${q}`,
};