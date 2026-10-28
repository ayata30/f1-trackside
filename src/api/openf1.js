
const BASE_URL = "https://api.openf1.org/v1";

export async function getDrivers(sessionKey = "latest") {
  const response = await fetch(
    `${BASE_URL}/drivers?session_key=${sessionKey}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch drivers: ${response.status}`);
  }

  return response.json();
}

export async function getSessionResults(sessionKey = "latest") {
  const response = await fetch(
    `${BASE_URL}/session_result?session_key=${sessionKey}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch session results: ${response.status}`);
  }

  return response.json();
}
