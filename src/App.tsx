import {useEffect, useState} from "react";

function App() {

  const [repoName, setRepoName] = useState("");
  const [searchQuery, setSearchQuery] = useState("tetris");
  const [response, setResponse] = useState();

  useEffect(() => {
    fetch(`https://api.github.com/search/repositories?q=${searchQuery}`, {headers: {
      'Accept': 'application/vnd.github.v3+json'}
    }).then(async (r) =>
    {
      const j = await r.json()
      setResponse(j);
      console.log(j)
    });
  }, [searchQuery]);

  function handleSubmit() {
    if (repoName.trim() !== '') {
      setSearchQuery(repoName);
    }
  }

  return (
    <div className="lg:grid grid-cols-3 text-white">
      <div className="border-r-2 border-r-gray-200 border-solid h-screen flex flex-col justify-center">
        <input type="text"
               placeholder="Enter Repository Name"
               value={repoName}
               onChange={(e) => setRepoName(e.target.value)}
               className="border-2 border-solid border-gray-200 rounded-xl self-center text-xl p-2 bg-gray-800"/>
        <button className="border-2 border-gray-200 border-solid rounded-xl w-fit
          text-xl self-center mt-10 p-2 cursor-pointer hover:bg-gray-500 bg-gray-800"
                onClick={handleSubmit}>Search</button>
      </div>
      <div className="col-span-2">
        {response !== undefined ? response.items.map((item, index:number) => <p key={index}>{item.name}</p>) : <p>Fetching</p>}
      </div>
    </div>
  );
}

export default App;
