import { app } from "@/app"
import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('User Details', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to get user detail.', async () => {
    const username = "ezmobius"
    const userResponse = await request(app.server).get(`/api/users/${username}/details`).send()

    expect(userResponse.statusCode).toEqual(200)
    expect(userResponse.body).toEqual(
      expect.objectContaining({
        name: 'Ezra Zygmuntowicz'
      })
    )
  })
})