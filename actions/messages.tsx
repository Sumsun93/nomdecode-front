const SET_CURRENT_USER_NAME = 'SET_CURRENT_USER_NAME';

export const setCurrentUserName = (value: string) => {
    return {
        type: SET_CURRENT_USER_NAME,
        payload: {
            currentUserName: value,
        },
    };
};
