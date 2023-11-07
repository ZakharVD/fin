export function renderColor(value: string) {
    if (value === "Housing") {
        return "bg-housing"
    } else if (value === "Food") {
        return "bg-food"
    } else if (value === "Entertainment") {
        return "bg-entertainment"
    } else if (value === "Transportation") {
        return "bg-transportation"
    } else if (value === "Education") {
        return "bg-education"
    } else if (value === "Debt") {
        return "bg-debt"
    } else if (value === "Other") {
        return "bg-other"
    } else if (value === "Health") {
        return "bg-health"
    } else {
        return "bg-blue"
    }
} 