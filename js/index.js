/****
  namespace
*****/
var Recipes = window.Recipes || {};
window.Recipes = Recipes;
Recipes.helpers = {};

/****
  helpers
*****/
Recipes.helpers.processRecipeData = function(data) {
  var result = [];
  data.forEach(function(d, i) {
    result.push({
      id: i,
      name: d.gsx$name.$t,
      link: d.gsx$link.$t
    });
  });
  return result;
};

/****
  react components
*****/
var App = React.createClass({
  getInitialState: function() {
    return {
      allRecipes: [],
      searchRecipes: [],
      searchString: ''
    };
  },
  componentDidMount: function() {
    this.handleBeerDataXHR();
  },
  handleBeerDataXHR: function() {
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
        this.setState({
          allRecipes: recipes,
          searchRecipes: recipes
        });
      }
    });
  },
  handleSearch: function(event) {
    var searchString = event.target.value;
    var searchRecipes = this.state.allRecipes.filter(function(recipe) {
      return recipe.name.toLowerCase().search(searchString.toLowerCase()) !== -1;
    });
    this.setState({
      searchRecipes: searchRecipes,
      searchString: searchString
    });
  },
  render: function() {
    var {allRecipes, searchRecipes, searchString} = this.state;
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-10 offset-sm-1 col-md-12 offset-md-0
          col-lg-8 offset-lg-2 col-xl-8 offset-xl-2 text-xs-center">
          <h1>Recipes</h1>
          {allRecipes.length ?
            <div className="form-group">
              <input
                type="text"
                className="form-control text-xs-center"
                placeholder="search recipes..."
                style={{
                  marginTop: '20px'
                }}
                value={searchString}
                onChange={this.handleSearch}
              />
              <small
                className="text-muted"
                style={{
                  fontStyle: 'italic'
                }}
              >
                {searchRecipes.length}
                {searchRecipes.length === 1 ? ' recipe' : ' recipes'}
              </small>
            </div>
          : null}
          <hr/>
          {!allRecipes.length ?
            <p>Loading recipes...</p>
          :
            (searchRecipes.length ?
              (searchRecipes.map((recipe) => {
                return (
                  <Recipe
                    recipe={recipe}
                    key={recipe.id}
                  />
                );
              }))
            :
              <p>No recipes matching <strong>{searchString}</strong>...</p>
            )
          }
        </div>
      </div>
    );
  }
});

var Recipe = React.createClass({
  propTypes: {
    recipe: React.PropTypes.object.isRequired
  },
  render: function() {
    var {recipe} = this.props;
    return (
      <div className="card card-block text-xs-center">
        <h4 className="card-title">
          {recipe.name}
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

/****
  document ready
*****/
$(document).ready(function(){
  ReactDOM.render(
    <App />,
    document.getElementById('js-app')
  );
});
