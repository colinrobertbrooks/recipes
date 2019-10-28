import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';
import api from '../api';
import { RecipesType } from '../types';
import { filterRecipes, getRecipeTypeOptions, sortRecipes } from '../utils';
import Recipe from './Recipe';
import SearchFilter from './SearchFilter';

const SearchFilterWrapper = styled.div`
  margin-bottom: 16px;
`;

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recipes, setRecipes] = useState<RecipesType>([]);
  const [recipeType, setRecipeType] = useState(null);
  const filters = {
    recipeType
  };
  const recipeTypeOptions = getRecipeTypeOptions({
    recipes,
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
                  <SearchFilterWrapper>
                    <SearchFilter
                      recipeType={recipeType}
                      recipeTypeOptions={recipeTypeOptions}
                      handleRecipeTypeChange={setRecipeType}
                      handleClear={(): void => {
                        setRecipeType(null);
                      }}
                    />
                  </SearchFilterWrapper>
                  {filteredRecipes.map(({ id, name, type, link }) => (
                    <Recipe key={id} name={name} type={type} link={link} />
                  ))}
                </>
              );
            }

            return <p>No recipes.</p>;
          })()}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
