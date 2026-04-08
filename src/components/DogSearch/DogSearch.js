import './style.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { 
  addDogs,
  emptyDogs,
  setSearchQueries,
  setLoading,
  setHasResults 
} from '../../slicers'
import { capitalizeFirstLetter } from '../../utils';
import { fetchDogs, fetchSearchData } from '../../api'
import { Input, Select } from '../Controls'
import { Button } from '../Buttons'

export function DogSearch () {
  const dispatch = useDispatch()
  const[formData, setFormData] = useState({
    breed: '',
    ageMax: '',
    ageMin: '',
    zipCode: '',
    sort: 'breed:asc'
  })
  const {
    breed, 
    ageMin, 
    ageMax, 
    zipCode, 
    sort
  } = formData

  function onSetFormData (e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function buildSearchParams () {
    const params =  {
      sort
    }
    
    if (formData.breed) {
      const cleaned = formData.breed.trim().toLowerCase()
      params.breeds = [capitalizeFirstLetter(cleaned)]
      formData.breed = cleaned
    }

    if (formData.zipCode) {
      params.zipCodes = [formData.zipCode.trim()]
    }

    if (formData.ageMin) {
      params.ageMin = ageMin
    }

    if (formData.ageMax) {
      params.ageMax = ageMax
    }

    return params
  }

  async function onFormSubmit (e) {
    e.preventDefault()

    dispatch(setLoading(true))
    dispatch(setHasResults(null))
    dispatch(emptyDogs())
    dispatch(setSearchQueries({
      prevSearchQuery: '',
      nextSearchQuery: ''
    }))

    const searchParams = buildSearchParams()
    const searchData = await fetchSearchData('/dogs/search', searchParams)
    
    if (searchData.next) {
      dispatch(setSearchQueries({ nextSearchQuery: searchData.next }))
    }

    const dogsArr = await fetchDogs(searchData.resultIds)
    dispatch(setLoading(false))
    
    if (dogsArr.length) {
     dispatch(addDogs(dogsArr));
    } else {
     dispatch(setHasResults(false));
  }
}

  const options = [
    { value: 'breed:asc', content: 'Breed - Ascending' },
    { value: 'breed:desc', content: 'Breed - Descending' },
    { value: 'name:asc', content: 'Name - Ascending' },
    { value: 'name:desc', content: 'Name - Descending' },
    { value: 'age:asc', content: 'Age - Ascending' },
    { value: 'age:desc', content: 'Age - Descending' }
  ]

  return (
    <form id='dog-search-form' onSubmit={onFormSubmit}>
      <Select
        styling='large-select'
        name='sort'
        value={sort}
        onChange={onSetFormData}
        options={options} 
      />
      <Input
        styling='large-input'
        placeholder='breed'
        name='breed'
        onChange={onSetFormData}
        value={breed}
      />
      <div id="inputs-container">
        <Input
          styling='medium-input'
          placeholder='zip'
          name='zipCode'
          onChange={onSetFormData}
          value={zipCode}
          type='number'
        />
        <Input
          styling='medium-input center-text'
          placeholder='age max'
          name='ageMax'
          onChange={onSetFormData}
          value={ageMax}
          type='number'
          min={0}
          max={20}
        />
        <Input
          styling='medium-input center-text'
          placeholder='age min'
          name='ageMin'
          onChange={onSetFormData}
          value={ageMin}
          type='number'
          min={0}
          max={20}
        />
      </div>
      <Button styling='btn form-btn'>Search</Button>
    </form>
  )
}
