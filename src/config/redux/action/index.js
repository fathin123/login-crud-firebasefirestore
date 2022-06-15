import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const actionUserName = () => (dispatch) => {
    setTimeout(() => {
        return dispatch({ type: 'CHANGE_USER', value: 'Fathin Naufaliya' })
    }, 2000)
}

export const registerUserAPI = (data) => (dispatch) => {
    dispatch({ type: 'CHANGE_LOADING', value: true })
    const auth = getAuth();
    return (
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
            })
            .then(res => {
                console.log('success: ', res);
                dispatch({ type: 'CHANGE_LOADING', value: false })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                dispatch({ type: 'CHANGE_LOADING', value: false })
            })
    )
}

export const loginUserAPI = (data) => (dispatch) => {

    return new Promise((resolve, reject) => {
        dispatch({ type: 'CHANGE_LOADING', value: true })
        const auth = getAuth();
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((res) => {
                // Signed in
                const dataUser = {
                    email: res.user.email,
                    uid: res.user.uid,
                    emailVerified: res.user.emailVerified
                }
                dispatch({ type: 'CHANGE_USER', value: dataUser })
                resolve(true)
            })
            .then(res => {
                console.log('success: ', res);
                
                dispatch({ type: 'CHANGE_LOADING', value: false })
                dispatch({ type: 'CHANGE_ISLOGIN', value: true })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                dispatch({ type: 'CHANGE_LOADING', value: false })
                dispatch({ type: 'CHANGE_ISLOGIN', value: false })
                reject(false)
            })
    })
}