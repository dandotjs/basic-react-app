import { useEffect, useState } from "react";
import Pet from './Pet';
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"]

const SearchParams = () => {
  const [location, setLocation] = useState('');
  const [animal, setAnimal] = useState('')
  const [breed, setBreed] = useState('')
  const [pets, setPets] = useState([])
  const breeds = []

  useEffect(() => {
    requestPets()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function requestPets() {
    const res = await fetch(`http://pets-v2.dev.apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`)
    const json = await res.json();
    setPets(json.pets)
  }
  return (
    <div className="search-params">
      <form onSubmit={(e) => {
        e.preventDefault();
        requestPets()
      }}>
        <label htmlFor="location">
          Location
        <input onChange={(e) => {setLocation(e.target.value)}} id="location" value={location} placeholder="Location"/>
        </label>
        <label htmlFor="animal">
          <select name="" id="animal" value={animal} onChange={(e) => {
            setAnimal(e.target.value)
            setBreed('')
          }}>
            <option value=""></option>
            {ANIMALS.map(animal => {
              return <option key={animal}>{animal}</option>
            })}
          </select>
        </label>
        <label htmlFor="breed">
          <select name="" id="breed" value={breed} disabled={breeds.length === 0} onChange={(e) => {
            setBreed(e.target.value)
          }}>
            <option value=""></option>
            {ANIMALS.map(breed => {
              return <option key={breed}>{breed}</option>
            })}
          </select>
        </label>
        <button>Submit</button>
      </form>
      {
        pets.map(pet => {
          return <Pet key={pet.id} name={pet.name} animal={pet.animal} breed={pet.breed} />
        })
      }
    </div>
  )
}

export default SearchParams;