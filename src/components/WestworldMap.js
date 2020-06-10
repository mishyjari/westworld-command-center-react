import React from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area.js'

const WestworldMap = props => {

  const areaHosts = area => {
    return props.hosts.filter(host => host.active && (host.area === area.name) )
  }

  const overflow = (limit,hosts) => {
    return limit < hosts.length;
  }

  return (
    <Segment id="map" >
      {
        props.areas.map(area => {
          if (overflow(area.limit,areaHosts(area))) { console.log('overflow') }
          return (
            <Area
            key={area.id}
            {...area}
            hosts={areaHosts(area)}
            handleClick={props.selectHost}/>
          )
        })
      }
    </Segment>
  )
}

export default WestworldMap
