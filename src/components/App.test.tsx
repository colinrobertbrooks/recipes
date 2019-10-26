import {
  render,
  RenderResult,
  waitForElementToBeRemoved
} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { adapter } from '../api';
import App from './App';

const mockAdapter = new MockAdapter(adapter);

const defaultGoogleSheetsResonseData = {
  feed: {
    entry: [
      {
        gsx$name: {
          $t: 'Chocolate Chip Cookies'
        },
        gsx$type: {
          $t: 'Desert'
        },
        gsx$link: {
          $t:
            'https://www.allrecipes.com/recipe/10813/best-chocolate-chip-cookies/'
        }
      },
      {
        gsx$name: {
          $t: 'Lasagna'
        },
        gsx$type: {
          $t: 'Dinner'
        },
        gsx$link: {
          $t: 'https://www.food.com/recipe/barilla-no-boil-lasagna-80435'
        }
      }
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

    test('renders recipes', async () => {
      const { getByText } = await renderApp();
      expect(getByText('Chocolate Chip Cookies')).toBeInTheDocument();
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
