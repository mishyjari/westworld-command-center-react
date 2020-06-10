import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap.js';
import Headquarters from './components/Headquarters.js';

const HOSTS_API = "http://localhost:3000/hosts";
const AREAS_API = "http://localhost:3000/areas";
const REQUEST_HEADERS = {
  "Content-Type": "application/json",
  "Accept": "application/json"
}

class App extends Component {

  state = {
    areas: null,
    hosts: null,
    selectedHost: null,
  }

  fetchHosts = () => {
    fetch( HOSTS_API )
    .then( res => res.json() )
    .then( hosts => this.setState({ hosts }))
  }

  fetchAreas = () => {
    fetch( AREAS_API )
    .then( res => res.json() )
    .then( areas => this.setState({ areas }))
  }

  handleSelectHost = hostId => {
    const host = this.state.hosts.find(host => host.id === hostId)
    this.setState({ selectedHost: host })
  }

  componentWillMount(){
    //console.log('APP MOUNT, fetch api\'s')
    this.fetchHosts();
    this.fetchAreas();
  }

  getHostById = id => {
    return this.state.hosts.find(host => host.id === id);
  }

  getAreaById = id => {
    return this.state.areas.find(area => area.id === id);
  }

  toggleActive = id => {
    console.log('toggleActive in parent: ', id)

    const host = this.getHostById(id);

    host.active = !host.active;

    this.setState(prevState => ({
      hosts: [...prevState.hosts, ...host]
    }), () => console.log('toggled in parent state', this.state.selectedHost))
  }

  setHostArea = (hostId, areaId) => {
    const host = this.getHostById(hostId);
    const area = this.getAreaById(areaId);
    const areaHosts = this.state.hosts.filter(host => host.area === area.name)

    host.area = area.name

    if (areaHosts.length < area.limit)
    {
      this.setState(prevState => ({
        hosts: [...prevState.hosts, ...host ]
      }), () => console.log('after set', this.state));
      return true;
    } else {
      console.log('area full');
      return false;
    }
  }

  toggleActivateAll = newBool => {
    const hosts = this.state.hosts.map(host => {
      host.active = newBool;
      return host
    });

    this.setState({ hosts })
  }


  render(){
    //console.log("APP RENDER")
    const { areas, hosts, selectedHost, errors } = this.state
    //console.log('  this.state: ', this.state)

    return (
      <Segment id='app'>
        { (hosts && areas)
          ?
            <WestworldMap
              areas={areas}
              hosts={hosts}
              selectHost={this.handleSelectHost} />
          : '' }
        { (hosts && areas)
          ?
            <Headquarters
              areas={areas}
              hosts={hosts}
              selectedHost={selectedHost}
              selectHost={this.handleSelectHost}
              setHostArea={this.setHostArea}
              toggleActive={this.toggleActive}
              errors={errors}
              activateAll={this.toggleActivateAll} />
            : '' }
      </Segment>
    )
  }
}

export default App;
