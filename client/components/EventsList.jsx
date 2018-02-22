import React, { Component } from 'react';
import List, {ListItem} from 'material-ui/List';
import EventCard from './EventCard';

class EventsList extends Component {

  getItemContent(event) {
    return <EventCard event={event} />;
  }

  render() {
    const {events} = this.props;
    const items = events.map((event, index) =>
      <ListItem key={index}>
        {this.getItemContent(event)}
      </ListItem>);

    return (<List>{items}</List>)
  }
}
module.exports = EventsList;
