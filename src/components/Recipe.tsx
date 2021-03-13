import React from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Card, CardBody } from 'reactstrap';
import styled from 'styled-components';
import { IRecipe } from '../types';

export interface IRecipeProps extends Omit<IRecipe, 'id'> {
  nameQuery: string | null | undefined;
  shouldShowType: boolean;
}

const Recipe: React.FC<IRecipeProps> = ({
  name,
  type,
  link,
  notes,
  nameQuery,
  shouldShowType
}) => (
  <CardWrapper>
    <Card>
      <CardBody>
        <CardHeader>
          <Highlighter
            data-testid="recipe-name"
            highlightClassName="highlight-word-search"
            searchWords={[nameQuery || '']}
            textToHighlight={name}
          />
          {shouldShowType && <small className="text-muted"> ({type})</small>}
        </CardHeader>
        <CardLink
          aria-label={`Recipe for ${name}`}
          color="primary"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Recipe
        </CardLink>
        {notes && <CardNotes>&quot;{notes}&quot;</CardNotes>}
      </CardBody>
    </Card>
  </CardWrapper>
);

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

const CardNotes = styled.p.attrs({ className: 'text-muted' })`
  margin-top: 8px;
  margin-bottom: 0;
  font-size: 0.95rem;
  font-style: italic;
`;

export default Recipe;
