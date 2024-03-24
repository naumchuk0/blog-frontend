import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router} from "react-router-dom";
import App from './App.tsx'
import './index.css'
import {Provider} from "react-redux";
import {store} from "./store";
import {getLocalStorage} from "./utils/storage/localStorageUtils.ts";
import {isTokenActive} from "./utils/storage/isTokenActive.ts";
import {autoLogin} from "./store/accounts/accounts.slice.ts";

const token = getLocalStorage('authToken');
if (typeof token === 'string') {
    if (isTokenActive(token)) {
        store.dispatch(autoLogin(token));
    }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
        <Router>
            <Provider store={store}>
                <App/>
            </Provider>
        </Router>
    </>,
)
