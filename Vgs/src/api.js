const BASE_URL = "http://localhost:5000";

const api = {
  contact: async (data) => {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const json = await res.json();
    if (!res.ok) throw json;
    return json;
  }
};

export default api;
