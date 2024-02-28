import { Octokit } from "octokit";
import fastify from "fastify";
import { userRoutes } from "./http/users/routes";
import cors from "@fastify/cors";
import { env } from "./env/index"

export const octokit = new Octokit({
  auth: env.GITHUB_TOKEN
})

export const app = fastify()

app.register(userRoutes)
app.register(cors)