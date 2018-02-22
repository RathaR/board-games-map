import React, { Component } from 'react';
import Card, {CardActions, CardContent} from 'material-ui/Card';
import Button from 'material-ui/Button';

class EventCard extends Component {

  render() {
    const {event} = this.props;
    return (<Card>
      <CardContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
      </CardContent>
      <CardActions>
        <Button>Action1</Button>
        <Button>Action2</Button>
      </CardActions>
    </Card>);
  }
}
module.exports = EventCard;
