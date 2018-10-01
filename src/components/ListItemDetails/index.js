import React, { Component } from 'react';
import Spinner from "../Spinner";
import {beautifyKeyStr} from '../../utils';


class ListItemDetails extends Component {
    render() {
        const {keyStr: key, value, onDetailsClick} = this.props;
        let keyBeautified = beautifyKeyStr(key);

        return(
            <li key={key} className='details'>
                <b> {`${keyBeautified}: `}</b>
                {/*check if data is fetched already*/}
                { (value[0] instanceof Object)
                    ?
                    value.map( (obj, i) =>
                        <span key={i}
                              data-id={i}
                              data-entity={key}
                              data-url={`${obj.url}`}
                              onClick={onDetailsClick}>
                                        {`${obj.title || obj.name}`}
                        </span>)
                    :
                    //else render spinner (fetching time)
                    <Spinner size={'small'}/>
                }
            </li>
        )
    }
}

export default ListItemDetails;