import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { addDogs, setSearchQueries } from '../../slicers'
import { Button } from '../Buttons'
import { fetchDogs, fetchSearchData } from '../../api'

export function PrevNextBtns () {
  const dispatch = useDispatch()
  const { prevSearchQuery, nextSearchQuery } = useSelector(state => state.dogs)

  async function onBtnClick (searchQuery) {
    try {
      const searchData = await fetchSearchData(searchQuery)
      const dogs = await fetchDogs(searchData.resultIds)

      dispatch(addDogs(dogs))
      dispatch(setSearchQueries({
        prevSearchQuery: searchData.prev,
        nextSearchQuery: searchData.next
      }))
    } catch (err) {
      console.error("Error fetching dogs or search pages: ", err)
    }
  }

  return (
    <nav className='previous-next-container' aria-label="Search results navigation">
      <Button
        styling='prev-next-btn'
        disabled={!prevSearchQuery}
        onClick={() => onBtnClick(prevSearchQuery)}
      >
        Previous
      </Button>
      <Button
        styling='prev-next-btn'
        disabled={!nextSearchQuery}
        onClick={() => onBtnClick(nextSearchQuery)}
      >
        Next
      </Button>
    </nav>
  )
}
