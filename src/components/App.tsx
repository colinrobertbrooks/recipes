import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import api from '../api';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recipies, setRecipies] = useState([]);

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
        <Col md={12}>
          <h1 className="mt-3 text-center">Recipes</h1>
          {((): JSX.Element => {
            if (loading) {
              return <p className="text-center">Loading recipes...</p>;
            }

            if (error) {
              return <p>Error!</p>;
            }

            return <>{JSON.stringify(recipies)}</>;
          })()}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
