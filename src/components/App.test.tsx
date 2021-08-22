import {
  fireEvent,
  render,
  RenderResult,
  waitForElementToBeRemoved
} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import {
  adapter,
  defaultSpreadsheetId,
  defaultRange,
  defaultKey
} from '../api';
import { IRecipe } from '../types';
import App from './App';

const mockAdapter = new MockAdapter(adapter);

const mockGetRecipes = ({
  responseCode = 200,
  recipes = []
}: {
  responseCode?: number;
  recipes?: Omit<IRecipe, 'id'>[];
} = {}): MockAdapter =>
  mockAdapter
    .onGet(`${defaultSpreadsheetId}/values/${defaultRange}?key=${defaultKey}`)
    .replyOnce(responseCode, {
      values: [
        ['type', 'name', 'link', 'notes'],
        ...recipes.map(({ type, name, link, notes }) => [
          type,
          name,
          link,
          notes
        ])
      ]
    });

const renderApp = async (): Promise<RenderResult> => {
  const history = createMemoryHistory();
  const rtlUtils = render(
    <Router history={history}>
      <QueryParamProvider ReactRouterRoute={Route}>
        <App />
      </QueryParamProvider>
    </Router>
  );
  await waitForElementToBeRemoved(() =>
    rtlUtils.getByText('Loading recipes...')
  );
  return rtlUtils;
};

describe('App', () => {
  beforeEach(() => {
    mockAdapter.reset();
  });

  const recipeTypeFilterLabelText = /filter recipe type/;
  const recipeNameSearchPlaceholderText = 'search recipe names';
  const clearButtonLabelText = 'clear filter and search';

  describe('on api success', () => {
    const recipes = [
      {
        name: 'Lasagna',
        type: 'Dinner',
        link: 'https://www.food.com/recipe/barilla-no-boil-lasagna-80435',
        notes: null
      },
      {
        name: 'Chocolate Chip Cookies',
        type: 'Dessert',
        link:
          'https://www.allrecipes.com/recipe/10813/best-chocolate-chip-cookies/',
        notes: null
      }
    ];

    beforeEach(() => {
      mockGetRecipes({ recipes });
    });

    test('renders sorted recipes', async () => {
      const { getAllByTestId } = await renderApp();
      const renderedNames = getAllByTestId('recipe-name');
      const expectedNames = ['Chocolate Chip Cookies', 'Lasagna'];
      renderedNames.forEach((el, idx) =>
        expect(el.textContent).toBe(expectedNames[idx])
      );
    });

    test('filters recipe type', async () => {
      const { getByLabelText, getByText, queryByText } = await renderApp();
      // filter by dessert
      getByLabelText(recipeTypeFilterLabelText).click();
      getByText('Dessert').click();
      expect(getByText('1 recipe')).toBeInTheDocument();
      expect(getByText('Chocolate Chip Cookies')).toBeInTheDocument();
      expect(queryByText('Lasagna')).not.toBeInTheDocument();
      // clear filter
      getByLabelText(clearButtonLabelText).click();
      expect(getByText('2 recipes')).toBeInTheDocument();
      // filter by dinner
      getByLabelText(recipeTypeFilterLabelText).click();
      getByText('Dinner').click();
      expect(getByText('1 recipe')).toBeInTheDocument();
      expect(queryByText('Chocolate Chip Cookies')).not.toBeInTheDocument();
      expect(getByText('Lasagna')).toBeInTheDocument();
    });

    test('searches recipe name', async () => {
      const {
        getByPlaceholderText,
        getByText,
        queryByText,
        getByLabelText
      } = await renderApp();

      // search for cookie
      fireEvent.change(getByPlaceholderText(recipeNameSearchPlaceholderText), {
        target: { value: 'cookie' }
      });
      expect(getByText('1 recipe')).toBeInTheDocument();
      expect(
        getByText((_, node) => node!.textContent === 'Chocolate Chip Cookies')
      ).toBeInTheDocument();
      expect(queryByText('Lasagna')).not.toBeInTheDocument();
      // clear search
      getByLabelText(clearButtonLabelText).click();
      expect(getByText('2 recipes')).toBeInTheDocument();
      // search for lasagna
      fireEvent.change(getByPlaceholderText(recipeNameSearchPlaceholderText), {
        target: { value: 'lasagna' }
      });
      expect(getByText('1 recipe')).toBeInTheDocument();
      expect(queryByText('Chocolate Chip Cookies')).not.toBeInTheDocument();
      expect(getByText('Lasagna')).toBeInTheDocument();
    });
  });

  describe('on api error', () => {
    beforeEach(() => {
      mockGetRecipes({
        responseCode: 500
      });
    });

    test('renders error message', async () => {
      const { getByText } = await renderApp();
      expect(getByText('Error loading recipes!')).toBeInTheDocument();
    });
  });
});
