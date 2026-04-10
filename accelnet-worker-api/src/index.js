/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { getSupabase } from "./lib/supabase.js";

const allowedOrigins = [
  "https://www.accelnet-brainhealth.org",
  "https://accelnet-brainhealth.org",
  "http://localhost:5173", // Vite default local port
  "https://api.accelnet-brainhealth.org"
];

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    
    // Check if the request origin is in the allowed list, otherwise fallback to the primary domain
    const currentOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

    const corsHeaders = {
      "Access-Control-Allow-Origin": currentOrigin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    // Preflight request handler
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    if (url.pathname === "/api/participants") {
      const supabase = getSupabase(env);

      const { data, error } = await supabase
        .from("participants")
        .select(`
          id,
          first_name,
          last_name,
          title,
          department,
          institutions(inst_name)
          `)
        .order("last_name");

      if (error) {
        return new Response(
          JSON.stringify(error),
          { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      const formattedData = data.map((participant) => ({
        id: participant.id,
        name: `${participant.first_name} ${participant.last_name}`,
        title: participant.title,
        department: participant.department,
        institution: participant.institutions?.inst_name ?? null
      }));

      return new Response(JSON.stringify(formattedData), {
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    return new Response("Not Found", { status: 404, headers: corsHeaders });
  }
};