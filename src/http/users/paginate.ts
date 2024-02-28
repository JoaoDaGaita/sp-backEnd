import { octokit } from "@/app";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

interface User {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export async function paginate(request: FastifyRequest, reply: FastifyReply) {
  try {
    const paginateQuery = z.object({
      since: z.coerce.number(),
      per_page: z.coerce.number().default(30)
    })

    const { since, per_page } = paginateQuery.parse(request.query)

    const { data } =
      await octokit.request<User[], any>(`https://api.github.com/users?since=${since}&per_page=${per_page}`)

    return reply.send(data).status(200)

  } catch (error: unknown) {
    return error
  }
}