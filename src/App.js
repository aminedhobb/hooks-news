import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

export default function App() {
  const [results, setResults] = useState([])
  const [query, setQuery] = useState('react hooks')
  const [isLoading, setLoading] = useState(false)
  const searchInputRef = useRef()

  useEffect(() => {
    getResults()
  }, [])

  const getResults = async () => {
    setLoading(true)
    const response = await axios
      .get(`http://hn.algolia.com/api/v1/search?query=${query}`)
    setResults(response.data.hits)
    setLoading(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    getResults()
  }

  const handleClearSearch = () => {
    setQuery('')
    searchInputRef.current.focus()
  }

  return(
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={event => setQuery(event.target.value)}
          value={query}
          ref={searchInputRef}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleClearSearch}>Clear</button>
      </form>
      {isLoading ? (
          <div> Loading results...</div>
        ) : (
          <ul>
            {results.map((result) => (
              <li key={result.objectID}>
                <a href={result.url}>{result.title}</a>
              </li>
            ))}
          </ul>
        )
      }
    </>
  )
}
