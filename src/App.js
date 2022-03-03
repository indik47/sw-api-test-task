import React, { Component } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Tabs from './components/Tabs'
import TabData from './components/TabData'
import fetchEntities, {fetchUrls, sortEntitiesByName} from './utils'
import './App.css'
// import nothing
// import nothing

class App extends Component {
    state = {
        activeTab: 'films',
        tabData: null,
        isSorted: false,
        details: null,
        type: 'films',
        visitedTabs: ['films'],
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

                //put fetched data into variable
                this.entitiesData[entities] = fetchedData;

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
        const tabName = event.currentTarget.innerText;
        const entitiesTypes = this.entitiesTypes;

        //fetch if data is not fetched already and tab is one of entities
        if (!this.entitiesData[tabName] && entitiesTypes.includes(tabName)) {
            this.fetchData(tabName);
        }

        //add clicked tab to visited tabs (add className when re-rendered)
        let visitedTabs = this.state.visitedTabs;
        if( !visitedTabs.includes(tabName) ) { visitedTabs.push(tabName); }

        //set activeTab and tabData for clicked tab
        this.setState({
            ...this.state,
            activeTab: tabName,
            tabData: this.entitiesData[tabName],
            type: tabName,
            isSorted:false,
            visitedTabs: visitedTabs,
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

        // fetch additional data for entity details
        for (let key in dataSaturated) {
            let value = dataSaturated[key];

            if (key === 'homeworld') { value = [value]; }

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
                                // activeTab: 'details',
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

    onSortClick = () => {
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

    closeDetails = () => {
        this.setState({
            ...this.state,
            activeTab: this.state.type,
        })
    }

    render() {
        const {activeTab, tabData, details, isSorted, type, visitedTabs} = this.state;
        const {entitiesTypes: mainTabs, otherTabs, onTabClick, onDataClick, showSaturatedDetails, onSearchInput, onSortClick, closeDetails} = this;

        return (
            <div className="App">
                <div className="content">
                    <Header/>
                    <main>
                        <Tabs activeTab={activeTab}
                              type={type}
                              mainTabs={mainTabs}
                              otherTabs={otherTabs}
                              onTabClick={onTabClick}
                              visitedTabs={visitedTabs}
                        />
                        <TabData activeTab={activeTab}
                                 data={tabData}
                                 isSorted={isSorted}
                                 details={details}
                                 onDataClick={onDataClick}
                                 saturateDetails={showSaturatedDetails}
                                 onSearchInput={onSearchInput}
                                 onSortClick={onSortClick}
                                 closeDetails={closeDetails}
                        />
                    </main>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
