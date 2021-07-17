import { useDispatch } from "react-redux";
import {
  addNewTask,
  deleteDraftTask,
  deleteTask,
  updateTask,
} from "../../store/store-helper/appActions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import "./drafts.css";
import { useForm, Controller } from "react-hook-form";
import AssignUser from "./assignedUser";
import TimePickerComponent from "./timepicker";
import { getAddData, getEditData } from "./drafts.service";

function DatePickerComponent({ date, onChange }) {
  const dateArr = date
    ? date.split("/")
    : [new Date().getDate(), new Date().getMonth(), new Date().getFullYear()];
  const [selectedDate, setSelectedDate] = useState(
    date
      ? new Date(Number(dateArr[2]), Number(dateArr[1]) - 1, Number(dateArr[0]))
      : new Date()
  );
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => {
        setSelectedDate(date);
        onChange(date);
      }}
      name="date"
      dateFormat="dd/MM/yyyy"
      calendarClassName="draft-task-calendar"
      showMonthDropdown
      showYearDropdown
      scrollableMonthYearDropdown
    ></DatePicker>
  );
}

function NewTask(props) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [description, setDescription] = useState(props.task.description);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        if (props.isEdit) {
          dispatch(updateTask({ ...props.task, ...getEditData(data) }));
          props.setEdit(false);
        } else {
          dispatch(
            addNewTask({
              ...data,
              completed: false,
              id: props.task.id,
              ...getAddData(data),
            })
          );

          dispatch(deleteDraftTask(props.task.id));
        }
      })}
    >
      <div className="task-single-unit">
        <div className="tasks-data">
          <div className="task-description">
            {/* Task Description */}
            <label>
              <span className={errors?.description && "description-error"}>
                Task Description
              </span>
              <input
                name="description"
                type="text"
                {...register("description", { required: "Required" })}
                placeholder="Description of task"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              {errors.description ? (
                <div className="description-error">Required</div>
              ) : null}
            </label>
          </div>

          {/* Date Picker */}
          <div className="date-time-draft">
            <div className="datePicker-draft">
              <span className="form-texts">Date</span>
              <Controller
                control={control}
                name="date"
                defaultValue={
                  props.task.date ? props.task.date : new Date().toISOString()
                }
                render={({ field }) => (
                  <DatePickerComponent
                    control={control}
                    date={props.task.date}
                    onChange={(val) => {
                      field.onChange(
                        `${val.getDate()}/${val.getMonth()}/${val.getFullYear()}`
                      );
                    }}
                  />
                )}
              ></Controller>
            </div>

            {/* Time Picker */}
            <div className="timePicker-draft">
              <span className="form-texts"> Time </span>
              <Controller
                control={control}
                name="time"
                defaultValue={props.task.time}
                render={({ field }) => (
                  <TimePickerComponent
                    selectedTime={props.task.time}
                    onChange={(val) => field.onChange(val)}
                  />
                )}
              ></Controller>
            </div>
          </div>

          {/* Assigned Users */}
          <div className="assign-user-draft">
            <Controller
              control={control}
              name="assignUsers"
              defaultValue={
                props.isEdit ? props.task.assignUsers : props.assignUsers?.[0]
              }
              render={({ field }) => (
                <AssignUser
                  user={
                    props.task?.assignUsers
                      ? props.task.assignUsers
                      : props.user
                  }
                  assignUsers={props.assignUsers}
                  onChange={(val) => field.onChange(val)}
                />
              )}
            ></Controller>
          </div>
        </div>

        {/* Submit, cancel, delete */}
        <div className="tasks-footer-wrapper">
          <div className="tasks-footer">
            {props.isEdit ? (
              <div className="delete-btn-wrapper">
                <button
                  onClick={() => {
                    dispatch(deleteTask(props.task));
                  }}
                  className="delete-btn-draft"
                ></button>
              </div>
            ) : null}
            <button
              className="cancel-btn-draft"
              onClick={() => {
                props.isEdit
                  ? props.setEdit(false)
                  : dispatch(deleteDraftTask(props.task.id));
              }}
            >
              Cancel
            </button>
            <button type="submit" className="save-btn-draft">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default NewTask;
