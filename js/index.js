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
  data.forEach(function(d) {
    result.push({
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
      recipes: null
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
        this.setState({
          recipes: Recipes.helpers.processRecipeData(data.feed.entry)
        });
      }
    });
  },
  render: function() {
    var {recipes} = this.state;
    return (
      <div className="row">
        <div className="col-xs-12 text-xs-center">
          <h1>Recipes</h1>
          <hr/>
          {recipes ?
            (recipes.map((recipe, i) => {
              return (
                <Recipe
                  recipe={recipe}
                  key={i}
                />
              );
            }))
          :
            <p>Loading recipes...</p>
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
      <div>
        <a href={recipe.link} target="_blank">{recipe.name}</a>
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
