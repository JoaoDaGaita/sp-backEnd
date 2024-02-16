import { octokit } from "@/app";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

let page = 1
let per_page = 10

export async function paginate(request: FastifyRequest, reply: FastifyReply) {
  //const skip = (since - 1) * per_page
  try {
    const paginateQuery = z.object({
      since: z.coerce.number()
    })

    const { since } = paginateQuery.parse(request.query)

    const iterator = octokit.request("https://api.github.com/users", {
      owner: "octocat",
      repo: "hello-world",
      per_page,
      since: since
    });

    const { data } = await iterator
    page = per_page + since
    const nextUrl = `https://api.github.com/users?since=${page}`

    return reply.send({ data, nextUrl }).status(200)

  } catch (error) {
    return error
  }
}