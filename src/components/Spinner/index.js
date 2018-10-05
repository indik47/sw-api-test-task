import React, { Component } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import PulseLoader from 'react-spinners/PulseLoader';
import './styles.css'

class Spinner extends Component {
    render() {
        const { size } = this.props;

        switch (size) {
            case 'big':
                return (
                    <span className='sweet-loading centered'>
                        <MoonLoader className='spinner'
                                    sizeUnit={"px"}
                                    size={100}
                                    color={'#65d5ae'}
                                    loading={true}/>
                    </span>
                );
            case 'small':
                return (
                    <div className='sweet-loading'>
                        <PulseLoader className='spinner'
                                    sizeUnit={"px"}
                                    size={3}
                                    color={'#65d5ae'}
                                    margin={'5px'}
                                    loading={true}/>
                    </div>
                );
            default:
                break;
        }

    }
}

export default Spinner;