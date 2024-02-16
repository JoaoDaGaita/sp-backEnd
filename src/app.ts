import { Octokit } from "octokit";
import fastify from "fastify";
import { userRoutes } from "./http/users/routes";

export const octokit = new Octokit({
  auth: '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'
});

export const app = fastify()

app.register(userRoutes)