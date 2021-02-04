import React, { useState } from 'react';
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown
} from 'reactstrap';
import styled from 'styled-components';
import { IRecipeTypeOption } from '../types';

interface ISearchFilterProps {
  recipeType: string | null;
  recipeTypeOptions: IRecipeTypeOption[];
  handleRecipeTypeChange: (nextRecipeType: string | null) => void;
  recipeNameSearch: string | null;
  handleRecipeNameSearchChange: (nextRecipeNameSearch: string | null) => void;
  handleClear: () => void;
}

const SearchFilter: React.FC<ISearchFilterProps> = ({
  recipeType,
  recipeTypeOptions,
  handleRecipeTypeChange,
  recipeNameSearch,
  handleRecipeNameSearchChange,
  handleClear
}) => {
  const selectedRecipeType = recipeType || 'All';
  const [typeDropdownIsOpen, setTypeDropdownIsOpen] = useState(false);
  const toggleTypeDropdown = (): void =>
    setTypeDropdownIsOpen(!typeDropdownIsOpen);

  return (
    <InputGroup>
      <InputGroupButtonDropdown
        addonType="prepend"
        isOpen={typeDropdownIsOpen}
        toggle={toggleTypeDropdown}
      >
        <DropdownToggle
          aria-label={`filter recipe type ${selectedRecipeType}`}
          color="primary"
          outline
          caret
        >
          {selectedRecipeType}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            active={recipeType === null}
            onClick={(): void => handleRecipeTypeChange(null)}
          >
            All
          </DropdownItem>
          {recipeTypeOptions.map(({ value, active, disabled }) => (
            <DropdownItem
              key={value}
              active={active}
              disabled={disabled}
              onClick={(): void => handleRecipeTypeChange(value)}
            >
              {value}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </InputGroupButtonDropdown>
      <Input
        placeholder="search recipe names"
        className="text-center"
        value={recipeNameSearch || ''}
        onChange={(event): void =>
          handleRecipeNameSearchChange(event.currentTarget.value)
        }
        spellCheck={false}
      />
      <InputGroupAddon addonType="append">
        <Button
          aria-label="clear filter and search"
          color="primary"
          outline
          onClick={handleClear}
        >
          <ClearIconWrapper aria-hidden="true">×</ClearIconWrapper>
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
};

const ClearIconWrapper = styled.span`
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.5;
`;

export default SearchFilter;
