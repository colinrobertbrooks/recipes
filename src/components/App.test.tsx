import {
  render,
  RenderResult,
  waitForElementToBeRemoved
} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { adapter } from '../api';
import { GoogleSheetsRowType } from '../types';
import App from './App';

const mockAdapter = new MockAdapter(adapter);

const makeGoogleSheetsRow = ({
  name,
  type,
  link
}: {
  name: string;
  type: string;
  link: string;
}): GoogleSheetsRowType => ({
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

const defaultGoogleSheetsResonseData = {
  feed: {
    entry: [
      makeGoogleSheetsRow({
        name: 'Lasagna',
        type: 'Dinner',
        link: 'https://www.food.com/recipe/barilla-no-boil-lasagna-80435'
      }),
      makeGoogleSheetsRow({
        name: 'Chocolate Chip Cookies',
        type: 'Desert',
        link:
          'https://www.allrecipes.com/recipe/10813/best-chocolate-chip-cookies/'
      })
    ]
  }
};

const mockGetRecipes = ({
  responseCode = 200,
  responseData = defaultGoogleSheetsResonseData
} = {}): MockAdapter =>
  mockAdapter
    .onGet(
      '/list/106-nwBqrxeCGMSY0ZOUAjRvlbL2b2xAJgPy67M_Btc8/od6/public/values?alt=json'
    )
    .replyOnce(responseCode, responseData);

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

  describe('on api success', () => {
    beforeEach(() => {
      mockGetRecipes();
    });

    test('renders sorted recipes', async () => {
      const { getAllByTestId } = await renderApp();
      const renderedNames = getAllByTestId('recipe-name');
      const expectedNames = ['Chocolate Chip Cookies', 'Lasagna'];
      renderedNames.forEach((el, idx) =>
        expect(el.textContent).toBe(expectedNames[idx])
      );
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
