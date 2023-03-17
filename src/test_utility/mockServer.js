import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { mockFoodbanks } from "./mockFoodbanks"
import { mockItems } from './mockItems'
import { mockFoodbankNames } from './mockFoodbankNames'
import { mockParcels } from './mockParcels'

export const server = setupServer(
  rest.get('/api/stats', (req, res, ctx) => {
    return res(
      ctx.json({
        items_count: 1,
        foodbanks_count: 2,
        visits_count: 3
      })
    )
  }),

  rest.get('/api/foodbanks', (req, res, ctx) => {
    return res(ctx.json({
      foodbanks: mockFoodbanks
    }))
  }),

  rest.get('/api/items', (req, res, ctx) => {
    return res(
      ctx.json({
        items: mockItems,
        foodbank_names: mockFoodbankNames
      })
    )
  }),

  rest.get('/api/itemsid/512cf0c1-e290-ed11-aad1-000d3adf443b', (req, res, ctx) => {
    return res(
      ctx.json({
        items: mockItems,
        foodbank_names: mockFoodbankNames
      })
    )
  }),

  rest.get('/api/error', (req, res, ctx) => {
    return res(
      ctx.status(404)
    )
  }),

  rest.get('/api/parcelsid/512cf0c1-e290-ed11-aad1-000d3adf443b', (req, res, ctx) => {
    return res(
      ctx.json({
        parcels: mockParcels,
        foodbank_names: mockFoodbankNames
      })
    )
  }),
)
