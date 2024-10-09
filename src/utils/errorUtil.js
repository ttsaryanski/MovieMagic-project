export const createErrorMsg = (err) => {
    switch (err.name) {
        case 'ValidationError':
            return Object.values(err.errors).map(err => err.message).join(', ');
        case 'CastError':
            return new Error('Please select Cast');
        case 'MongooseError':
            return new Error('Server is busy, please try again later!')
        default:
            return err.message;
    }
};