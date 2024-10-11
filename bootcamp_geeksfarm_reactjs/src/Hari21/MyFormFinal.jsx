import React from "react";
import { Form, Field } from "react-final-form";
import StyledForm from "./Styles";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2)); // Menampilkan nilai form saat di-submit
};

const MyFormFinal = () => (
  <StyledForm>
    <h1>React Final Form - Custom Form</h1>
    <Form
      onSubmit={onSubmit}
      initialValues={{ employed: false, technology: "Frontend" }} // Nilai awal
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div>
            <label>First Name</label>
            <Field
              name="firstName"
              component="input"
              type="text"
              placeholder="First Name"
            />
          </div>

          {/* Last Name */}
          <div>
            <label>Last Name</label>
            <Field
              name="lastName"
              component="input"
              type="text"
              placeholder="Last Name"
            />
          </div>

          {/* Employed */}
          <div>
            <label>Employed</label>
            <Field name="employed" component="input" type="checkbox" />
          </div>

          {/* Expertise (Checkboxes) */}
          <div>
            <label>Expertise</label>
            <div>
              <label>
                <Field
                  name="expertise"
                  component="input"
                  type="checkbox"
                  value="HTML"
                />{" "}
                HTML
              </label>
              <label>
                <Field
                  name="expertise"
                  component="input"
                  type="checkbox"
                  value="CSS"
                />{" "}
                CSS
              </label>
              <label>
                <Field
                  name="expertise"
                  component="input"
                  type="checkbox"
                  value="JavaScript"
                />{" "}
                JavaScript
              </label>
              <label>
                <Field
                  name="expertise"
                  component="input"
                  type="checkbox"
                  value="NodeJS"
                />{" "}
                NodeJS
              </label>
              <label>
                <Field
                  name="expertise"
                  component="input"
                  type="checkbox"
                  value="ReactJS"
                />{" "}
                ReactJS
              </label>
            </div>
          </div>

          {/* Technology (Radio buttons) */}
          <div>
            <label>Technology</label>
            <div>
              <label>
                <Field
                  name="technology"
                  component="input"
                  type="radio"
                  value="Frontend"
                />{" "}
                Frontend
              </label>
              <label>
                <Field
                  name="technology"
                  component="input"
                  type="radio"
                  value="Backend"
                />{" "}
                Backend
              </label>
              <label>
                <Field
                  name="technology"
                  component="input"
                  type="radio"
                  value="Fullstack"
                />{" "}
                Fullstack
              </label>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label>Notes</label>
            <Field name="notes" component="textarea" placeholder="Notes" />
          </div>

          {/* Buttons */}
          <div className="buttons">
            <button type="submit" disabled={submitting || pristine}>
              Submit
            </button>
            <button
              type="button"
              onClick={form.reset}
              disabled={submitting || pristine}
            >
              Reset
            </button>
          </div>

          {/* Display the form values as JSON */}
          <pre>{JSON.stringify(values, 0, 2)}</pre>
        </form>
      )}
    />
  </StyledForm>
);

export default MyFormFinal;
