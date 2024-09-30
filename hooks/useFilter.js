import { useState } from "react";

export function useFilter(dataList, callback) {
  const [query, setQuery] = useState("");

  const filteredCategory = dataList.filter((data) => {
    if (query === '') return true;
    return callback(data).toLowerCase().includes(query.toLowerCase());
  });

  return [filteredCategory, setQuery];
}
