import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import '../../fonts/starwars-glyphicons/css/starwars-glyphicons.css'


class Tab extends Component {
  static propTypes = {
    tabName: PropTypes.string.isRequired,
    type: PropTypes.string,
    visitedTabs: PropTypes.instanceOf(Array),
  };

  render() {
    const {tabName, type, visitedTabs, icon, onTabClick} = this.props;

    let tabClassName = classNames('tab-list-item', {' tab-list-active': type === tabName}, {' visited': visitedTabs.includes(tabName)});

    return (
      <li className={tabClassName} onClick={(e) => onTabClick(e)}>
        <i className={icon}/>
        {tabName}
      </li>
    );
  }
}

export default Tab;