/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { getSupabase } from "./lib/supabase";

export default {
  async fetch(request, env) {

    const url = new URL(request.url);

    if (url.pathname === "/api/participants") {

      const supabase = getSupabase(env);

      const { data, error } = await supabase
        .from("participants")
        .select("*");

      if (error) {
        return new Response(
          JSON.stringify(error),
          { status: 500 }
        );
      }

      return new Response(
        JSON.stringify(data),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response("Not Found", { status: 404 });
  }
};


