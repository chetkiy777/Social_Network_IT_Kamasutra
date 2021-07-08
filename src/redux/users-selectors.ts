import {createSelector} from "reselect";
import {AppStateType} from "./redux-store";

const gelAllUsers = (state: AppStateType) => {
    return state.usersPage.users;
};

export const getUsersSelector = createSelector(gelAllUsers ,
    (users) => {
    return users.filter(u => true)
    });

const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
};

export const getPageSizeSelector = createSelector(getPageSize ,
    (pageSize) => {
    return pageSize
    });

const getTotalUsersCountSelector = (state: AppStateType) => {
    return state.usersPage.totalItemsCount
};

export const getTotalUsersCount = createSelector(getTotalUsersCountSelector ,
    (totalItemsCount) => {return totalItemsCount
});

const getCurrentPageSelector = (state: AppStateType) => {
    return state.usersPage.currentPage
};

export const getCurrentPage = createSelector(getCurrentPageSelector,
    (currentPage) => {return currentPage
});

const getIsFetchingSelector = (state: AppStateType) => {
    return state.usersPage.isFetching
};

export const getIsFetching = createSelector(getIsFetchingSelector,
    (isFetching) => {return isFetching
});

const getFollowingInProgressSelector = (state: AppStateType) => {
    return state.usersPage.followingInProgress
};

export const getFollowingInProgress = createSelector(getFollowingInProgressSelector,
    (followingInProgress) => {return followingInProgress
});

