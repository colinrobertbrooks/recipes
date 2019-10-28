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
import { SearchFilterProps } from '../types';

const ClearIconWrapper = styled.span`
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.5;
`;

const SearchFilter: React.FC<SearchFilterProps> = ({
  recipeType,
  recipeTypeOptions,
  handleRecipeTypeChange,
  recipeNameSearch,
  handleRecipeNameSearchChange,
  handleClear
}) => {
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
        <DropdownToggle color="primary" outline caret>
          {recipeType || 'All'}
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
        spellCheck={false}
        className="text-center"
        value={recipeNameSearch || ''}
        onChange={(event): void =>
          handleRecipeNameSearchChange(event.currentTarget.value)
        }
      />
      <InputGroupAddon addonType="append">
        <Button
          aria-label="Clear"
          color="primary"
          outline
          disabled={!recipeType && !recipeNameSearch}
          onClick={(): void => handleClear()}
        >
          <ClearIconWrapper aria-hidden="true">×</ClearIconWrapper>
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
};

export default SearchFilter;
