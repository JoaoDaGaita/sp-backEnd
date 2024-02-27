import { Octokit } from "octokit";
import fastify from "fastify";
import { userRoutes } from "./http/users/routes";
import cors from "@fastify/cors";

export const octokit = new Octokit({
  auth: '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'
});

export const app = fastify()

app.register(userRoutes)
app.register(cors)