import React, { Component } from 'react';
import Tabs from './components/Tabs'
import TabData from './components/TabData'
import fetchEntities, {fetchUrls} from './utils'
import './App.css';

class App extends Component {
    state = {
        activeTab: 'films',
        tabData: null,
        details: null
    };

    entitiesTypes = ['films', 'planets', 'vehicles', 'people', 'species', 'starships'];
    entitiesData = {};
    otherTabs = ['details'];

    componentDidMount() {
        //fetch data for first tab
        this.fetchData(this.state.activeTab);
    }

    fetchData(entities) {
        fetchEntities(entities)
            .then(fetchedData => {
                //write fetched data into class variable
                this.entitiesData[entities] = fetchedData;
                console.log (this.entitiesData); //TODO remove console.log
                //check if current active tab wasn`t changed (matches entities that were fetched)
                if (entities === this.state.activeTab) {
                    this.setState({
                        ...this.state,
                        activeTab: entities,
                        tabData: this.entitiesData[entities]
                    });
                }
            })
    }


    //change tab and render its info
    onTabClick = (event) => {
        const tabName = event.target.innerText;
        const entitiesTypes = this.entitiesTypes;

        //fetch if data is not fetched already and tab is one of entities
        if (!this.entitiesData[tabName] && entitiesTypes.includes(tabName)) {
            this.fetchData(tabName);
        }

        //set activeTab and tabData for clicked tab
        this.setState({
            ...this.state,
            activeTab: tabName,
            tabData: this.entitiesData[tabName]
        });
    };

    onDataClick = (clickedEntity, type) => {
        // const tabName = this.state.activeTab; //TODO remove
        const entitiesData = this.entitiesData[type];

        let data = entitiesData.filter(item => {
            const name = item.title || item.name;
            return (name === clickedEntity)
        });

        data = data[0];

        this.saturateDetails(data);
    };

    //show detailed information for clicked entity
    saturateDetails = (data) => {
        // const data = this.processDataClick(clickedEntity, type);

        //display details tab immediatly
        this.setState({
            ...this.state,
            activeTab: 'details',
            details: data
        });

        // fetch additional data for displayed entity details
        const dataSaturated = JSON.parse(JSON.stringify(data));
        for (let key in dataSaturated) {
            const value = dataSaturated[key];

            if ( value instanceof Array) {
                fetchUrls(value)
                    .then(data => {
                        //saturate original details with fetched data
                        dataSaturated[key] = data;

                        //set new stated with saturated data
                        this.setState({
                            ...this.state,
                            activeTab: 'details',
                            details: dataSaturated
                        });
                        })
            }
        }
    };


    render() {
        const {activeTab, tabData, details} = this.state;
        const {entitiesTypes: mainTabs, otherTabs, onTabClick, onDataClick, saturateDetails} = this;

        return (
            <div className="App">

                <Tabs activeTab={activeTab} mainTabs={mainTabs} otherTabs={otherTabs} onTabClick={onTabClick}/>
                <TabData activeTab={activeTab} data={tabData} details={details} onDataClick={onDataClick} saturateDetails={saturateDetails}/>

            </div>
        );
    }
}

export default App;
