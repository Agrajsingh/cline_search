export default async (req, context) => {
  const url = new URL(req.url);
  const params = url.searchParams;
  const apiKey = process.env.VITE_OMDB_API_KEY || process.env.OMDB_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        Error: "API Key not configured on server",
        details:
          "Ensure VITE_OMDB_API_KEY is set in your environment variables.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Construct the OMDB URL
  const omdbUrl = new URL("https://www.omdbapi.com/");
  omdbUrl.searchParams.set("apikey", apiKey);

  // Forward all query parameters from the request
  params.forEach((value, key) => {
    omdbUrl.searchParams.set(key, value);
  });

  try {
    const response = await fetch(omdbUrl.toString());
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ Error: "Failed to fetch from OMDB" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const config = {
  path: "/api/omdb",
};
