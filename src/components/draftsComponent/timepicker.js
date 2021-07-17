import { useState } from "react";
import { timeGenerator } from "./drafts.service";

function TimePickerList({ hideTimePicker, liClickHandler, time }) {
  return (
    <div
      className={`timepicker-time-list-wrapper ${
        hideTimePicker ? "d-none" : ""
      }`}
    >
      {/* Time picker's list of times with 30 minutes offset */}

      <ul>
        {timeGenerator().map((el, index) => (
          <li
            className={time === el ? "selected-time-draft" : null}
            key={index}
            onClick={() => {
              liClickHandler(el);
            }}
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TimePickerComponent({ selectedTime, onChange }) {
  const [time, setTime] = useState(selectedTime ? selectedTime : "");
  const [hideTimePicker, setHideTimePicker] = useState(false);
  const timeChangeHandler = () => {
    // TODO: do an element.indexOf and scroll the li
  };
  const liClickHandler = (el) => {
    setTime(el);
    setHideTimePicker(true);
    onChange(el);
  };
  return (
    <>
      <input
        className="timepicker-input-draft"
        type="text"
        name="time"
        value={time}
        onClick={() => {
          setHideTimePicker(false);
        }}
        onChange={() => timeChangeHandler()}
        placeholder="Time"
      ></input>

      <TimePickerList
        hideTimePicker={hideTimePicker}
        liClickHandler={liClickHandler}
        time={time}
      />
    </>
  );
}

export default TimePickerComponent;
