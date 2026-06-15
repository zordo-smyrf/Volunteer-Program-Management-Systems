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
