import React, { Component } from 'react';
import Tabs from './components/Tabs'
import TabData from './components/TabData'
import fetchEntities from './utils'
import './App.css';

class App extends Component {
    state = {
        activeTab:'films',
        tabData: null
    };

    entitiesTypes = ['films', 'planets', 'vehicles', 'people', 'species' ];
    otherTabs = ['details'];
    fetchedData = {};


    fetchData (entitiesType){
        return fetchEntities(entitiesType)
                .then(data => {
                    this.fetchedData[entitiesType] = data;
                    // console.log(this.fetchedData); //TODO remove console.log
                    return entitiesType;
                })
        //-------------------fetchALL (old code) -------------------
        // entitiesTypes.map (entityType => {
        //     console.log(entityType);
        //     fetchEntities(entityType)
        //         .then(data => {
        //             this.fetchedData[entityType] = data;
        //             console.log(this.fetchedData);
        //
        //             if (entityType === 'films') {
        //                 this.setState({
        //                     ...this.state,
        //                     tabData: data
        //                 })
        //             }
        //         })
        // })
    }

    onClickTabItem = (event) => {
        const tabName = event.target.innerText;
        const entitiesTypes = this.entitiesTypes;

        //make fetch only if data is not fetched already
        if ( !this.fetchedData[tabName] && entitiesTypes.includes(tabName) ) {
            this.fetchData(tabName)
                .then( (fetchedEntitiesType) => {
                    //check if current active tab matches data that was fetched
                    if (fetchedEntitiesType === this.state.activeTab) {
                        this.setState({
                            ...this.state,
                            activeTab: tabName,
                            tabData: this.fetchedData[fetchedEntitiesType]
                        });
                    }
                });
        }

        //set activeTab and tabData for clicked tab
        this.setState({
            activeTab: tabName,
            tabData: this.fetchedData[tabName]
        });
    };

    componentDidMount() {
        const tabName = 'films';

        //fetch data for initial first tab
        this.fetchData(tabName)
            .then(fetchedEntitiesType => {
                //check if current active tab matches data that was fetched
                if (fetchedEntitiesType === this.state.activeTab) {
                this.setState({
                    ...this.state,
                    activeTab: tabName,
                    tabData: this.fetchedData[fetchedEntitiesType]
                });
                }
            })
    }

  render() {
      const {activeTab, tabData} = this.state;
      const {entitiesTypes:mainTabs, otherTabs, onClickTabItem} = this;

      return (
          <div className="App">

              <Tabs activeTab={activeTab} mainTabs={mainTabs} otherTabs={otherTabs} onClickTabItem={onClickTabItem}/>
              <TabData data={tabData} />

          </div>
      );
  }
}

export default App;
