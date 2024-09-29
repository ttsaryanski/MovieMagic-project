const rating = (movieRating) => {
    if (!Number.isInteger(movieRating)) {
        return 'n\\a';
    }

    return '&#x2605;'.repeat(movieRating);
}

export default {
    rating
};