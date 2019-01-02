import React, { Component } from "react";
import "./inputTime.scss";
import { connect } from "react-redux";
import { setSchedule } from "../../../actions";

class InputTime extends Component {

  constructor(props) {
    super(props);

    this.state = {
      departure_time: {
        hour: 0,
        minute: 0,
        period: ""
      },
      arrival_time: {
        hour: 0,
        minute: 0,
        period: ""
      }
    }
  }

  componentWillMount() {
    for (let i = 0; i < this.props.schedule.schedule.length; i++) {
      if (this.props.scheduleObj.index === this.props.schedule.schedule[i].index) {
        this.onUpdateArrivalTime(this.props.schedule);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.duration != this.props.duration) {
      this.onUpdateArrivalTime(nextProps.schedule);
    }
  }

  onUpdateArrivalTime = (propsSchedule) => {
    for (let i = 0; i < propsSchedule.schedule.length; i++) {
      if (this.props.scheduleObj.index === propsSchedule.schedule[i].index) {
        let departure_hour;
        if (propsSchedule.schedule[i].departure_time["period"] == "PM") {
          departure_hour = Number(propsSchedule.schedule[i].departure_time["hour"]) + 12;
        } else {
          departure_hour = Number(propsSchedule.schedule[i].departure_time["hour"]);
        }
        let arrival_hour = departure_hour + Number(propsSchedule.duration);
        arrival_hour = arrival_hour % 24;

        if (arrival_hour > 12) {
          propsSchedule.schedule[i].arrival_time["period"] = "PM";
          propsSchedule.schedule[i].arrival_time["hour"] = arrival_hour - 12;
          propsSchedule.schedule[i].arrival_time["minute"] = propsSchedule.schedule[i].departure_time["minute"];
        } else {
          propsSchedule.schedule[i].arrival_time["period"] = "AM";
          propsSchedule.schedule[i].arrival_time["hour"] = arrival_hour;
          propsSchedule.schedule[i].arrival_time["minute"] = propsSchedule.schedule[i].departure_time["minute"];
        }
      }
    }
    this.props.setSchedule(propsSchedule);
  }

  onInputDepartureTime = (e) => {
    let time = 0;
    if (e.target.value !== "") {
      time = Number(e.target.value);
    }

    if (time >= 0 && (e.target.name === "minute" && time < 60 || e.target.name === "hour" && time < 13)) {
      let state = this.state;
      state.departure_time[e.target.name] = time;
      this.setState(state);

      const propsSchedule = this.props.schedule;
      for (let i = 0; i < propsSchedule.schedule.length; i++) {
        if (this.props.scheduleObj.index === propsSchedule.schedule[i].index) {
          propsSchedule.schedule[i].departure_time[e.target.name] = time;
        }
      }
      this.onUpdateArrivalTime(propsSchedule);
    }
  };

  onSelectPeriodDepartureTime = (period) => () => {
    let state = this.state;
    state.departure_time.period = period;
    this.setState(state);

    const propsSchedule = this.props.schedule;
    for (let i = 0; i < propsSchedule.schedule.length; i++) {
      if (this.props.scheduleObj.index === propsSchedule.schedule[i].index) {
        propsSchedule.schedule[i].departure_time["period"] = period;
      }
    }
    this.onUpdateArrivalTime(propsSchedule);
  };

  // onInputArrivalTime = (e) => {
  //   let time = 0;
  //   if (e.target.value !== "") {
  //     time = Number(e.target.value);
  //   }
  //   if (time >= 0 && (e.target.name === "minute" && time < 60 || e.target.name === "hour" && time < 13)) {
  //     let state = this.state;
  //     state.arrival_time[e.target.name] = time;

  //     this.setState(state);

  //     let propsSchedule = this.props.schedule;
  //     for (let i = 0; i < propsSchedule.schedule.length; i++) {
  //       if (this.props.scheduleObj.index === propsSchedule.schedule[i].index) {
  //         propsSchedule.schedule[i].arrival_time[e.target.name] = time;
  //       }
  //     }
  //     this.props.setSchedule(propsSchedule);
  //   }

  // };

  // onSelectPeriodArrivalTime = (period) => () => {
  //   let state = this.state;
  //   state.arrival_time.period = period;

  //   this.setState(state);

  //   let propsSchedule = this.props.schedule;
  //   for (let i = 0; i < propsSchedule.schedule.length; i++) {
  //     if (this.props.scheduleObj.index === propsSchedule.schedule[i].index) {
  //       propsSchedule.schedule[i].arrival_time["period"] = period;
  //     }
  //   }
  //   this.props.setSchedule(propsSchedule);
  // };

  render() {

    return (
      <div className="input-time">
        <div className="time-form" id="departure_time">
          <div className="time-title"><strong>Departure Time</strong></div>
          <div className="time-label"><label>Hour:</label></div>
          <div className="time-input">
            <input type="text" name="hour" className="form-control" value={this.props.scheduleObj.departure_time.hour}
              onChange={this.onInputDepartureTime} />
          </div>

          <div className="time-label"><label>Minute:</label></div>
          <div className="time-input">
            <input type="text" name="minute" className="form-control" value={this.props.scheduleObj.departure_time.minute}
              onChange={this.onInputDepartureTime} />
          </div>
          <div className="time-input">
            <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              {this.props.scheduleObj.departure_time.period}
            </button>
            <div className="dropdown-menu">
              <a className="dropdown-item" onClick={this.onSelectPeriodDepartureTime("AM")}>AM</a>
              <a className="dropdown-item" onClick={this.onSelectPeriodDepartureTime("PM")}>PM</a>
            </div>
          </div>
        </div>
        <div className="time-form" id="arrival_time">
          <div className="time-title"><strong>Arrival Time</strong></div>
          <div className="time-label"><label>Hour:</label></div>
          <div className="time-input">
            <input type="text" name="hour" className="form-control" value={this.props.scheduleObj.arrival_time.hour} disabled={true} />
          </div>
          <div className="time-label"><label>Minute:</label></div>
          <div className="time-input">
            <input type="text" name="minute" className="form-control" value={this.props.scheduleObj.arrival_time.minute} disabled={true} />
          </div>
          <div className="time-input">
            <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" disabled={true}
              aria-haspopup="true" aria-expanded="false">
              {this.props.scheduleObj.arrival_time.period}
            </button>
            {/* <div className="dropdown-menu">
              <a className="dropdown-item" onClick={this.onSelectPeriodArrivalTime("AM")}>AM</a>
              <a className="dropdown-item" onClick={this.onSelectPeriodArrivalTime("PM")}>PM</a>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const schedule = state.ticket.schedule;
  return {
    schedule
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSchedule: (schedule) => {
      dispatch(setSchedule(schedule));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(InputTime);