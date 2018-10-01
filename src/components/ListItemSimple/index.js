import React, { Component } from 'react';
import {beautifyKeyStr, beautifyTimeStr} from '../../utils';

class ListItemSimple extends Component {
    render() {
        const {keyStr, value} = this.props;
        const keyBeautified = beautifyKeyStr(keyStr);

        if (keyStr === 'created' || keyStr === 'edited') {
            const valueBeautified = beautifyTimeStr(value);
            return (
                <li key={keyStr}>
                    <b>{keyBeautified}: </b>
                    {`${valueBeautified}`}
                </li>
            )
        } else if (keyStr === 'url') {
            return (
                <li key={keyStr}>
                    <b>{keyBeautified}: </b>
                    <a href={value} target={"_blank"}>{`${value}`}</a>
                </li>
            )
        } else {
            return (
                <li key={keyStr}>
                    <b>{keyBeautified}: </b>
                    {`${value}`}
                </li>
            )
        }
    }
}

export default ListItemSimple;