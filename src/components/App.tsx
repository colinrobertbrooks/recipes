import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useQueryParam, StringParam } from 'use-query-params';
import styled from 'styled-components';
import api from '../api';
import { IRecipe } from '../types';
import { filterRecipes, getRecipeTypeOptions, sortRecipes } from '../utils';
import Counter from './Counter';
import Recipe from './Recipe';
import SearchFilter from './SearchFilter';

const App: React.FC = () => {
  const [spreadsheetId] = useQueryParam('spreadsheetId', StringParam);
  const [key] = useQueryParam('key', StringParam);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [recipeTypeQuery, setRecipeType] = useQueryParam('type', StringParam);
  const [recipeNameQuery, setRecipeNameQuery] = useQueryParam(
    'name',
    StringParam
  );
  const filters = {
    recipeTypeQuery,
    recipeNameQuery,
  };
  const recipeTypeOptions = getRecipeTypeOptions({
    recipes,
    filters,
    currentValue: recipeTypeQuery,
  });
  const filteredRecipes = filterRecipes({ recipes, filters });

  useEffect(() => {
    const fetchRecipes = async (): Promise<void> => {
      setError(null);
      setLoading(true);

      try {
        const nextRecipes = await api.getRecipes(spreadsheetId, key);
        setRecipes(sortRecipes(nextRecipes));
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    fetchRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {(() => {
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
                      recipeType={recipeTypeQuery}
                      recipeTypeOptions={recipeTypeOptions}
                      handleRecipeTypeChange={setRecipeType}
                      recipeName={recipeNameQuery}
                      handleRecipeNameChange={(value) => {
                        if (!value) {
                          setRecipeNameQuery(undefined);
                        } else {
                          setRecipeNameQuery(value);
                        }
                      }}
                      handleClear={() => {
                        setRecipeType(undefined);
                        setRecipeNameQuery(undefined);
                      }}
                    />
                    <Counter count={filteredRecipes.length} />
                  </SearchFilterCounterWrapper>
                  {filteredRecipes.length ? (
                    filteredRecipes.map(({ id, name, type, link, notes }) => (
                      <Recipe
                        key={id}
                        name={name}
                        type={type}
                        link={link}
                        notes={notes}
                        nameQuery={recipeNameQuery}
                        shouldShowType={!recipeTypeQuery}
                      />
                    ))
                  ) : (
                    <p>
                      No <strong>{recipeTypeQuery}</strong> recipes matching{' '}
                      <strong>{recipeNameQuery}.</strong>
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

const SearchFilterCounterWrapper = styled.div`
  margin-bottom: 16px;
`;

export default App;
