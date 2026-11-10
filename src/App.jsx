import { useState } from 'react';
import Card from './Card.jsx';
import { cows } from "./data/data.js";
import "./App.css";

const SORT_OPTIONS = ["name", "type", "weight", "milk"];

function App() {
  const [selectedType, setSelectedType] = useState("All");
  const [favorites, setFavorites] = useState(new Set());
  const [showFavorites, setShowFavorites] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("Hi→Lo");

  const types = ["All", ...Array.from(new Set(cows.map(c => c.type)))];

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "Hi→Lo" ? "Lo→Hi" : "Hi→Lo");
  };

  const filteredCows = cows
    .filter(p => selectedType === "All" || p.type === selectedType)
    .filter(p => !showFavorites || favorites.has(p.id))
    .sort((a, b) => {
      const order = sortOrder === "Hi→Lo" ? 1 : -1;
      if (sortBy === "name") {
        return a.name.localeCompare(b.name) * order;
      } else {
        return (a[sortBy] - b[sortBy]) * order;
      }
    }
  );

  return (
      <div className = "app"> 
        <header className = "header">
          <h1>Cow Collection</h1>
          <p className = "subtitle">
            {favorites.size} of {cows.length} favorite cows
          </p>
        </header>
            <div>
      <div className="buttons" style={{ marginBottom: 16 }}>
        {types.map(type => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            style={{
              marginRight: 4,
              marginBottom: 4,
              padding: "6px 12px 8px 12px",
              backgroundColor: selectedType === type ? "steelblue" : "#f2f2f2",
              color: selectedType === type ? "white" : "steelblue",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            {type}
          </button>
        ))}
        <button
          onClick={() => setShowFavorites(s => !s)}
          style={{
            marginRight: 4,
            marginBottom: 4,
            padding: "6px 12px 8px 12px",
            backgroundColor: showFavorites ? "#FFD700" : "#f2f2f2",
            color: showFavorites ? "white" : "#FFD700",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          ★ Favorites
        </button>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            marginRight: 4,
            marginBottom: 4,
            padding: "6px 8px",
            borderRadius: 8,
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          {SORT_OPTIONS.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button
          onClick={toggleSortOrder}
          style={{
            marginRight: 4,
            marginBottom: 4,
            padding: "6px 12px 8px 12px",
            backgroundColor: sortOrder === "Hi→Lo" ? "steelblue" : "#f2f2f2",
            color: sortOrder === "Hi→Lo" ? "white" : "steelblue",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          {sortOrder}
        </button>
      </div>

      <div className="grid">
        {filteredCows.map((cow) => (
          <Card
            key={cow.id}
            id={cow.id}
            name ={cow.name}
            type={cow.type}
            weight={cow.weight}
            milk={cow.milk}
            size={120}
            origin={cow.origin}
            wiki={cow.wiki}
            starred={favorites.has(cow.id)}
            onStar={() => toggleFavorite(cow.id)}
          />
        ))}
      </div>
    </div>
    </div>
  ); 
}

export default App;
