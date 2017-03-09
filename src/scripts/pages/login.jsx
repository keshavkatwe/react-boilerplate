import React from 'react';
import {render} from 'react-dom';
import LoginTemplate from "../../templates/pages/login.html";

class Login extends React.Component {
    render() {
        return (
            <section className="login-page">
                <div className="login-container">
                    <form action="">
                        <div className="form-group">
                            <div className="input-icon-group">
                                <span className="icon"><img src="/images/account.svg" alt=""/></span>
                                <input type="text" className="form-control" placeholder="Login"/>
                            </div>
                            <span className="help-block"></span>
                        </div>
                        <div className="form-group">
                            <div className="input-icon-group">
                                <span className="icon"><img src="/images/key-variant.svg" alt=""/></span>
                                <input type="text" className="form-control" placeholder="Password"/>
                            </div>
                            <span className="help-block"></span>
                        </div>
                        <div className="text-right">
                            <button className="btn btn-primary">Login</button>
                        </div>


                    </form>
                </div>
                <div className="caption-container">

                </div>
            </section>
        );
    }
}

export default Login;