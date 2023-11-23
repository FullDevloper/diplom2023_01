import React from 'react'
import Contact from './Contact'
const SearchResults = ({searchResults,setSearchResults}) => {
  return (
    <div className="w-full convos scrollbar">
    <div>
      {/*Heading*/}
      <div className="flex flex-col px-8 pt-8">
        <h1 className="font-extralight text-md text-green_2">Харилцах</h1>
        <span className="w-full mt-4 ml-10 border-b dark:border-b-dark_border_1"></span>
      </div>
      {/*Results*/}
      <ul>
        {searchResults &&
          searchResults.map((user,index) => (
            <Contact
              contact={user}
              index={index+1}
              key={user._id}
              setSearchResults={setSearchResults}
            />
          ))}
      </ul>
    </div>
  </div>
  )
}

export default SearchResults