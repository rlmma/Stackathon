import React, {Component} from 'react'
import PropTypes from 'prop-types'
import SpeechRecognition from 'react-speech-recognition'
import {connect} from 'react-redux'
import {addLocation} from '../store/location'

function roundNumber(rnum, rlength) {
  var newnumber =
    Math.round(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength)
  return newnumber
}

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
}

class Dictaphone extends Component {
  save = transcript => {
    console.log('wwwwwwww', transcript)
    const lat = this.props.marker.lat
    const lng = this.props.marker.lng
    const obj = {
      message: transcript,
      latitude: roundNumber(lat, 6),
      longitude: roundNumber(lng, 6)
    }
    this.props.addLocation(obj, this.props.userId)
  }

  render() {
    const {
      transcript,
      resetTranscript,
      browserSupportsSpeechRecognition,
      startListening,
      stopListening
    } = this.props

    if (!browserSupportsSpeechRecognition) {
      return null
    }

    console.log('transcript', this.props)

    return (
      <div>
        <button type="submit" onClick={resetTranscript}>
          Reset
        </button>
        <button type="submit" onClick={startListening}>
          Start
        </button>
        <button type="submit" onClick={stopListening}>
          Stop
        </button>
        <span>{transcript}</span>
        <button type="submit" onClick={() => this.save(transcript)}>
          Save
        </button>
      </div>
    )
  }
}

Dictaphone.propTypes = propTypes

const options = {
  autoStart: false
}

const mapState = state => {
  return {
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    addLocation: (obj, userId) => dispatch(addLocation(obj, userId))
  }
}

export default connect(mapState, mapDispatch)(
  SpeechRecognition(options)(Dictaphone)
)
