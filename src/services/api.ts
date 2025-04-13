// src/services/api.ts
export const fetchRecommendations = async (params: {
  latitude: number;
  longitude: number;
  cuisine?: string;
}) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch recommendations");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw error;
  }
};
