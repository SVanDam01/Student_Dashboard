import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

function Data() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const url =
    "https://docs.google.com/spreadsheets/d/1BHjq5MjpuSItvVbnQcEdQt_v956-Ks1lr3f_nEFkTks/gviz/tq?";

  useEffect(() => {
    let isCancelled = false;

    setLoading(true);
    fetch(url)
      .then((res) => res.text())
      .then((data) => {
        if (!isCancelled) {
          const json = JSON.parse(data.substring(47).slice(0, -2));
          const rows = json.table.rows;
          const items = rows.map((row) => {
            return {
              id: nanoid(),
              name: row.c[0].v,
              assignment: row.c[1].v,
              difficulty: row.c[2].v,
              fun: row.c[3].v,
            };
          });
          setData(items);
        }
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  return { data, loading, error };
}

export default Data;
