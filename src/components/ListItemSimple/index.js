import React, {Component} from 'react';
import {beautifyKeyStr, beautifyTimeStr} from '../../utils';

class ListItemSimple extends Component {

  keyBeautified = () => beautifyKeyStr(this.props.keyStr);

  TimeItem = () => {
    const {keyStr, value} = this.props;
    const timeStrBeautified = beautifyTimeStr(value);

    return (
      <li key={keyStr}>
        <b>{this.keyBeautified()}: </b>
        {`${timeStrBeautified}`}
      </li>
    )
  };

  UrlItem = () => {
    const {keyStr, value} = this.props;

    return (
      <li key={keyStr}>
        <b>{this.keyBeautified()}: </b>
        <a href={value} target={"_blank"}>{`${value}`}</a>
      </li>
    )
  };

  RegularItem = () => {
    const {keyStr, value} = this.props;

    return (
      <li key={keyStr}>
        <b>{this.keyBeautified()}: </b>
        {`${value}`}
      </li>
    )
  };

  render() {
    const {keyStr} = this.props;
    const {TimeItem, UrlItem, RegularItem} = this;

    if (keyStr === 'created' || keyStr === 'edited') { return <TimeItem/> }
    if (keyStr === 'url') { return <UrlItem/> }
    return <RegularItem/>
  }
}

export default ListItemSimple;