import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { addLikedDog, removeLikedDog } from '../../slicers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

function DogModel ({ dog, children }) {
  return ( 
    <li className='dog'>
      <img 
        className='dog__image' 
        src={dog.img} 
        alt={`A ${dog.age}-year-old ${dog.breed} named ${dog.name}`}
       />
      <ul className='dog__details'>
        <li>Breed &mdash; {dog.breed}</li>
        <li>Name &mdash; {dog.name}</li>
        <li>Age &mdash; {dog.age}</li>
        <li>Zip &mdash; {dog.zip_code}</li>
      </ul>
      {children}
    </li>
  )
}

function Dog ({ dog }) {
  const dispatch = useDispatch()
  const { likedDogs } = useSelector(state => state.dogs)
  const isLiked = likedDogs.some(likedDog => likedDog.id === dog.id)
  const heartClass = `heart ${isLiked ? 'red-heart' : 'gray-heart'}`
  const isDisabled = !isLiked && likedDogs.length === 10 

  function handleToggleLike () {
    if (!isLiked) {
      dispatch(addLikedDog(dog))
    } else {
      dispatch(removeLikedDog(dog.id))
    } 
  }

  return ( 
    <DogModel dog={dog}>
      <button
        className={`${heartClass}`} 
        onClick={handleToggleLike}
        disabled={isDisabled}
        aria-label={isLiked ? 'Unlike dog' : 'Like dog'}
      >
        <FontAwesomeIcon icon={faHeart} />
      </button>
    </DogModel>
  )
}

function MatchedDog ({ dog }) {
  return ( 
    <DogModel dog={dog}>
      <FontAwesomeIcon 
        icon={faHeart} 
        className='heart red-heart cursor-auto'
        aria-hidden='true'
      />
    </DogModel>
  )
}

export { Dog, MatchedDog }
