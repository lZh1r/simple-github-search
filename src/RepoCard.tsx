
function RepoCard({repoName, repoDesc, repoLang, repoLink} :
                  {repoName: string, repoDesc: string, repoLang: string, repoLink: string}) {
    return (
        <div className="bg-gray-800 border-gray-200 border-solid border-2 rounded-xl p-2 m-2 text-xl w-[90%]
        flex flex-col justify-between">
            <a href={repoLink}>
                <h1 className="break-all">{repoName}</h1>
            </a>
            <p className="text-lg text-gray-300 h-[10vh] overflow-clip m-2 ">{repoDesc}</p>
            <p className="shadow-fade shadow-gray-800">{repoLang}</p>
        </div>
    );
}

export default RepoCard;