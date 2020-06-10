import React from 'react'
import { Segment, Image } from 'semantic-ui-react'
import * as Images from '../services/Images'
import HostInfo from './HostInfo.js'

class Details extends React.Component {

  setStateWithHost = () => {
    this.setState({ host: this.props.selectedHost })
  }

  componentInfo = () => {
    console.log("COMPONENT INFO - DETAILS")
    console.log('this.state: \n', this.state, 'this.props: \n', this.props, '.hosts: ', this.props.host)
  }

  //console.log('details props: \n', props, '\n  .host: ', props.host)

  // We'll render the logo if no host is selected. But if a host does get selected....
  // Watch the video to see how this works in the app.

  // { firstName, area } = props.selectedHost

  renderSomething = () => (<Image size='medium' src={Images.westworldLogo}/>)

  render() {
    const { host, areas, setHostArea, toggleActive } = this.props
    //this.setStateWithHost()
    //this.componentInfo()
    //console.log("DETAILS RENDER\n  this.props.hosts", this.props.host)
    //console.log("  state: ", this.state)
    return(
      <Segment id="details" className="HQComps">
        { host
          ?
            <HostInfo
              key={host.id}
              host={host}
              areas={areas}
              setHostArea={setHostArea}
              toggleActive={toggleActive} />
          :
            this.renderSomething()
        }
      </Segment>
    )
  }
}

export default Details
