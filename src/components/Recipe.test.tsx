import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import Recipe, { IRecipeProps } from './Recipe';

const defaultProps = {
  name: 'Pad Thai',
  type: 'Dinner',
  link: 'https://www.bonappetit.com/recipe/pad-thai',
  nameSearch: null,
  showType: true
};

const renderRecipe = (props: IRecipeProps): RenderResult => {
  const rtlUtils = render(<Recipe {...props} />);
  return rtlUtils;
};

describe('Recipe', () => {
  test('renders title', () => {
    const { getByText } = renderRecipe(defaultProps);
    expect(getByText('Pad Thai')).toBeInTheDocument();
  });

  test('renders type when showType is true', () => {
    const { getByText } = renderRecipe(defaultProps);
    expect(getByText('(Dinner)')).toBeInTheDocument();
  });

  test('does not render type when showType is false', () => {
    const { queryByText } = renderRecipe({ ...defaultProps, showType: false });
    expect(queryByText('(Dinner)')).not.toBeInTheDocument();
  });

  test('renders external link', () => {
    const { getByText } = renderRecipe(defaultProps);
    const link = getByText('Recipe');
    expect(link).toHaveAttribute(
      'href',
      'https://www.bonappetit.com/recipe/pad-thai'
    );
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
