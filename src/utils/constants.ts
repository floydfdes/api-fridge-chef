export const mainCategories = [
    { id: '1', name: 'Appetizers & Starters', key: 'appetizersAndStarters' },
    { id: '2', name: 'Main Dishes (Entrées)', key: 'mainDishes' },
    { id: '3', name: 'Desserts & Sweets', key: 'dessertsAndSweets' },
    { id: '4', name: 'Salads & Fresh Dishes', key: 'saladsAndFreshDishes' },
    { id: '5', name: 'Soups, Stews & Broths', key: 'soupsAndStews' },
    { id: '6', name: 'Breakfast & Morning Meals', key: 'breakfastAndMorningMeals' },
    { id: '7', name: 'Rice, Grains & Pasta', key: 'riceGrainsAndPasta' },
    { id: '8', name: 'Breads & Baked Goods', key: 'breadsAndBakedGoods' },
    { id: '9', name: 'Beverages', key: 'beverages' },
    { id: '10', name: 'Street Food & Snacks', key: 'streetFoodAndSnacks' }
];



export function mapSubCategoryToMainCategory(subCategory: string) {
    const subCategoryLower = subCategory.toLowerCase();

    if (['breakfast', 'morning meal', 'brunch'].some(keyword => subCategoryLower.includes(keyword))) {
        return 'breakfast';
    } else if (['lunch', 'midday meal'].some(keyword => subCategoryLower.includes(keyword))) {
        return 'lunch';
    } else if (['dinner', 'supper', 'evening meal'].some(keyword => subCategoryLower.includes(keyword))) {
        return 'dinner';
    } else if (['snack', 'appetizer', 'finger food', 'small bites'].some(keyword => subCategoryLower.includes(keyword))) {
        return 'snacksAndAppetizers';
    } else if (['dessert', 'sweets', 'pastry'].some(keyword => subCategoryLower.includes(keyword))) {
        return 'desserts';
    } else if (['vegan', 'vegetarian', 'gluten-free', 'low-calorie', 'low-carb', 'paleo', 'keto', 'healthy'].some(keyword => subCategoryLower.includes(keyword))) {
        return 'healthyAndDietary';
    } else if (['quick', 'easy', 'fast', 'one-pot', 'simple'].some(keyword => subCategoryLower.includes(keyword))) {
        return 'quickAndEasy';
    } else if (['holiday', 'christmas', 'thanksgiving', 'party', 'celebration', 'seasonal', 'special'].some(keyword => subCategoryLower.includes(keyword))) {
        return 'specialOccasion';
    } else {
        return 'other'; // Default category for unmatched sub-categories
    }
}
