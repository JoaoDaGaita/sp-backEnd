import { FastifyInstance } from 'fastify'
import { details } from "./details"
import { paginate } from "./paginate"
import { repos } from "./repos"

export async function userRoutes(app: FastifyInstance) {
  app.get('/api/users/:username/details', details)
  app.get('/api/users/:username/repos', repos)
  app.get('/api/users/:since?', paginate)
}
