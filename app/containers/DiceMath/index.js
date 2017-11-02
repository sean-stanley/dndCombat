/*
 *
 * DiceMath
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import diceMath from './diceMath';
import DiceMathDisplay from '../../components/DiceMathDisplay';

export class DiceMath extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ diceMath: diceMath(this.state.diceString) }, () => {
      console.log(this.state.diceMath);
    });
  }

  render() {
    return (
      <div>
        <Helmet
          title="DiceMath"
          meta={[
            { name: 'description', content: 'Description of DiceMath' },
          ]}
        />
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Dice Math
              </h1>
              <h2 className="subtitle">
                Learn about your rolls
              </h2>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <label className="label">Dice</label>
                <div className="control">
                  <input className="input is-large" onChange={this.handleChange} name="diceString" type="text" placeholder="1d6" />
                </div>
                <p className="help">first number is the number of dice, 'd' is seperator and second number is size of the die 6 for 6 sided etc.</p>
              </div>
              <div className="control">
                <button className="button is-primary" type="submit">Submit</button>
              </div>
            </form>
            {this.state.diceMath && <DiceMathDisplay diceMath={this.state.diceMath} diceString={this.state.diceString} />}
          </div>
        </section>
        <footer className="footer">
          <div className="container">
            <div className="content has-text-centered">
              <p>
                Part of the <strong>D&D AI Project</strong> by <a href="https://redheadweb.nz">Sean Stanley</a>. The source code is licensed&nbsp;
                <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

DiceMath.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(DiceMath);
