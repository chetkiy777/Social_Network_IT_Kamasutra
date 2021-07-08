import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {getAuthorizedUserId, getIsAuth, getProfileSelector, getStatusSelector} from "../../redux/profile-selector";


class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        this.props.getProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}
                     isOwner={!this.props.match.params.userId}
                     saveProfile={this.props.saveProfile}
                     status={this.props.status} updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}/>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: getProfileSelector(state),
    status: getStatusSelector(state),
    authorizedUserId: getAuthorizedUserId(state),
    isAuth: getIsAuth(state)
});

export default compose(
    connect(mapStateToProps, {getProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
)(ProfileContainer)
