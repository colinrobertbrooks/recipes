import React, { useState } from 'react';
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
} from 'reactstrap';
import styled from 'styled-components';
import { IRecipeTypeOption } from '../types';

interface ISearchFilterProps {
  recipeType: string | null | undefined;
  recipeTypeOptions: IRecipeTypeOption[];
  handleRecipeTypeChange: (nextRecipeType: string | null | undefined) => void;
  recipeName: string | null | undefined;
  handleRecipeNameChange: (
    nextRecipeNameSearch: string | null | undefined
  ) => void;
  handleClear: () => void;
}

const SearchFilter: React.FC<ISearchFilterProps> = ({
  recipeType,
  recipeTypeOptions,
  handleRecipeTypeChange,
  recipeName,
  handleRecipeNameChange,
  handleClear,
}) => {
  const selectedRecipeType = recipeType || 'All';
  const [typeDropdownIsOpen, setTypeDropdownIsOpen] = useState(false);
  const toggleTypeDropdown = () => setTypeDropdownIsOpen(!typeDropdownIsOpen);

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
            onClick={() => handleRecipeTypeChange(undefined)}
          >
            All
          </DropdownItem>
          {recipeTypeOptions.map(({ value, active, disabled }) => (
            <DropdownItem
              key={value}
              active={active}
              disabled={disabled}
              onClick={() => handleRecipeTypeChange(value)}
            >
              {value}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </InputGroupButtonDropdown>
      <Input
        placeholder="search recipe names"
        className="text-center"
        value={recipeName || ''}
        onChange={(event) => handleRecipeNameChange(event.currentTarget.value)}
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
