import { render, screen, getByText } from '@testing-library/react';
import LandingPage from '../pages/landing-page/landing-page'
import FoodbanksPage from "../pages/foodbanks-page/foodbanks-page"
import ItemsPage from "../pages/items-page/items-page"
import NavBar from "../components/Navbar/Navbar"
import { Scrollbar } from '../components/scrollbar';
import Footer from '../components/Footer/Footer'
import { SeverityPill } from '../components/severity-pill';
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  rest.get('/api/stats', (req, res, ctx) => {
    // respond using a mocked JSON body

    return res(ctx.json({
      items_count: 1,
      foodbanks_count: 2,
      visits_count: 3
    }))
  }),
)

// establish API mocking before all tests
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders the landing page',  async () => {
  const result = render(<LandingPage />);
  await new Promise((r) => setTimeout(r, 2000));
});

/* test('renders the foodbanks page', async () => {
  const result =  render(await <FoodbanksPage />);
  await new Promise((r) => setTimeout(r, 2000));
});

test('renders the items page', async () => {
  const result = render(await <ItemsPage />);
  await new Promise((r) => setTimeout(r, 2000));
}); */

test('renders the footer', async () => {
  const result = render(< Footer />);
  await new Promise((r) => setTimeout(r, 1000));
});

test('renders the navbar', async () => {
  const result = render(< Navbar />);
  await new Promise((r) => setTimeout(r, 1000));
});

test('renders the severity pill', async () => {
  const result =  render(< SeverityPill />);
  await new Promise((r) => setTimeout(r, 1000));
});

test('renders the scrollbar', async () => {
  const result = render(< Scrollbar />);
  await new Promise((r) => setTimeout(r, 1000));
});
