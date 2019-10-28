import React from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Card, CardBody } from 'reactstrap';
import styled from 'styled-components';
import { RecipeProps } from '../types';

const CardWrapper = styled.div`
  margin-bottom: 12px;
`;

const CardHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 12px;
`;

const CardLink = styled(Button)`
  @media (max-width: 576px) {
    display: block;
  }
`;

const Recipe: React.FC<RecipeProps> = ({
  name,
  type,
  link,
  nameSearch,
  showType
}) => (
  <CardWrapper>
    <Card>
      <CardBody>
        <CardHeader>
          <Highlighter
            data-testid="recipe-name"
            highlightClassName="highlight-word-search"
            searchWords={[nameSearch || '']}
            textToHighlight={name}
          />
          {showType && <small className="text-muted"> ({type})</small>}
        </CardHeader>
        <CardLink
          color="primary"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Recipe
        </CardLink>
      </CardBody>
    </Card>
  </CardWrapper>
);

export default Recipe;
