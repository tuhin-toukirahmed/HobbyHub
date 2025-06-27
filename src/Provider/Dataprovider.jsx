import React, { useState, useEffect } from "react";
import { DataContext } from "./DataContext.js";

export const DataProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch("https://hobby-hub-server-site.vercel.app/allgroups");
        if (!response.ok) throw new Error("Failed to fetch groups");
        const data = await response.json();
        setGroups(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  return (
    <DataContext.Provider value={{ groups, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};
