import React, { Component } from 'react';
import Tabs from './components/Tabs'
import TabData from './components/TabData'
import fetchEntities, {fetchUrls, sortEntitiesByName} from './utils'
import './App.css';

class App extends Component {
    state = {
        activeTab: 'films',
        tabData: null,
        isSorted: false,
        details: null,
        type: 'films'
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
            tabData: this.entitiesData[tabName],
            type: tabName,
            isSorted:false
        });
    };

    onDataClick = (clickedEntity) => {
        const entitiesData = this.entitiesData[this.state.type];

        //get details data from array of fetched data
        let data = entitiesData.filter(item => {
            const name = item.title || item.name;
            return (name === clickedEntity)
        });

        data = data[0];
        this.showSaturatedDetails(data);
};

    //show detailed information for clicked entity
    showSaturatedDetails = (data) => {
        const dataSaturated = JSON.parse(JSON.stringify(data));

        //display details tab immediately
        this.setState({
            ...this.state,
            activeTab: 'details',
            details: dataSaturated
        });

        // fetch additional data for displayed entity details
        for (let key in dataSaturated) {
            const value = dataSaturated[key];

            if (value instanceof Array) {
                fetchUrls(value)
                    .then(data => {
                        //saturate original details with fetched data
                        dataSaturated[key] = data;

                        //check if user haven`t left the page
                        if (dataSaturated.url === this.state.details.url) {
                            //set new state with saturated data
                            this.setState({
                                ...this.state,
                                activeTab: 'details',
                                details: dataSaturated
                            });
                        }
                    })
            }
        }
    };

    onSearchInput = (event) => {
        const type = this.state.type;
        const data = this.entitiesData[type];

        let input = event.target.value;

        if (input) {
            input = input.toLowerCase();
            let filteredData = data.filter(item => {
                return (item.name || item.title).toLowerCase().includes(input);
            });
            this.setState({
                ...this.state,
                tabData: filteredData,
                isSorted: false
            })

        } else {
            this.setState({
                ...this.state,
                tabData: data,
                isSorted: false
            })
        }
    };

    onSortClick = (e) => {
        let isSorted = this.state.isSorted;
        if (isSorted) {

            return;
        }

        const dataCopy = JSON.parse(JSON.stringify(this.state.tabData));

        sortEntitiesByName(dataCopy);
        this.setState({
            ...this.state,
            tabData: dataCopy,
            isSorted: true
        })
    };

    render() {
        const {activeTab, tabData, details, isSorted} = this.state;
        const {entitiesTypes: mainTabs, otherTabs, onTabClick, onDataClick, showSaturatedDetails, onSearchInput, onSortClick} = this;

        return (
            <div className="App">
                <Tabs activeTab={activeTab} mainTabs={mainTabs} otherTabs={otherTabs} onTabClick={onTabClick}/>
                <TabData activeTab={activeTab} data={tabData} isSorted={isSorted} details={details}
                         onDataClick={onDataClick} saturateDetails={showSaturatedDetails} onSearchInput={onSearchInput} onSortClick={onSortClick}/>
            </div>
        );
    }
}

export default App;
