import './style.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { DogSearch } from '../../components/DogSearch'
import { DogList } from '../../components/DogList'
import { PrevNextBtns } from '../../components/PrevNextBtns'

export function DogsSearchList () {
  const { nextSearchQuery, prevSearchQuery, dogs, likedDogs } = useSelector(state => state.dogs)

  return ( 
    <div id='dogs-search-list' role="region" aria-labelledby="message-for-user">
      <p id="message-for-user">Omitting search parameters still returns results.</p>
      <DogSearch />
      {likedDogs.length && (
        <Link className="link" to="/PupMatch-Rescue/liked-dogs">
          View Liked Dogs {likedDogs.length}
        </Link>
      )}
      {(prevSearchQuery || nextSearchQuery) && <PrevNextBtns />}
      <DogList dogs={dogs} />
    </div> 
  )
}
