import { render, screen, fireEvent, getByText } from '@testing-library/react';
import Navbar from "../components/Navbar/Navbar"
import { MultiSelect } from '../components/multi-select';
import { Scrollbar } from '../components/scrollbar';
import Footer from '../components/Footer/Footer'
import ApplicationRouter from '../routing/ApplicationRouter';
import { BrowserRouter as Router } from 'react-router-dom';
import { SeverityPill } from '../components/severity-pill';
import FoodbankItemsListTable from '../components/Foodbank Items/foodbank-item-list-table';
import { ListFilters as FoodbankItemsListFilters } from '../components/Foodbank Items/foodbank-item-list-filters'
import FoodbankListTable from '../components/Foodbanks/foodbank-list-table';
import { ListFilters as FoodbankListFilters } from '../components/Foodbanks/foodbank-list-filters'
import FoodbankParcelsListTable from '../components/Foodbank Parcels/foodbank-parcel-list-table';
import { ListFilters as FoodbankParcelsListFilters } from '../components/Foodbank Parcels/foodbank-parcel-list-filters'
import ItemListTable from '../components/Items/item-list-table';
import { ListFilters as ItemListFilters } from '../components/Items/item-list-filters'
import {server} from "../test_utility/mockServer"
import{ mockFoodbanks } from "../test_utility/mockFoodbanks"
import { mockItems } from '../test_utility/mockItems';
import { mockTags } from '../test_utility/mockTags';
import { mockParcels } from '../test_utility/mockParcels';
import userEvent from '@testing-library/user-event';

// establish API mocking before all tests
beforeAll(() => server.listen())
afterEach(async () => {
  server.resetHandlers();
  await new Promise((r) => setTimeout(r, 5));
})
afterAll(() => server.close())

test('render the footer', async () => {
  const result = render(< Footer />);
});

test('render the navbar for desktop', async () => {
  const result = render(
    <Router>
      < Navbar />
    </Router>);
});

test('render the navbar for mobile and open it', async () => {
  // Change the viewport to 500px.
  global.innerWidth = 500;

  // Trigger the window resize event.
  global.dispatchEvent(new Event('resize'));

  const result = render(
    <Router>
      < Navbar />
    </Router>);

  var button = screen.getAllByRole('button')[0]
  fireEvent.click(button)
});

test('renders the severity pill', async () => {
  const result = render(< SeverityPill />);
});

test('renders the scrollbar', async () => {
  const result = render(< Scrollbar />);
});

test('renders the router', async () => {
  const result = render(< ApplicationRouter />);
});

test('render the multiselect and open it and select a new value', async () => {
  var result = render(
    < MultiSelect
      label="null"
      onChange={() => void 0}
      options={[{label: "All", value: "all"}, {value: "NW1", label: "NW1"}, {value: "WC1H", label: "WC1H"}]}
      value={['all']} />);

  var button = screen.getByRole('button')
  fireEvent.click(button)

  var new_checkbox = screen.getAllByRole('menuitem')[1].querySelector('input')

  fireEvent.click(new_checkbox)
});

test('renders the foodbank list table and opens the first item', async () => {
  const result = render(
    <FoodbankListTable
      onPageChange={() => void 0}
      onRowsPerPageChange={() => void 0}
      foodbanks={mockFoodbanks}
      foodbanksCount={3}
      page={0}
      rowsPerPage={5} />
  );

  var button = screen.getAllByRole('button')[0]
  fireEvent.click(button)

});

test('renders the foodbank list filters', async () => {
  const result = render(
    <FoodbankListFilters onChange={() => void 0} postcodeOptions={mockTags}/>
  );

  var multiselect = screen.getAllByRole('button')[0]
  fireEvent.click(multiselect)

  var new_checkbox = screen.getAllByRole('menuitem')[1].querySelector('input')
  fireEvent.click(new_checkbox)

  var searchbar = screen.getByPlaceholderText('Filter by foodbank name')
  userEvent.type(searchbar, "searchterm");
  fireEvent.submit(searchbar);
});

test('renders the foodbank parcel list table', async () => {
  const result = render(
    <FoodbankParcelsListTable
      onPageChange={() => void 0}
      onRowsPerPageChange={() => void 0}
      parcels={mockParcels}
      parcelsCount={2}
      page={0}
      rowsPerPage={5} />
  );
});

test('renders the foodbank parcels list filters', async () => {
  const result = render(
    <FoodbankParcelsListFilters onChange={() => void 0} />
  );
  var searchbar = screen.getByPlaceholderText('Search for parcel')
  userEvent.type(searchbar, "searchterm");
  fireEvent.submit(searchbar);

  
});

test('renders the foodbank items list table and clicks on the first item', async () => {
  const result = render(
    <FoodbankItemsListTable
      onPageChange={() => void 0}
      onRowsPerPageChange={() => void 0}
      items={mockItems}
      itemsCount={10}
      page={0}
      rowsPerPage={5}
      tags={mockTags} />
  );
  var button = screen.getAllByRole('button')[0]
  fireEvent.click(button)
});

test('renders the foodbank items list filters', async () => {
  const result = render(
    <FoodbankItemsListFilters onChange={() => void 0} />
  );

  var multiselect = screen.getAllByRole('button')[0]
  fireEvent.click(multiselect)

  var new_checkbox = screen.getAllByRole('menuitem')[1].querySelector('input')
  fireEvent.click(new_checkbox)
});

test('renders the items list table and open the first item', async () => {
  const result = render(
    <ItemListTable
      onPageChange={() => void 0}
      onRowsPerPageChange={() => void 0}
      items={mockItems}
      itemsCount={10}
      page={0}
      rowsPerPage={5}
      tags={mockTags} />
  );
  var button = screen.getAllByRole('button')[0]
  fireEvent.click(button)
});

test('renders the items list filters', async () => {
  const result = render(
    <ItemListFilters onChange={() => void 0} foodbankOptions={[]}/>
  );

  var multiselect = screen.getAllByRole('button')[0]
  fireEvent.click(multiselect)

  var new_checkbox = screen.getAllByRole('menuitem')[1].querySelector('input')
  fireEvent.click(new_checkbox)
});
