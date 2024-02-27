import { app } from '@/app'
import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('User Repos', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to get user repos.', async () => {
    const username = 'ezmobius'
    const userResponse = await request(app.server)
      .get(`/api/users/${username}/repos`)
      .send()

    expect(userResponse.statusCode).toEqual(200)
    expect(userResponse.body[0].id).toEqual(5282)
  })
})
