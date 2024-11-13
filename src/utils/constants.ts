export const mainCategories = [
    { id: '1', name: 'Breakfast', key: 'breakfast' },
    { id: '2', name: 'Lunch', key: 'lunch' },
    { id: '3', name: 'Dinner', key: 'dinner' },
    { id: '4', name: 'Snacks & Appetizers', key: 'snacksAndAppetizers' },
    { id: '5', name: 'Desserts', key: 'desserts' },
    { id: '6', name: 'Healthy & Dietary', key: 'healthyAndDietary' },
    { id: '7', name: 'Quick & Easy', key: 'quickAndEasy' },
    { id: '8', name: 'Special Occasion', key: 'specialOccasion' }
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
