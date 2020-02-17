import {fetchBins} from '../actions/BinActions/fetchBins'
import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import BinsTable from './BinsTable'
import NewBin from './NewBin';

function BinsView(props){
    // useEffect(() => {
    //     if(!props.bins.length){
    //         props.fetchBins()
    //     }
    // },[props])

    return (
        <>
            <NewBin/>
            <h1>Bins</h1>
            <BinsTable bins={props.bins} history={props.history}/>
        </>
    );
}

const mapStateToProps = state => {
    return {
        bins: state.bins
    }
  }

export default connect(mapStateToProps, {fetchBins})(BinsView)