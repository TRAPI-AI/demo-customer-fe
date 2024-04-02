function TripSearch() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-gray-300 flex shadow-xs">
        <span className="font-semibold text-xl p-4">Your Logo</span>
      </nav>

      <div className="flex justify-center mt-14 items-start h-1/3">
        <div className="bg-white p-14 border border-gray-300 w-11/12 rounded-lg">
          <div className="flex items-center justify-center gap-3">
            <input className="input rounded-lg border-gray-600 border p-4" />
            <input className="input rounded-lg border-gray-600 border p-4" />
            <input className="input rounded-lg border-gray-600 border p-4" />
            <button className="bg-blue-500 text-white font-semibold rounded-full px-6 py-4">
              Search
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-2xl p-14 text-left font-bold">Results</h2>

      <ul className="flex gap-8 mx-14 justify-around items-center">
        <li className="w-1/3 h-40 border border-gray-400 rounded-lg"></li>
        <li className="w-1/3 h-40 border border-gray-400 rounded-lg"></li>
        <li className="w-1/3 h-40 border border-gray-400 rounded-lg"></li>
      </ul>
    </div>
  );
}

export default TripSearch;
