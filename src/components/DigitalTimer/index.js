// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isTimerRunning: false, secondsElapsed: 0, timerLimit: 25}

  tick = () => {
    const {secondsElapsed, timerLimit} = this.state
    const isTimerCompleted = secondsElapsed === timerLimit * 60

    if (isTimerCompleted) {
      this.clearTimer()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        secondsElapsed: prevState.secondsElapsed + 1,
      }))
    }
  }

  clearTimer = () => {
    clearInterval(this.timerID)
  }

  toggleTimer = () => {
    const {isTimerRunning} = this.state
    if (isTimerRunning) {
      this.clearTimer()
    } else {
      this.timerID = setInterval(this.tick, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  resetTimer = () => {
    this.clearTimer()
    this.setState({isTimerRunning: false, secondsElapsed: 0, timerLimit: 25})
  }

  increaseTimerLimit = () => {
    this.setState(prevState => ({timerLimit: prevState.timerLimit + 1}))
  }

  decreaseTimerLimit = () => {
    const {timerLimit} = this.state
    if (timerLimit > 1) {
      this.setState(prevState => ({timerLimit: prevState.timerLimit - 1}))
    }
  }

  getTime = () => {
    const {secondsElapsed, timerLimit} = this.state

    const remainingSeconds = timerLimit * 60 - secondsElapsed

    const minutes = Math.floor(remainingSeconds / 60)
    const seconds = Math.floor(remainingSeconds % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning, secondsElapsed, timerLimit} = this.state

    const playPauseImg = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const playPauseAlt = isTimerRunning ? 'pause icon' : 'play icon'
    const playPauseText = isTimerRunning ? 'Pause' : 'Start'
    const TimerStatusText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="timer-cont">
          <div className="time">
            <div className="display">
              <h1 className="head">{this.getTime()}</h1>
              <p className="para">{TimerStatusText}</p>
            </div>
          </div>
          <div className="controls">
            <div className="butt-cont">
              <button
                type="button"
                onClick={this.toggleTimer}
                id="play-pause"
                className="butt"
              >
                <img src={playPauseImg} alt={playPauseAlt} className="icon" />
              </button>
              <label htmlFor="play-pause" className="label">
                {playPauseText}
              </label>
              <button
                type="button"
                onClick={this.resetTimer}
                id="reset"
                className="butt"
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="icon"
                />
              </button>
              <label htmlFor="reset" className="label">
                Reset
              </label>
            </div>
            <p className="tl-head">Set Timer limit</p>
            <div className="tl-cont">
              <button
                type="button"
                onClick={this.decreaseTimerLimit}
                disabled={secondsElapsed > 0}
                className="butt"
              >
                -
              </button>
              <p className="tl-para">{timerLimit}</p>
              <button
                type="button"
                onClick={this.increaseTimerLimit}
                disabled={secondsElapsed > 0}
                className="butt"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
