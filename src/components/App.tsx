import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';
import api from '../api';
import { IRecipe } from '../types';
import { filterRecipes, getRecipeTypeOptions, sortRecipes } from '../utils';
import Counter from './Counter';
import Recipe from './Recipe';
import SearchFilter from './SearchFilter';

const SearchFilterCounterWrapper = styled.div`
  margin-bottom: 16px;
`;

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [recipeType, setRecipeType] = useState<string | null>(null);
  const [recipeNameSearch, setRecipeNameSearch] = useState<string | null>(null);
  const filters = {
    recipeType,
    recipeNameSearch
  };
  const recipeTypeOptions = getRecipeTypeOptions({
    recipes,
    filters,
    currentValue: recipeType
  });
  const filteredRecipes = filterRecipes({ recipes, filters });

  useEffect(() => {
    const fetchRecipes = async (): Promise<void> => {
      setError(null);
      setLoading(true);

      try {
        const nextRecipes = await api.getRecipes();
        setRecipes(sortRecipes(nextRecipes));
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchRecipes();
  }, []);

  return (
    <Container>
      <Row>
        <Col
          xs={{ size: 12, offset: 0 }}
          sm={{ size: 10, offset: 1 }}
          md={{ size: 12, offset: 0 }}
          lg={{ size: 8, offset: 2 }}
          className="text-center"
        >
          <h1 className="mt-3">Recipes</h1>
          {((): JSX.Element => {
            if (loading) {
              return <p className="text-muted">Loading recipes...</p>;
            }

            if (error) {
              return <p className="text-danger">Error loading recipes!</p>;
            }

            if (recipes.length) {
              return (
                <>
                  <SearchFilterCounterWrapper>
                    <SearchFilter
                      recipeType={recipeType}
                      recipeTypeOptions={recipeTypeOptions}
                      handleRecipeTypeChange={setRecipeType}
                      recipeNameSearch={recipeNameSearch}
                      handleRecipeNameSearchChange={setRecipeNameSearch}
                      handleClear={(): void => {
                        setRecipeType(null);
                        setRecipeNameSearch(null);
                      }}
                    />
                    <Counter count={filteredRecipes.length} />
                  </SearchFilterCounterWrapper>
                  {filteredRecipes.length ? (
                    filteredRecipes.map(({ id, name, type, link }) => (
                      <Recipe
                        key={id}
                        name={name}
                        type={type}
                        link={link}
                        nameSearch={recipeNameSearch}
                        showType={!recipeType}
                      />
                    ))
                  ) : (
                    <p>
                      No <strong>{recipeType}</strong> recipes matching{' '}
                      <strong>{recipeNameSearch}.</strong>
                    </p>
                  )}
                </>
              );
            }

            return (
              <p role="alert" aria-live="assertive">
                No recipes.
              </p>
            );
          })()}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
