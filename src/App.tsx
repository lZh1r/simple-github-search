import {useEffect, useState} from "react";

function App() {

  const gitkey = import.meta.env.VITE_GITHUB_API_KEY;
  console.log(gitkey);
  const [searchQuery, setSearchQuery] = useState("tetris");

  useEffect(() => {
    fetch(`https://api.github.com/search/repositories?q=${searchQuery}`, {headers: {
      'Authorization': `${gitkey}`,
      'Accept': 'application/vnd.github.v3+json',
      'X-GitHub-Api-Version': '2022-11-28'}
    }).then((r) => console.log(r.json()))
  }, []);

  return (
    <>

    </>
  )
}

export default App
