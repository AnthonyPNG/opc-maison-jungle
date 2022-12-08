import { useState } from 'react'
import { plantList } from '../datas/plantList'
import PlantItem from './PlantItem'
import Categories from './Categories'
import '../style/ShoppingList.css'

function ShoppingList({ cart, updateCart }) {
	const [activeCategory, setActiveCategory] = useState('')
	const categories = plantList.reduce(
		(acc, elem) =>
			acc.includes(elem.category) ? acc : acc.concat(elem.category),
		[]
	)

	function addToCart(name, price) {
		const currentPlantAdded = cart.find((plant) => plant.name === name)
		if (currentPlantAdded) {
			const cartFilteredCurrentPlant = cart.filter(
				(plant) => plant.name !== name
			)
			updateCart([
				...cartFilteredCurrentPlant,
				{ name, price, amount: currentPlantAdded.amount + 1 }
			])
		} else {
			updateCart([...cart, { name, price, amount: 1 }])
		}
	}

	function removeToCart(name, price) {
		const currentPlantRemoved = cart.find((plant) => plant.name === name)
		if (currentPlantRemoved) {
			const cartFilteredCurrentPlant = cart.filter(
				(plant) => plant.name !== name
			)
			if (currentPlantRemoved.amount <= 1) {
				updateCart([...cartFilteredCurrentPlant]);
			}
			else {
				updateCart([
					...cartFilteredCurrentPlant,
					{name, price, amount: currentPlantRemoved.amount - 1 }
				])
			}
		}
	}

	return (
		<div className='lmj-shopping-list'>
			<Categories
				categories={categories}
				setActiveCategory={setActiveCategory}
				activeCategory={activeCategory}
			/>

			<ul className='lmj-plant-list'>
				{plantList.map(({ id, cover, name, water, light, price, category, isBestSale }) =>
					!activeCategory || activeCategory === category ? (
						<div key={id}>
							<PlantItem
								cover={cover}
								name={name}
								water={water}
								light={light}
								price={price}
								isBestSale={isBestSale}
							/>

							<button 
								className='lmj-shopping-button' 
								onClick={() => addToCart(name, price)}
							>
								Ajouter
							</button>
							&nbsp;&nbsp;&nbsp;
							<button 
								className='lmj-shopping-button'
								onClick={() => removeToCart(name, price)}
							>
								Retirer
							</button>
						</div>
					) : null
				)}
			</ul>
		</div>
	)
}

export default ShoppingList