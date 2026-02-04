import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [theme, setTheme] = useState("");

  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
    localStorage.setItem("chatKaroTheme", selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);
  };

  useEffect(() => {
    const currentTheme = localStorage.getItem("chatKaroTheme") || "";
    setTheme(currentTheme);
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, []);

  return (
    <div className="bg-primary flex justify-between items-center px-5 py-2">
      {/* Logo */}
      <h1 className="font-bold text-lg">ChatKaro</h1>

      {/* Nav Links */}
      <div className="flex gap-4 font-bold">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Login */}
        <Link to="/login">
          <button className="btn btn-secondary">Login</button>
        </Link>

        {/* Register */}
        <Link to="/register">
          <button className="btn btn-outline">Register</button>
        </Link>

        {/* Theme selector */}
        <select
          name="theme"
          className="select"
          value={theme}
          onChange={handleThemeChange}
        >
          <option value="">Default</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="claude">Claude</option>
          <option value="spotify">Spotify</option>
          <option value="vscode">VSCode</option>
          <option value="black">Black</option>
          <option value="corporate">Corporate</option>
          <option value="ghibli">Ghibli</option>
          <option value="gourmet">Gourmet</option>
          <option value="luxury">Luxury</option>
          <option value="mintlify">Mintlify</option>
          <option value="pastel">Pastel</option>
          <option value="perplexity">Perplexity</option>
          <option value="shadcn">Shadcn</option>
          <option value="slack">Slack</option>
          <option value="soft">Soft</option>
          <option value="valorant">Valorant</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;
