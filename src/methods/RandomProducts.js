export function getRandomProductsByCategory (category, currentProductId) {
  const otherProducts = category.filter(product => product.id !== currentProductId)
  const randomProducts = []
  while (randomProducts.length < 4 && otherProducts.length > 0) {
    const randomIndex = Math.floor(Math.random() * otherProducts.length)
    randomProducts.push(otherProducts[randomIndex])
    otherProducts.splice(randomIndex, 1)
  }
  return randomProducts
}
