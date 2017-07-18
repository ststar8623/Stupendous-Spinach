import React, {Component} from 'react';

class Camera extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div>
        <h1> Camera page</h1>

        <form>
        <label>
          Photo:
          <input type="file" accept="image/*" capture="camera" id="camera" />
          </label>
          <img id="frame" />
        </form>

      </div>

      );
  }


}


export default Camera;