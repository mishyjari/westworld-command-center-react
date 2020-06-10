import React from 'react'
import { Segment, Button } from 'semantic-ui-react';
import { Log } from '../services/Log'

const LogPanel = props => {

  const logs = () => {
    return []
  }

  const allActive = () => {
    return props.hosts.every(host => host.active)
  }

  return(
    <Segment className="HQComps" id="logPanel">
      <pre>
        {
          logs().length > 0
          ?
            logs().map((log, i) => <p key={i} className={log.type}>{log.msg}</p>)
          :
            'No errors'
        }
      </pre>

      {
        allActive()
        ?
          <Button
            fluid
            color={"grey"}
            content={"DEACTIVATE ALL"}
            onClick={() => props.activateAll(false)}
          />
        :
          <Button
            fluid
            color={"red"}
            content={"ACTIVATE ALL"}
            onClick={() => props.activateAll(true)}
          />
      }
    </Segment>
  )
}

export default LogPanel
