import React from 'react';
import { Segment } from 'semantic-ui-react'
import Host from './Host.js'
import { Card } from 'semantic-ui-react'


const ColdStorage = props => (
  <Segment.Group className="HQComps">
    <Segment compact>
      <h3 className="labels">ColdStorage</h3>
    </Segment>
    <Segment compact>
      <Card.Group itemsPerRow={6}>
        {props.hosts.map(host => <Host key={host.id} {...host} handleClick={props.handleClick} />)}
      </Card.Group>
    </Segment>
  </Segment.Group>
)

export default ColdStorage
