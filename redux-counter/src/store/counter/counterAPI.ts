export function fetchCount(amount = 2) {
    return new Promise((resolve) =>
        setTimeout(() => resolve({ data: amount }), 500)
    );
}
