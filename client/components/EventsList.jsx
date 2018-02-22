import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import EventCard from './EventCard';

class EventsList extends Component {

  getItemContent(event) {
    return <EventCard event={event} />;
  }
  render() {
    const {events} = this.props;
    return (<List>
      {events.map((event, index) => <ListItem
        key={index}>
        {this.getItemContent(event)}
      </ListItem> )}
    </List>)
  }
}
module.exports = EventsList;
