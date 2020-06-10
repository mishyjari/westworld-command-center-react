import '../stylesheets/HostInfo.css'
import React, { Component } from 'react'
import { Radio, Icon, Card, Grid, Image, Dropdown, Divider } from 'semantic-ui-react';

const formatName = string => {
  return string.split("_")
    .map(w => w.charAt(0).toUpperCase() + w.substr(1))
    .join(" ")
}

class HostInfo extends React.Component {

  state = {
    options: [],
    value: '',
    host: null
  }

  componentWillMount() {
      //console.log('HOST INFO // component will mount');
      //console.log('  this.props', this.props)

      this.setState({
        host: this.props.host,
        value: this.props.host.area,
        options: this.props.areas.map(area => ({
          key: area.name,
          text: formatName(area.name),
          value: area.name,
        }))
      }, () => {
        console.log('State set to ...this.props\n  this.state: ', this.state)
    })
  }


  getAreaIdByName = name => {
    return this.props.areas.find(area => area.name === name).id
  }


  handleChange = (e, {value}) => {
    if (this.props.setHostArea(this.state.host.id, this.getAreaIdByName(value)))
      { this.setState({value}) }
    else { console.log('area full') }
    // the 'value' attribute is given via Semantic's Dropdown component.
    // Put a debugger in here and see what the "value" variable is when you pass in different options.
    // See the Semantic docs for more info: https://react.semantic-ui.com/modules/dropdown/#usage-controlled
  }

  toggle = () => {
    this.props.toggleActive(this.state.host.id)
  }

  fullName = this.props.host.firstName + ' ' + this.props.host.lastName;

  render(){
    //console.log(" HOST INFO RENDER ")
    //console.log("  this.state: ", this.state, "\n  this.props: ", this.props)

    //const { id } = this.props;
    //console.log(id)

    //const { id, firstName, lastName, active, imageUrl, gender, area, authorized } = this.state.host
    const { ...host } = this.state.host
    console.log(this.props.areas)

    return (
      <Grid>
        <Grid.Column width={6}>
          <Image
            src={host.imageUrl}
            floated='left'
            size='small'
            className="hostImg"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card>
            <Card.Content>
              <Card.Header>
                { this.fullName } | { host.gender === 'Male' ? <Icon name='man' /> : <Icon name='woman' />}
              </Card.Header>
              <Card.Meta>
                <Radio
                  onChange={this.toggle}
                  label={ host.active ? "Active" : "Decomissioned" }
                  // {/* Sometimes the label should take "Decommissioned". How are we going to conditionally render that? */}
                  checked={ host.active ? true : false }
                  // {/* Checked takes a boolean and determines what position the switch is in. Should it always be true? */}
                  slider
                />
              </Card.Meta>

              <Divider />
              Current Area:
              <Dropdown
                onChange={this.handleChange}
                value={this.state.value}
                options={this.state.options}
                selection
              />
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    )
  }
}

export default HostInfo
