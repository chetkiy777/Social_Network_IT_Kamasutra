import {Field, Form, Formik} from "formik";
import React from "react";

const usersValidateForm = (values: any) => {
    const errors = {};
    return errors;
}
type usersValidateFormType = {
    term: string
}
export const UserSearchForm = () => {

    const submit = (values: usersValidateFormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
    }

    return (
        <div>
            <Formik
                initialValues={{term: ''}}
                validate={usersValidateForm}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field type="text" name="term"/>
                        <button type="submit" disabled={isSubmitting}>
                            Поиск
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}