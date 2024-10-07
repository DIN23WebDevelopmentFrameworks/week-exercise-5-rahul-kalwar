import React, { useEffect, useState } from 'react';

// Component to fetch and display recipe tags
const RecipeTags = ({ onTagClick }) => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch tags from API
    fetch('https://dummyjson.com/recipes/tags')
      .then((response) => response.json())
      .then((data) => {
        setTags(data); // Assuming data is an array of tags
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching recipe tags');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading tags...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Select a Recipe Tag:</h2>
      <ul>
        {tags.map((tag) => (
          <li key={tag} onClick={() => onTagClick(tag)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Component to fetch and display recipes for a selected tag
const RecipeList = ({ tag, onBackClick }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch recipes for the selected tag from API
    fetch(`https://dummyjson.com/recipes/tag/${tag}`) // Fixed template literal syntax
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.recipes || []); // Ensure data.recipes is an array
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching recipes');
        setLoading(false);
      });
  }, [tag]);

  if (loading) return <p>Loading recipes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <button onClick={onBackClick}>Back to Tags</button>
      <h2>Recipes for "{tag}"</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
            <h3>{recipe.name}</h3>
            <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
            <p><strong>Instructions:</strong></p>
            <ol>
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Main App component
const App = () => {
  const [selectedTag, setSelectedTag] = useState(null);

  // Handle clicking a tag to show recipes
  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  // Handle going back to the tag list
  const handleBackClick = () => {
    setSelectedTag(null);
  };

  return (
    <div>
      <h1>ACME Recipe O'Master</h1>
      {selectedTag ? (
        <RecipeList tag={selectedTag} onBackClick={handleBackClick} />
      ) : (
        <RecipeTags onTagClick={handleTagClick} />
      )}
    </div>
  );
};

export default App;
