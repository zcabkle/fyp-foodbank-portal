import { render, screen, getByText } from '@testing-library/react';
import LandingPage from '../pages/landing-page/landing-page'
import FoodbanksPage from '../pages/foodbanks-page/foodbanks-page';
import ItemsPage from '../pages/items-page/items-page';
import FoodbankParcelsPage from '../pages/foodbank-parcels-page/foodbank-parcels-page';
import FoodbankItemsPage from '../pages/foodbank-items-page/foodbank-items-page';
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
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
      foodbanks: [
        {
          cr967_address: "165 Euston Road",
          cr967_email: "stpancreasnewchurch@gmail.com",
          cr967_foodbankid: "512cf0c1-e290-ed11-aad1-000d3adf443b",
          cr967_image: "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgy…",
          cr967_name: "St Pancreas New Church",
          cr967_operatinghours: "9am to 5pm on Wednesday",
          cr967_phonenumber: "07856603835",
          cr967_postcode: "NW1 2BA",
          cr967_town: "London"
        },
        {
          cr967_address: "Church of Christ The King, Gordon Sq",
          cr967_email: "eustonchurch@hotmail.com",
          cr967_foodbankid: "ce82aaf6-e290-ed11-aad1-000d3adf443b",
          cr967_image: "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgy…",
          cr967_name: "Euston Church",
          cr967_operatinghours: "9am - 1pm on Monday↵1pm - 3pm on Friday",
          cr967_phonenumber: "07435562984",
          cr967_postcode: "WC1H 0AG",
          cr967_town: "London"
        },
        {
          cr967_address: "14 Pratt Mews",
          cr967_email: "camdenfoodbank@gmail.com",
          cr967_foodbankid: "53ab5224-e390-ed11-aad1-000d3adf443b",
          cr967_image: "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgy…",
          cr967_name: "Camden Foodbank",
          cr967_operatinghours: "9am - 1pm on Monday to Friday",
          cr967_phonenumber: "0745679354",
          cr967_postcode: "NW1 0AD",
          cr967_town: "London"
        }
      ]
    }))
  }),

  rest.get('/api/items', (req, res, ctx) => {
    return res(
      ctx.json({
        items: [
          {
            _cr967_foodbankkey_value: "512cf0c1-e290-ed11-aad1-000d3adf443b",
            cr967_description: null,
            cr967_image: "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgy…",
            cr967_itemcategory: 0,
            cr967_itemid: "7c577689-f090-ed11-aad1-000d3adf443b",
            cr967_name: "Carrots",
            cr967_quantity: 0,
            cr967_shareitemwith: 2,
            cr967_sharequantitywith: 2,
            cr967_sharestocklevelwith: 2,
            cr967_stocklevel: 0
          },
          {
            _cr967_foodbankkey_value: "512cf0c1-e290-ed11-aad1-000d3adf443b",
            cr967_description: null,
            cr967_image: "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgy…",
            cr967_itemcategory: 8,
            cr967_itemid: "2bf2dba0-f090-ed11-aad1-000d3adf443b",
            cr967_name: "Rice",
            cr967_quantity: 12,
            cr967_shareitemwith: 2,
            cr967_sharequantitywith: 2,
            cr967_sharestocklevelwith: 2,
            cr967_stocklevel: 1
          }
        ],
        foodbank_names: [{
          cr967_foodbankid: "512cf0c1-e290-ed11-aad1-000d3adf443b",
          cr967_name: "St Pancreas New Church"
        }]
      })
    )
  }),

  rest.get('/api/itemsid/512cf0c1-e290-ed11-aad1-000d3adf443b', (req, res, ctx) => {
    return res(
      ctx.json({
        items: [
          {
            _cr967_foodbankkey_value: "512cf0c1-e290-ed11-aad1-000d3adf443b",
            cr967_description: null,
            cr967_image: "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgy…",
            cr967_itemcategory: 0,
            cr967_itemid: "7c577689-f090-ed11-aad1-000d3adf443b",
            cr967_name: "Carrots",
            cr967_quantity: 0,
            cr967_shareitemwith: 2,
            cr967_sharequantitywith: 2,
            cr967_sharestocklevelwith: 2,
            cr967_stocklevel: 0
          },
          {
            _cr967_foodbankkey_value: "512cf0c1-e290-ed11-aad1-000d3adf443b",
            cr967_description: null,
            cr967_image: "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgy…",
            cr967_itemcategory: 8,
            cr967_itemid: "2bf2dba0-f090-ed11-aad1-000d3adf443b",
            cr967_name: "Rice",
            cr967_quantity: 12,
            cr967_shareitemwith: 2,
            cr967_sharequantitywith: 2,
            cr967_sharestocklevelwith: 2,
            cr967_stocklevel: 1
          }
        ],
        foodbank_names: [{
          cr967_foodbankid: "512cf0c1-e290-ed11-aad1-000d3adf443b",
          cr967_name: "St Pancreas New Church"
        }]
      })
    )
  }),

  rest.get('/api/parcelsid/512cf0c1-e290-ed11-aad1-000d3adf443b', (req, res, ctx) => {
    return res(
      ctx.json({
        parcels: [{
          cr967_description: "A family of 3 may take:↵2 boxes of cereal↵One carton of UTC milk↵1 pack of pasta↵1 can of beans↵...",
          cr967_image: "iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAYAAADnRuK4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAI/wSURBVHhe7f0HWFXplu2N9+3u…",
          cr967_name: "Family of 3",
          cr967_parcelid: "1bcc1abc-e790-ed11-aad1-000d3adf443b",
          cr967_parcelpk: "1000"
        },
        {
          cr967_description: "X↵Y↵Z",
          cr967_image: null,
          cr967_name: "One Person",
          cr967_parcelid: "4da7b6fd-78a1-ed11-aad1-000d3adf443b",
          cr967_parcelpk: "1004",
        }
        ],
        foodbank_names: [
          {
            cr967_foodbankid: "512cf0c1-e290-ed11-aad1-000d3adf443b",
            cr967_name: "St Pancreas New Church"
          }
        ]
      })
    )
  }),


)

// establish API mocking before all tests
beforeAll(() => {
  server.listen();
  window.location = {
    href: '512cf0c1-e290-ed11-aad1-000d3adf443b',
  };
})
afterEach(async () => {
  server.resetHandlers();
  await new Promise((r) => setTimeout(r, 250));
})
afterAll(() => server.close())

test('renders the landing page', async () => {
  const result = render(<LandingPage />);
});

test('renders the foodbanks page', async () => {
  const result = render(<FoodbanksPage />);
});

test('renders the items page', async () => {
  const result = render(<ItemsPage />);
});

test('renders the foodbank items page', async () => {
  window.history.pushState({}, 'Test Page Title', `/url/512cf0c1-e290-ed11-aad1-000d3adf443b`)
  const result = render(<FoodbankItemsPage />);
});

test('renders the foodbank parcels page', async () => {
  window.history.pushState({}, 'Test Page Title', `/url/512cf0c1-e290-ed11-aad1-000d3adf443b`)
  const result = render(<FoodbankParcelsPage />);
});