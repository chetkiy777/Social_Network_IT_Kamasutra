import React from 'react';
import {connect} from 'react-redux';
import {
    follow, getUsers, setCurrentPage,
    toggleFollowingInProgress,
    unfollow
} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../../common/preloader/Preloader'
import {compose} from "redux";
import {
    getUsersSelector,
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getTotalUsersCount, getPageSizeSelector
} from "../../redux/users-selectors";

// type PropsTypes = {
//     currentPage: number
//     pageSize: number
//     totalItemsCount: number
//     users: Array<UserType>
//     followingInProgress: Array<number>
//     follow: () => void
//     unfollow: () => void
//     getUsers: (currentPage: number, pageSize: number) => void
//     toggleFollowingInProgress: any
//     isFetching: boolean
// }

class UserContainer extends React.Component {
    componentDidMount() {
        let {currentPage, pageSize } = this.props;
        this.props.getUsers(currentPage , pageSize)
    }

        onPageChange = (pageNumber) => {
        const {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize)
    };
    render() {
        return <>
            {this.props.isFetching ? <Preloader />: null}
            <Users totalItemsCount={this.props.totalItemsCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      onPageChange={this.onPageChange}
                      users={this.props.users}
                      unfollow={this.props.unfollow}
                      follow={this.props.follow}
                      isFetching={this.props.isFetching}
                      followingInProgress={this.props.followingInProgress}
                      toggleFollowingInProgress={this.props.toggleFollowingInProgress} />
            </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSizeSelector(state),
        totalItemsCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
};

export default compose(
    connect(mapStateToProps , {follow, unfollow, getUsers, setCurrentPage, toggleFollowingInProgress}),
)(UserContainer)



