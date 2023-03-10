import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import {screen} from '@testing-library/dom';
import LandingPage from '../pages/landing-page/landing-page'
import FoodbanksPage from '../pages/foodbanks-page/foodbanks-page';
import ItemsPage from '../pages/items-page/items-page';
import FoodbankParcelsPage from '../pages/foodbank-parcels-page/foodbank-parcels-page';
import FoodbankItemsPage from '../pages/foodbank-items-page/foodbank-items-page';
import {server} from "../test_utility/mockServer"

// establish API mocking before all tests
beforeAll(() => {
  server.listen();
  window.location = {
    href: '512cf0c1-e290-ed11-aad1-000d3adf443b',
  };
})
afterEach(async () => {
  server.resetHandlers();
  await new Promise((r) => setTimeout(r, 5));
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