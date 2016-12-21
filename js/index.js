/************
  namespace
*************/
var Recipes = window.Recipes || {};
window.Recipes = Recipes;
Recipes.helpers = {};

/************
  helpers
*************/
Recipes.helpers.processRecipeData = function(data) {
  var result = [];
  data.forEach(function(d, i) {
    result.push({
      id: i,
      name: d.gsx$name.$t,
      type: d.gsx$type.$t,
      link: d.gsx$link.$t
    });
  });
  return result;
};

/******************
  react components
*******************/
var App = React.createClass({
  getInitialState: function() {
    return {
      allRecipes: [],
      allTypes: [],
      recipes: [],
      searchString: '',
      types: [],
      typeString: 'All'
    };
  },
  componentDidMount: function() {
    this.handleRecipeDataXHR();
  },
  handleRecipeDataXHR: function() {
    var url = 'https://spreadsheets.google.com/feeds/list/106-nwBqrxeCGMSY0ZOUAjRvlbL2b2xAJgPy67M_Btc8/od6/public/values?alt=json';
    $.ajax({
      dataType: 'json',
      type: 'GET',
      url: url,
      success: (data) => {
        var recipes = Recipes.helpers.processRecipeData(data.feed.entry);
        recipes.sort(function(a, b){
          var nameA = a.name.toLowerCase();
          var nameB= b.name.toLowerCase();
          if (nameA < nameB)
            return -1;
          if (nameA > nameB)
            return 1;
          return 0;
        });
        var types = this.getTypes(recipes);
        this.setState({
          allRecipes: recipes,
          allTypes: types,
          recipes: recipes,
          types: types
        });
      }
    });
  },
  _handleSearchInputChange: function(event) {
    var searchString = event.target.value;
    var recipes = this.getRecipes(this.state.typeString, searchString);
    var types = this.getTypes(recipes);
    this.setState({
      recipes: recipes,
      searchString: searchString,
      types: types
    });
  },
  _handleTypeDropdownSelection: function(typeString) {
    var recipes = this.getRecipes(typeString, this.state.searchString);
    var types = this.getTypes(recipes);
    this.setState({
      recipes: recipes,
      types: types,
      typeString: typeString
    });
  },
  _handleClear: function() {
    this.setState({
      recipes: this.state.allRecipes,
      searchString: '',
      types: this.state.allTypes,
      typeString: 'All'
    });
  },
  handleFilter: function(typeString) {
    if(typeString === 'All') {
      return this.state.allRecipes;
    } else {
      return this.state.allRecipes.filter(function(d) {
        return d.type === typeString;
      });
    }
  },
  handleSearch: function(recipes, searchString) {
    return recipes.filter(function(recipe) {
      return recipe.name.toLowerCase().search(searchString.toLowerCase()) !== -1;
    });
  },
  getRecipes: function(typeString, searchString) {
    var filteredRecipes = this.handleFilter(typeString);
    return this.handleSearch(filteredRecipes, searchString);
  },
  getTypes: function(data) {
    return data.map(function(d) { return d.type; })
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort();
  },
  render: function() {
    var {allRecipes, recipes, searchString, types, typeString} = this.state;
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-10 offset-sm-1 col-md-12 offset-md-0
          col-lg-8 offset-lg-2 col-xl-8 offset-xl-2 text-xs-center">
          <h1>Recipes</h1>
          {allRecipes.length ?
            <div className="form-group">
              <SearchInputGroup
                searchString={searchString}
                types={types}
                typeString={typeString}
                onDropdownSelection={this._handleTypeDropdownSelection}
                onInputChange={this._handleSearchInputChange}
                onClear={this._handleClear}
              />
              <RecipeCount
                recipes={recipes}
              />
            </div>
          : null}
          <hr/>
          {!allRecipes.length ?
            <p>Loading recipes...</p>
          :
            (recipes.length ?
              (recipes.map((recipe) => {
                return (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    searchString={searchString}
                    typeString={typeString}
                  />
                );
              }))
            :
              <p>No {typeString !== 'All' ? typeString.toLowerCase() + ' ' : ''}
              recipes matching <strong>{searchString}</strong>...</p>
            )
          }
        </div>
      </div>
    );
  }
});

var SearchInputGroup = React.createClass({
  propTypes: {
    searchString: React.PropTypes.string.isRequired,
    types: React.PropTypes.array.isRequired,
    typeString: React.PropTypes.string.isRequired,
    onDropdownSelection: React.PropTypes.func.isRequired,
    onInputChange: React.PropTypes.func.isRequired,
    onClear: React.PropTypes.func.isRequired
  },
  getClearEnabledBool: function() {
    if(this.props.searchString.length || this.props.typeString !== 'All') {
      return true;
    } else {
      return false;
    }
  },
  render: function() {
    var {searchString, types, typeString, onDropdownSelection, onInputChange,
      onClear} = this.props;
    var clearEnabled = this.getClearEnabledBool();
    return (
      <div>
        <div
          className="input-group"
          style={{
            marginTop: '20px'
          }}
        >
          <div className="input-group-btn">
            <button
              type="button"
              className="btn btn-secondary dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {typeString}
            </button>
            <div className="dropdown-menu">
              <a
                className={`dropdown-item ${typeString === 'All' ? 'active' : null}`}
                style={{ cursor: 'pointer' }}
                onClick={() => { onDropdownSelection('All'); }}
              >
                All
              </a>
              {types.map((type, i) => {
                return (
                  <a
                    key={i}
                    className={`dropdown-item ${typeString === type ? 'active' : null}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => { onDropdownSelection(type); }}
                  >
                    {type}
                  </a>
                );
              })}
            </div>
          </div>
          <input
            type="text"
            className="form-control text-xs-center"
            placeholder={`Search ${typeString.toLowerCase()} recipes...`}
            autoFocus="true"
            value={searchString}
            onChange={onInputChange}
          />
          <span className="input-group-btn">
            <button
              type="button"
              className="btn btn-secondary"
              disabled={clearEnabled ? false : true}
              title={clearEnabled ? 'Clear' : null}
              onClick={onClear}
            >
              <i className={`fa fa-times ${clearEnabled ? 'text-danger' : ''}`}/>
            </button>
          </span>
        </div>
      </div>
    );
  }
});

var RecipeCount = React.createClass({
  propTypes: {
    recipes: React.PropTypes.array.isRequired
  },
  render: function() {
    var {recipes} = this.props;
    return (
      <small
        className="text-muted"
        style={{
          fontStyle: 'italic'
        }}
      >
        {recipes.length}
        {recipes.length === 1 ? ' recipe' : ' recipes'}
      </small>
    );
  }
});

var RecipeCard = React.createClass({
  propTypes: {
    recipe: React.PropTypes.object.isRequired,
    searchString: React.PropTypes.string.isRequired,
    typeString: React.PropTypes.string.isRequired
  },
  render: function() {
    var {recipe, searchString, typeString} = this.props;
    return (
      <div className="card card-block text-xs-center">
        <h4 className="card-title">
          <RecipeName
            string={recipe.name}
            subString={searchString}
          />
          {typeString === 'All' ?
            <small className="text-muted">
              {' '}({recipe.type})
            </small>
          : null}
        </h4>
        <a
          className="btn btn-primary"
          href={recipe.link}
          target="_blank"
          title="View recipe"
        >
          Recipe
        </a>
      </div>
    );
  }
});

var RecipeName = React.createClass({
  propTypes: {
    string: React.PropTypes.string.isRequired,
    subString: React.PropTypes.string
  },
  render: function() {
    var {string, subString} = this.props;
    if(subString.length) {
      var regex = new RegExp('' + subString + '', 'gi' );
      var segments = string.split(regex);
      var replacements = string.match(regex);
      var children = [];
      segments.forEach(function(segment, i) {
        children.push(React.DOM.span({}, segment));
        if(i === segments.length - 1){ return; }
        children.push(React.DOM.span({className: 'bg-info'}, replacements[i]));
      });
      return (
        <span>
          {children}
        </span>
      );
    } else {
      return (
        <span>
          {string}
        </span>
      );
    }
  }
});


/****************
  document ready
*****************/
$(document).ready(function(){
  ReactDOM.render(
    <App />,
    document.getElementById('js-app')
  );
});
