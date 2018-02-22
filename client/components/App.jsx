import React, { Component } from 'react';
import EventsList from './EventsList';

class App extends Component {
  state = {
    events: [{
        game: 'Game of Thrones',
        organizer: 'Ivan',
        date: new Date(),
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, maxime.',
      },{
      game: 'Smash Up',
        organizer: 'Ivan',
        date: new Date(),
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, maxime.',
      }],
    filter: {
      persons: {
       from: 0,
       till: 8,
      },
      date: {
        from: null,
        till: null,
      }
    },
  };

  render() {
    return (<div>
      <EventsList events={this.state.events}/>
    </div>);
  }
}
module.exports = App;
