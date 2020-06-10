import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import Details from './Details'
import HostInfo from './HostInfo'
import ColdStorage from './ColdStorage.js';
import LogPanel from './LogPanel.js'


const Headquarters = props => {

  //console.log('HEADQUARTERS:\n//Functional Component called from App with stats.hosts as arg\n', '  props.hosts: ', props.hosts)

  const inactiveHosts = () => {
    return props.hosts.filter( host => !host.active )
  }
  return(
    <Grid celled='internally'>

      <Grid.Column width={8}>
        <ColdStorage
          hosts={inactiveHosts()}
          handleClick={props.selectHost} />
      </Grid.Column>

      <Grid.Column width={5}>
        <Details
          host={props.selectedHost}
          areas={props.areas}
          setHostArea={props.setHostArea}
          toggleActive={props.toggleActive} />
      </Grid.Column>

      <Grid.Column width={3}>

        <LogPanel
          hosts={props.hosts}
          errors={props.errors}
          activateAll={props.activateAll}
        />

      </Grid.Column>
    </Grid>
  )
}

export default Headquarters;
