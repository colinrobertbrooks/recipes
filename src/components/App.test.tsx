import {
  render,
  RenderResult,
  waitForElementToBeRemoved
} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { adapter } from '../api';
import { GoogleSheetsRowType, RecipeType } from '../types';
import App from './App';

const mockAdapter = new MockAdapter(adapter);

const makeGoogleSheetsRow = ({
  name,
  type,
  link
}: RecipeType): GoogleSheetsRowType => ({
  gsx$name: {
    $t: name
  },
  gsx$type: {
    $t: type
  },
  gsx$link: {
    $t: link
  }
});

const mockGetRecipes = ({
  responseCode = 200,
  recipes = []
}: { responseCode?: number; recipes?: Array<RecipeType> } = {}): MockAdapter =>
  mockAdapter
    .onGet(
      '/list/106-nwBqrxeCGMSY0ZOUAjRvlbL2b2xAJgPy67M_Btc8/od6/public/values?alt=json'
    )
    .replyOnce(responseCode, {
      feed: {
        entry: [...recipes.map(recipe => makeGoogleSheetsRow(recipe))]
      }
    });

const renderApp = async (): Promise<RenderResult> => {
  const rtlUtils = render(<App />);
  await waitForElementToBeRemoved(() =>
    rtlUtils.getByText('Loading recipes...')
  );
  return rtlUtils;
};

describe('App', () => {
  beforeEach(() => {
    mockAdapter.reset();
  });

  const recipeTypeFilterLableText = /filter recipe type/;
  const clearButtonLabelText = 'clear filter and search';

  describe('on api success', () => {
    const recipes = [
      {
        name: 'Lasagna',
        type: 'Dinner',
        link: 'https://www.food.com/recipe/barilla-no-boil-lasagna-80435'
      },
      {
        name: 'Chocolate Chip Cookies',
        type: 'Desert',
        link:
          'https://www.allrecipes.com/recipe/10813/best-chocolate-chip-cookies/'
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

    test('filters by recipe type', async () => {
      const { getByLabelText, getByText, queryByText } = await renderApp();
      // select desert
      getByLabelText(recipeTypeFilterLableText).click();
      getByText('Desert').click();
      expect(getByText('1 recipe')).toBeInTheDocument();
      expect(getByText('Chocolate Chip Cookies')).toBeInTheDocument();
      expect(queryByText('Lasagna')).not.toBeInTheDocument();
      // clear selection
      getByLabelText(clearButtonLabelText).click();
      expect(getByText('2 recipes')).toBeInTheDocument();
      // select dinner
      getByLabelText(recipeTypeFilterLableText).click();
      getByText('Dinner').click();
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
