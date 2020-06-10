import React from 'react';
import '../stylesheets/Area.css'
import Host from './Host.js'
import { Card } from 'semantic-ui-react'

const formatName = string => {
  return string.split("_")
    .map(w => w.charAt(0).toUpperCase() + w.substr(1))
    .join(" ")
}

const Area = props => (


  <div className='area' id={props.name/* Pass in the area name here to make sure this is styled correctly */}>
    <h3 className='labels'>{formatName(props.name)/* Don't just pass in the name from the data...clean that thing up */}</h3>

    <Card.Group itemsPerRow={6}>

      {props.hosts.map( host => <Host key={host.id} {...host} handleClick={props.handleClick}/> )}

    </Card.Group>

  </div>

)

Area.propTypes = {
  hosts: function(props, propName, componentName){
    if(props.hosts.length > props.limit){
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      )
    }
  }
}

export default Area;
