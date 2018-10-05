import React, {Component} from 'react';
import Spinner from "../Spinner";
import {beautifyKeyStr} from '../../utils';


class ListItemDetails extends Component {

  Details = (props) => {
    const {keyStr: key, onDetailsClick} = this.props;
    const {items} = props;

    return (
      items.map((obj, i) =>
        <span key={i}
              data-id={i}
              data-entity={key}
              data-url={`${obj.url}`}
              onClick={onDetailsClick}>
                                        {`${obj.title || obj.name}`}
                        </span>)
    )
  };

  render() {
    const {keyStr: key, value: items} = this.props;
    const {Details} = this;
    let keyBeautified = beautifyKeyStr(key);

    return (
      <li key={key} className='details'>
        <b> {`${keyBeautified}: `}</b>

        {/*check if data is fetched already*/}
        {(items[0] instanceof Object) ? <Details items={items}/> : <Spinner size={'small'}/>
        }
      </li>
    )
  }
}

export default ListItemDetails;