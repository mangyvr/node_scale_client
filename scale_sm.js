class Scale_sm {
  constructor() {
    // Available states: coffee_not_present, coffee_off, coffee_on, coffee_present
    this.currentState = 'coffee_not_present';  // set as initial state
    this.nextState = 'coffee_not_present';
    this.TRANSITION_WEIGHT = {
      ON_OFF: 200,
      LOW: 500 // only checked in coffee_present state
    };
    this.scale = {
      id: 0
    };
  }

  // get currentState() {
  //   return this.currentState;
  // }
  //
  // set currentState(currState) {
  //   this.currentState = currState;
  // }

  setScaleId(scaleId) {
    this.scale.id = scaleId;
  }

  getScaleId() {
    return this.scale.id;
  }

  getCurrState() {
    return this.currentState;
  }

  getNextState() {
    return this.nextState;
  }

  transitionReady() {
    return this.currentState !== this.nextstate;
  }

  setNextState (weight) {
    if ( this.currentState === 'coffee_not_present' ) {
      if (weight > this.TRANSITION_WEIGHT.ON_OFF) {
        this.nextState = 'coffee_on';
      }
    } else if (this.currentState === 'coffee_present' ) {
      if (weight < this.TRANSITION_WEIGHT.ON_OFF ) {
        this.nextState = 'coffee_off';
      }
    } else if (this.currentState === 'coffee_off' ) {
      this.nextState = 'coffee_not_present';
      console.log('Coffee off the scale!!!!'); // DB write here?
    } else if (this.currentState === 'coffee_on' ) {
      this.nextState = 'coffee_present';
      console.log('Coffee on the scale!!!!'); // DB write here?
      if (weight < this.TRANSITION_WEIGHT.LOW ) {
       console.log('Coffee low!!!!'); // DB write here?
      }
    } else { // invalid state
      console.error('SM in invalid state!!!');
      throw new Error('SM in invalid state!!!');
    }
  }

  transition () {
    this.currentState = this.nextState;
    // Set nextState to be the same to prevent accidental transitions
    this.nextState = this.currentState;
  }
}

module.exports = Scale_sm;
