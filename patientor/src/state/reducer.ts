import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient;
  }
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  }
  ;

export const getPatientList = (patientList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const updatePatient = (patient: Patient): Action => {
  return {
    type: "UPDATE_PATIENT",
    payload: patient

  };
};

export const getDiagnosisList = (diagnosisList: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosisList
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      case "UPDATE_PATIENT":
        return {
          ...state,
          patients: {
            ...state.patients,
            [action.payload.id]: action.payload
          }
        };
      case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload
        }
      };
    default:
      return state;
  }
};
