import { app } from '@/app'
import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('User Paginate', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to fetch users.', async () => {
    const usersPaginateResponse = await request(app.server)
      .get('/api/users')
      .query({
        since: 11,
      })
      .send()

    expect(usersPaginateResponse.statusCode).toEqual(200)
    expect(usersPaginateResponse.body.data).toHaveLength(10)
    expect(usersPaginateResponse.body).toHaveProperty('nextUrl')
    expect(usersPaginateResponse.body.data[0]).toEqual(
      expect.objectContaining({ login: 'vanpelt' })
    )
  })
})
