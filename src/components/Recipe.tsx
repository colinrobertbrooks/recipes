import React from 'react';
import { Button, Card, CardBody } from 'reactstrap';
import styled from 'styled-components';
import { RecipeProps } from '../types';

const CardWrapper = styled.div`
  margin-bottom: 12px;
`;

const CardHeader = styled.h2`
  font-size: 1.5rem;
`;

const CardLink = styled(Button)`
  @media (max-width: 576px) {
    display: block;
  }
`;

const Recipe: React.FC<RecipeProps> = ({ name, type, link }) => (
  <CardWrapper>
    <Card>
      <CardBody>
        <CardHeader>
          <span data-testid="recipe-name">{name}</span>{' '}
          <small className="text-muted">({type})</small>
        </CardHeader>
        <CardLink color="primary" href={link}>
          Recipe
        </CardLink>
      </CardBody>
    </Card>
  </CardWrapper>
);

export default Recipe;
