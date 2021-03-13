import { render, RenderResult } from '@testing-library/react';
import Recipe, { IRecipeProps } from './Recipe';

const defaultProps = {
  name: 'Pad Thai',
  type: 'Dinner',
  link: 'https://www.bonappetit.com/recipe/pad-thai',
  nameQuery: null,
  shouldShowType: true
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

  test('renders type when shouldShowType is true', () => {
    const { getByText } = renderRecipe(defaultProps);
    expect(getByText('(Dinner)')).toBeInTheDocument();
  });

  test('does not render type when shouldShowType is false', () => {
    const { queryByText } = renderRecipe({
      ...defaultProps,
      shouldShowType: false
    });
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
