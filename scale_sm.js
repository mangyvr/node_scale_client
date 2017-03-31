class Scale_sm {
  constructor(scaleId, scaleModel, scaleStatsModel) {
    // Available states: coffee_not_present, coffee_off, coffee_on, coffee_present
    this.currentState = 'coffee_not_present';  // set as initial state
    this.nextState = 'coffee_not_present';
    this.TRANSITION_WEIGHT = {
      ON_OFF: 200,
      LOW: 500 // only checked in coffee_present state
    };
    this.scale = {
      id: scaleId
    };
    this.modelObj = {
      scale: scaleModel,
      scaleStats: scaleStatsModel
    }; // Should have scaleModel: Scale, scaleStatsModel: Scale_stats

    this.modelObj.scale.findById(this.scale.id).then(function(scale) {
      console.log(`Scale initial state: ${scale.dataValues.state}`);
      this.currentState = scale.dataValues.state;
      this.nextState = scale.dataValues.state;
    });
  }

  // get currentState() {
  //   return this.currentState;
  // }
  //
  // set currentState(currState) {
  //   this.currentState = currState;
  // }
  setScaleModel(scaleModel, scaleStatsModel) {
    this.modelObj.scaleModel = scaleModel;
    this.modelObj.scaleStatsModel = scaleStatsModel;
  }

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
    return this.currentState !== this.nextState;
  }

  setNextState (weight) {
    // console.log(this.currentState, this.nextState);
    if ( this.currentState === 'coffee_not_present' ) {
      if (weight > this.TRANSITION_WEIGHT.ON_OFF) {
        this.nextState = 'coffee_on';
      }
      // this.modelObj.scaleStatsModel
      //   .all()
      //   .then(console.dir);
    } else if (this.currentState === 'coffee_present' ) {
      if (weight < this.TRANSITION_WEIGHT.ON_OFF ) {
        this.nextState = 'coffee_off';
      }
    } else if (this.currentState === 'coffee_off' ) {
      this.nextState = 'coffee_not_present';
      console.log('Coffee off the scale!!!!'); // DB write here?
      // Insert row with 'off_event' set to true
      this.modelObj.scaleStats
        .create({off_event: true, scaleID: this.scale.id});
        // .then(console.log);
    } else if (this.currentState === 'coffee_on' ) {
      this.nextState = 'coffee_present';
      console.log('Coffee on the scale!!!!'); // DB write here?
      this.modelObj.scaleStats
        .create({on_event: true, scaleID: this.scale.id});
        // .then(console.log);
      if (weight < this.TRANSITION_WEIGHT.LOW ) {
       console.log('Coffee low!!!!'); // DB write here?
       this.modelObj.scaleStats
         .create({low_event: true, scaleID: this.scale.id});
        //  .then(console.log);
      }
    } else { // invalid state
      console.error(this.currentState);
      console.error('SM in invalid state!!!');
      throw new Error('SM in invalid state!!!');
    }
  }

  transition () {
    this.currentState = this.nextState;
    this.nextState = this.currentState;
    this.modelObj.scale
      .findById(this.scale.id)
      .then((scale) => { scale.update({state: this.currentState}) });

    // Set nextState to be the same to prevent accidental transitions
  }
}

module.exports = Scale_sm;
