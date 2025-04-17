import {useEffect, useState} from "react";
import RepoCard from "./RepoCard.tsx";

interface RepoListItem {
  name: string,
  description: string,
  language: string,
  html_url: string
}

interface JSONResponse{
  incomplete_result: boolean,
  items: Array<RepoListItem>,
  total_count: number
}

function App() {

  const [repoName, setRepoName] = useState("");
  const [searchQuery, setSearchQuery] = useState("tetris");
  const [response, setResponse] = useState<JSONResponse>();


  useEffect(() => {
    let responseJSON: JSONResponse | undefined;
    fetch(`https://api.github.com/search/repositories?q=${searchQuery}`, {headers: {
      'Accept': 'application/vnd.github.v3+json'}
    }).then(async (r) =>
    {
      responseJSON = await r.json();
      console.log(responseJSON);
      setResponse(r => (responseJSON !== undefined ? responseJSON : r));
    });

  }, [searchQuery]);

  function handleSubmit() {
    if (repoName.trim() !== '') {
      setSearchQuery(repoName);
    }
  }

  return (
    <div className="lg:grid grid-cols-3 text-white">
      <div className="lg:border-r-2 lg:border-r-gray-200 border-solid h-screen flex flex-col justify-center">
        <input type="text"
               placeholder="Enter Repository Name"
               value={repoName}
               onChange={(e) => setRepoName(e.target.value)}
               className="border-2 border-solid border-gray-200 rounded-xl self-center text-xl p-2 bg-gray-800"/>
        <button className="border-2 border-gray-200 border-solid rounded-xl w-fit
          text-xl self-center mt-10 p-2 cursor-pointer hover:bg-gray-500 bg-gray-800"
                onClick={handleSubmit}>Search</button>
      </div>
      <div className="col-span-2 lg:grid xl:grid-cols-4 md:grid-cols-3 overflow-y-scroll h-screen">
        {response !== undefined ? (response.items !== undefined ? response.items.map((item:RepoListItem, index:number) =>
            <RepoCard key={index} repoName={item.name} repoDesc={item.description} repoLang={item.language} repoLink={item.html_url}/>)
            : <p className="place-self-center xl:col-span-4 md:col-span-3 text-2xl">Nothing Found</p>) :
            <p className="place-self-center xl:col-span-4 md:col-span-3 text-2xl">Fetching</p>}
      </div>
    </div>
  );
}

export default App;
