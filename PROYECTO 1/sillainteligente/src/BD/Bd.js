import React from "react";

export default class Bd extends React.Component {

  constructor(props)
  {
      super(props);
      this.state = {};
  }

  render()
  {
    return (
        <div className="container-fluid">
            <br />
            <div className="row">
                <div className="col-md-12 col-sm-12 col-lg-12">
                <h1>DATA ARDUINO</h1>
                <br />
                <div className="card border-dark mb-3">
                    <div className="card-body">
                        
                    </div>
                </div>
                </div>
            </div>
        </div>
      )
  }
}
