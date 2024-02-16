
import { octokit } from "@/app";
import { FastifyReply, FastifyRequest } from "fastify";

import { z } from "zod";

export async function repos(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getUserParams = z.object({
      username: z.string()
    })

    const { username } = getUserParams.parse(request.params)
    const response = await octokit.request('GET /users/{username}/repos', {
      username: username
    })

    return reply.send(response.data)

  } catch (error) {
    return error
  }
}
