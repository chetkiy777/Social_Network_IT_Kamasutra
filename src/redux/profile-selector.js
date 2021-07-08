import {createSelector} from "reselect";


const profileSelector = (state) => {
    return state.profilePage.profile
};

export const getProfileSelector = createSelector(profileSelector,
    (profile) => {return profile});

const statusSelector = (state) => {
    return state.profilePage.status
};

export const getStatusSelector = createSelector(statusSelector,
    (status) => {return status});

const authorizedUserIdSelector = (state) => {
    return state.auth.userId
};

export const getAuthorizedUserId = createSelector(authorizedUserIdSelector,
    (userId) => {
    return userId
});

const isAuthSelector = (state) => {
    return state.auth.isAuth
};

export const getIsAuth = createSelector(isAuthSelector,
    (isAuth) => {
    return isAuth
});

