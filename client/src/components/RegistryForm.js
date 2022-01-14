import React from "react";

import { FormGroup, Label, Input, Button } from "reactstrap";

export class RegistryForm extends React.Component {
  handleChange = (field, e) => {
    this.props.onSpouseInfoChange(field, e.target.value);
  }

  render() {
    return (
      <form>
        <div className="row">
          <div className="col-md-6">
            <FormGroup>
              <Label for="spouse1name">Spouse 1</Label>
              <Input
                required
                id="spouse1name"
                name="spouse1name"
                placeholder="Name"
                type="text"
                onChange={(e) => this.handleChange("spouse1Name", e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="spouse1vow">Spouse 1 Vow</Label>
              <Input
                required
                id="spouse1vow"
                name="spouse1vow"
                type="textarea"
                rows="5"
                placeholder="The words you wish to say to your partner and have blockchain remember forever."
                onChange={(e) => this.handleChange("spouse1Vow", e)}
              />
            </FormGroup>
          </div>

          <div className="col-md-6">
            <FormGroup>
              <Label for="spouse2name">Spouse 2</Label>
              <Input
                required
                id="spouse2name"
                name="spouse2name"
                placeholder="Name"
                type="text"
                onChange={(e) => this.handleChange("spouse2Name", e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="spouse2vow">Spouse 2 Vow</Label>
              <Input
                required
                id="spouse2vow"
                name="spouse2vow"
                type="textarea"
                rows="5"
                placeholder="The words you wish to say to your partner and have blockchain remember forever."
                onChange={(e) => this.handleChange("spouse2Vow", e)}
              />
            </FormGroup>
          </div>
        </div>
        <div className="text-center my-5">
          {this.props.isConnected ? (
            <Button
              className="btn-round"
              color="danger"
              size="lg"
              onClick={this.props.onButtonClick}
              outline
            >
              { this.props.isBtnClicked ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <i className="fa fa-heart" />}
              <span> Let's Get Married!</span>
            </Button>
          ) : (
            <div />
          )}
        </div>
      </form>
    );
  }
}

export default RegistryForm;
