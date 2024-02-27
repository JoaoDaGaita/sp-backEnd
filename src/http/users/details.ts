import { octokit } from "@/app";
import { FastifyReply, FastifyRequest } from "fastify";

import { z } from "zod";


export async function details(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getUserParams = z.object({
      username: z.string()
    })

    const { username } = getUserParams.parse(request.params)

    const response = await octokit.request('GET /users/{username}', {
      username: username
    })

    return reply.send(response.data).status(200)

  } catch (error) {
    return error
  }
}
