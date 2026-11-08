import type { APIRoute } from "astro";
import { buildCalendarFeed } from "@/lib/events/calendarFeed";
import { loadEvents } from "@/lib/events/load";

export const prerender = true;

export const GET: APIRoute = async () =>
  new Response(buildCalendarFeed(await loadEvents()), {
    headers: { "Content-Type": "text/calendar; charset=utf-8" },
  });
