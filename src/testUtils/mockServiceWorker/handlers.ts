import { rest } from "msw";
import { mockFlight } from "../mockFlight/mockFlight";

const backend = import.meta.env.VITE_BACKEND_HOST;
export const flightMSW = mockFlight();

export const handlers = [
  rest.get(`${backend}/flights`, async (_req, res, ctx) => {
    return res.once(ctx.status(400));
  }),

  rest.get(`${backend}/flights`, async (_req, res, ctx) => {
    return res.once(ctx.status(400));
  }),

  rest.get(`${backend}/flights`, async (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json([flightMSW]));
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

  rest.put(`${backend}/flights/111/stop`, async (_req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.put(`${backend}/flights/113/stop`, async (_req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.put(`${backend}/flights/112/stop`, async (_req, res, ctx) => {
    return res(ctx.status(400));
  }),

  rest.put(`${backend}/flights/111/pause`, async (_req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.put(`${backend}/flights/113/pause`, async (_req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.put(`${backend}/flights/112/pause`, async (_req, res, ctx) => {
    return res(ctx.status(400));
  }),

  rest.get(`${backend}/flights/111`, async (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(flightMSW));
  }),

  rest.get(`${backend}/flights/113`, async (_req, res, ctx) => {
    return res(ctx.status(400));
  }),
];
