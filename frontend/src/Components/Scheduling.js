import React, { useState } from 'react';
import '../SCSS/scheduling.css';
import Status from './Status';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';  // import useSelector from react-redux
import { addUserToScheduling } from '../store/scheduling';
const Scheduling = (props) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.session.user);
  const userId = user?.user?.id;

  const [matchRequest, setMatchRequest] = useState(false);
  const [matchRequestResult, setMatchRequestResult] = useState(false);

  const generateTimeSlots = () => {
    let slots = [];
    for (let i = 11; i <= 14; i++) {
      for (let j = 0; j < 60; j += 30) {
        if (i === 14 && j > 0) break; // Avoid adding 14:30
        const hour = String(i).padStart(2, '0');
        const minute = String(j).padStart(2, '0');
        slots.push(`${hour}:${minute}`);
      }
    }
    return slots;
  };

  const featureSoon = () => {
    //Demo mode until Backend is applied
    setMatchRequest(true);
    const timer = setTimeout(() => {
      setMatchRequestResult(true);
      clearTimeout(timer); // Clear the timer after execution
    }, 4789); // 10 seconds or 10,000 milliseconds
  };

  const sendSchedulingData = () => {
    dispatch(addUserToScheduling(userId))
  }
  return (
    <>
      <div className="scheduling-header scheduling-container">
        Fancy having lunch together with interesting people?
      </div>
      {matchRequest && <Status 
      timeSlot={props.timeSlot}
      isScheduled={
        matchRequestResult
      } />}

      {matchRequestResult ? null :
        <div className="scheduling-container">
          <div className="time-dropdown-guests-slider">
            <div className="time-dropdown">
              <div>
                <strong>Time Slot:</strong>
                <select
                  value={props.timeSlot}
                  onChange={(e) =>
                    props.onTimeSlotChange(e.target.value)
                  }
                >
                  {generateTimeSlots().map((slot, index) => (
                    <option key={index} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="view-all-container">
              <button className="view-all-button" onClick={featureSoon}>Request match</button>
            </div>
            {/* <div className="guests-slider">
                        <div className="slider">
                            <strong>Group Size:</strong>
                            <input
                                type="range"
                                min="2"
                                max="4"
                                value={props.groupSize}
                                onChange={(e) =>
                                    props.onGroupSizeChange(e.target.value)
                                }
                            />
                            {props.groupSize} Persons
                        </div>
                    </div> */}
          </div>
          {/* <div className="actions-container">
                    <div className="quick-actions">
                        <button className="view-all-button" onClick={sendSchedulingData}>Randomize</button>
                        <p>Use default settings for a quick match.</p>
                    </div>
                    <div className="advanced-actions">
                        <button className="view-all-button" onClick={featureSoon}>
                            Customize
                        </button>
                        <p>Adjust settings to find your perfect match.</p>
                    </div>
                </div>
                <div className="view-all-container">
                    <button className="view-all-button">View All Matches</button>
                </div> */}
        </div>
      }
    </>
  );
};
export default Scheduling;
