/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Grid, Button, Divider } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state/state";

import { SelectField, EntryTypeOption } from "../AddEntryModal/EntryFormField";
import { HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, Diagnosis } from "../types";
import { DiagnosisSelection, NumberField, TextField } from "../AddPatientModal/FormField";

export type HospitalEntryFormValues = Omit<HospitalEntry, 'id'>;

export type OccupationalHealthcareEntryFormValues = Omit<OccupationalHealthcareEntry, 'id'>;

export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, 'id'>;

interface Props {
  onSubmit: (values: HospitalEntryFormValues | OccupationalHealthcareEntryFormValues | HealthCheckEntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
    { value: "Hospital", label: "Hospital" },
    { value: "OccupationalHealthcare", label: "OccupationalHealthcare" },
    { value: "HealthCheck", label: "HealthCheck" }
  ];


const validateValues = (values: any) => {

    const requiredError = "Field is required";
    const errors: { [field: string ]: string | {} } = {};

    if (!values.date) {
      errors.date = requiredError;
    }
    if (!values.specialist) {
      errors.specialist = requiredError;
    }
    if (!values.type) {
      errors.type = requiredError;
    }
    if (!values.description) {
      errors.description = requiredError;
    }

    if (values.type === "Hospital") {
        if (!values.discharge.criteria) {
            let dischargeDateValue: string | {} = '';
            if (errors.date) {
                dischargeDateValue = errors.dischargeDateValue;
            }
            errors['discharge'] = { 
                criteria: requiredError,
                date: dischargeDateValue
            };
            errors.criteria = requiredError; 
        }
        if (!values.discharge.date) {
            console.log(errors);
            let criteriaValue: string | {} = '';
            if (errors.criteria) {
                criteriaValue = errors.criteria;
            }

            errors['discharge'] = { 
                date: requiredError,
                criteria: criteriaValue,
            };
        }
        return errors;
    }
    if (values.type === "OccupationalHealthcare") {
      if (!values.employerName) {
          errors.employerName = requiredError; 
      }
      return errors;
    }
    if (values.type === "HealthCheck") {
      if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError; 
      }
      return errors;
    }
    return errors;
};

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        date: "",
        specialist: "",
        type: "Hospital",
        description: "",
        diagnosisCodes: [],
        discharge: {
           date: "",
           criteria: ""
        }
      }}
      onSubmit={onSubmit}
      validate={values => validateValues(values)}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Entry Type"
              name="type"
              options={entryTypeOptions}
            />

           <DefaultEntryForm setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={diagnoses} />

            {values.type === "Hospital" ? (<EntryFormForTypeHospital />) : null}
            {values.type === "OccupationalHealthcare" ? (<EntryFormForOccupationalHealthcare />) : null}
            {values.type === "HealthCheck" ? (<EntryFormForHealthCheck />) : null}

            <Divider></Divider>
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

interface DefaultEntryFormProps {
    setFieldValue: (field: "diagnosisCodes", value: any, shouldValidate?: boolean | undefined) => void;
    setFieldTouched: (field: "diagnosisCodes", isTouched?: boolean | undefined, shouldValidate?: boolean | undefined) => void;
    diagnoses: Diagnosis[];
}

const DefaultEntryForm: React.FC<DefaultEntryFormProps> = ({setFieldValue, setFieldTouched, diagnoses}) => {
  return (
    <div>
            <Field
              label="Date Of Birth"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <DiagnosisSelection
                setFieldValue={setFieldValue}            
                setFieldTouched={setFieldTouched}            
                diagnoses={Object.values(diagnoses)}
            />
    </div>
  );
};

const EntryFormForTypeHospital: React.FC = () => {
    return (
      <div>
              <Field
                label="Date Of Discharge"
                placeholder="YYYY-MM-DD"
                name="discharge.date"
                component={TextField}
              />
              <Field
                label="Criteria Of Discharge"
                placeholder="Criteria"
                name="discharge.criteria"
                component={TextField}
              />
      </div>
    );
};

const EntryFormForOccupationalHealthcare: React.FC = () => {
    return (
      <div>
              <Field
                label="Employer Name"
                placeholder="Employer Name"
                name="employerName"
                component={TextField}
              />
              <Field
                label="Start Of SickLeave"
                placeholder="YYYY-MM-DD"
                name="sickLeave.startDate"
                component={TextField}
              />
              <Field
                label="End Of SickLeave"
                placeholder="YYYY-MM-DD"
                name="sickLeave.endDate"
                component={TextField}
              />
      </div>
    );
};

const EntryFormForHealthCheck: React.FC = () => {
    return (
      <div>
              <Field
                label="Health Check Rating"
                placeholder="Health Check Rating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={4}
              />
      </div>
    );
};

export default AddEntryForm;