const API_URL = "http://localhost:4000/api";

export async function getProjects() {
  const response = await fetch(api.projects);
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
  const response = await fetch(api.projects, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
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
  const response = await fetch(`${api.projects}/${id}`);
  return response.json();
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const api = {
  volunteers: `${BASE_URL}/api/volunteers`,
  projects: `${BASE_URL}/api/projects`
};