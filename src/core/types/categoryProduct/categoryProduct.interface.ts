export interface ICategoryProduct {

    idCategory: string; // Matches the value in <option>
    label: string; // "Frutas", "Verduras", etc.
    name?: string; // Optional: More formal name, e.g., "Fresh Fruits"
    slug?: string; // Optional: URL-friendly version, e.g., "frutas"
    description?: string; // Optional: Description of the category
    isVisible?: boolean; // Optional: Whether the category is visible
    isActive?: boolean;
}