import React, { Component } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import PulseLoader from 'react-spinners/PulseLoader';

class Spinner extends Component {
    render() {
        const { size } = this.props;

        switch (size) {
            case 'big':
                return (
                    <span className='sweet-loading'>
                        <MoonLoader className='spinner'
                                    sizeUnit={"px"}
                                    size={50}
                                    color={'#65d5ae'}
                                    loading={true}/>
                    </span>
                );
                break;
            case 'small':
                return (
                    <span className='sweet-loading'>
                        <PulseLoader className='spinner'
                                    sizeUnit={"px"}
                                    size={3}
                                    color={'#65d5ae'}
                                    margin={'5px'}
                                    loading={true}/>
                    </span>
                );
                break;
        }

    }
}

export default Spinner;