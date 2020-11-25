import patients, { NewPatient } from '../../data/patients';
import { NonSensitiveEntries } from '../../data/patients';
import { Patient }  from '../types';
import { createId } from '../utils';

const getPatients = (): Array<Patient> => {
    return patients;
};

const getNonSensitiveInfoFromPatients = (): NonSensitiveEntries[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (entry: NewPatient): Patient => {
    const newPatientEntry = {
        id: createId(),
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getPatients,
    getNonSensitiveInfoFromPatients,
    addPatient
};