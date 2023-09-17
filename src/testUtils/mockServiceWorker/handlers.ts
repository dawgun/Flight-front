import { rest } from "msw";
import { mockFlight } from "../mockFlight/mockFlight";

const backend = import.meta.env.VITE_BACKEND_HOST;
const flights = [mockFlight()];

export const handlers = [
  rest.get(`${backend}/flights`, async (req, res, ctx) => {
    return res.once(ctx.status(400));
  }),

  rest.get(`${backend}/flights`, async (req, res, ctx) => {
    return res.once(ctx.status(400));
  }),

  rest.get(`${backend}/flights`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(flights));
  }),
];
