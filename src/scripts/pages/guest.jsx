import React from 'react';
import { render } from 'react-dom';
class Guest extends React.Component
{
    render(){
        return (<div>{this.props.children}</div>);
    }
}

export default Guest;