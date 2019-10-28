import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import api from '../api';
import { RecipesType } from '../types';
import Recipe from './Recipe';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recipies, setRecipies] = useState<RecipesType>([]);

  useEffect(() => {
    const fetchRecipes = async (): Promise<void> => {
      setError(null);
      setLoading(true);

      try {
        const nextRecipies = await api.getRecipes();
        setRecipies(nextRecipies);
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

            if (recipies.length) {
              return (
                <>
                  {recipies.map(({ id, name, type, link }) => (
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
