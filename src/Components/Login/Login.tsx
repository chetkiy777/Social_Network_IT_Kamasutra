import React from "react"
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../../common/FormsControl/FormsControl";
import {required} from "../../Utiles/validators";
import {login, logout} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import styles from "./../../common/FormsControl/FormsControl.module.css"
import {AppStateType} from "../../redux/redux-store";



type LoginFormOwnProps = {
    captchaUrl: string | null
}


const LoginForm: React.FC<InjectedFormProps<loginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl }) => {

    return (
        <form onSubmit={handleSubmit}>
            {createField("Email", "email", [required], Input)}
            {createField("Password", "password", [required], Input,  {type: "password"})}
            {createField(null, "rememberMe",  [], Input,{type: "checkbox"}, "remember Me")}
            {captchaUrl && <img src={captchaUrl}/> }
            {captchaUrl && createField("symbols from image", "captcha",  [required], Input, {} )}

            {error &&
            <div className={styles.summaryError}>
                {error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
};

const LoginReduxForm = reduxForm<loginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm);

type mapStateToPropsType = {
    captchaUrl: string | null
    isAuth: boolean
}

type mapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type loginFormValuesType = {
    captcha: string
    rememberMe: boolean
    password: string
    email: string
}

const Login: React.FC<mapStateToPropsType & mapDispatchToPropsType> = (props) => {

    const onSubmit = (formData: loginFormValuesType) => {
        props.login(formData.email , formData.password , formData.rememberMe, formData.captcha);
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }


    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl ={props.captchaUrl}/>
    </div>
};


const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    captchaUrl: state.auth["captchaUrl"],
    isAuth: state.auth["isAuth"]
})



export default connect(mapStateToProps , {login})(Login);