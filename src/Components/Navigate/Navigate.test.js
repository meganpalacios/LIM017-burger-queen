import { render, screen, fireEvent } from '@testing-library/react';
import Navigate from './Navigate';
import { /* MemoryRouter, Link, */BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
// import userEvent from '@testing-library/user-event';

test('renders waiter view button', () => {
  render(<Navigate />, {wrapper: BrowserRouter});
  expect(screen.getByTestId('link-to-waiter-view')).toBeInTheDocument();
  expect(screen.getByText(/Place orders/i)).toBeInTheDocument();
});

test('renders chef view button', () => {
  render(<Navigate />, {wrapper: BrowserRouter});
  expect(screen.getByTestId('link-to-chef-view')).toBeInTheDocument();
  expect(screen.getByText('See orders')).toBeInTheDocument();
});

/* test('routes to a new route', () => {
  const history = createMemoryHistory();
  history.push = jest.fn();

  render(
    <BrowserRouter location={history.location} navigator={history}>
      <Navigate>
      <Navigate />
        <Link data-testid="link-to-waiter-view" to='/waiter-view/place-orders'></Link>
      </Navigate>
    </BrowserRouter>
  );

  // const waiterViewLink = screen.getByTestId('link-to-waiter-view');
  // console.log(waiterViewLink);
  fireEvent.click(screen.getByTestId('link-to-waiter-view'));
  // fireEvent.click(screen.getByText('Place orders'));

  // spy on push calls, assert on url (parameter)
  // expect(history.push).toHaveBeenCalledWith('/waiter-view/place-orders');
  expect(history.push).toHaveBeenCalledWith(
    {
      hash: '',
      pathname: '/waiter-view/place-orders',
      search: '',
    },
    undefined,
  );
}); */

/* test('full app rendering/navigating', async () => {
  render(<Navigate />, {wrapper: BrowserRouter});

  // verify page content for default route
  expect(screen.getByTestId('link-to-waiter-view')).toBeInTheDocument()

  // verify page content for expected route after navigating
  fireEvent.click(screen.getByTestId('link-to-waiter-view'));
  console.log(screen);
  // expect(screen.getByText(/Log out/i)).toBeInTheDocument();
}) */

test('should redirect and update history', () => {
  const history = createMemoryHistory();
  history.push = jest.fn();

  render(<BrowserRouter history={history}><Navigate/></BrowserRouter>);

  fireEvent.click(screen.getByTestId('link-to-chef-view'));

  expect(history.location.pathname).toEqual('/chef-view');
});