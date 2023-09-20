import { rest } from "msw";
import { mockFlight } from "../mockFlight/mockFlight";

const backend = import.meta.env.VITE_BACKEND_HOST;
const flights = [mockFlight()];

export const handlers = [
  rest.get(`${backend}/flights`, async (_req, res, ctx) => {
    return res.once(ctx.status(400));
  }),

  rest.get(`${backend}/flights`, async (_req, res, ctx) => {
    return res.once(ctx.status(400));
  }),

  rest.get(`${backend}/flights`, async (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(flights));
  }),

  rest.get(`${backend}/flights/111/stream`, async (_req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.get(`${backend}/flights/112/stream`, async (_req, res, ctx) => {
    return res(ctx.status(400));
  }),

  rest.put(`${backend}/flights/111/start`, async (_req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.put(`${backend}/flights/112/start`, async (_req, res, ctx) => {
    return res(ctx.status(400));
  }),
];
