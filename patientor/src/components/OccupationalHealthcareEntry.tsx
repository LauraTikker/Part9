import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import { useStateValue } from "../state/state";
import { Icon } from "semantic-ui-react";

export interface EntryProps {
    entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareEntryComponent: React.FC<EntryProps> = (props) => {
    const [{ diagnoses},] = useStateValue();
    const entry = props.entry;

  return (
    <div >
    <h2>{entry.date}
    <Icon className="user doctor" size="big"></Icon>
    </h2>
    <p>{entry.description}</p>
    <p>Specialist: {entry.specialist}</p>
    <p>Employer name: {entry.employerName}</p>
    {entry.sickLeave ? (
        <p>Sickleave: {`${entry.sickLeave.startDate} - ${entry.sickLeave.endDate}`} </p>
    ): null}

      {entry.diagnosisCodes ? (
      <div className="entries-diagnosis-code">
            {entry.diagnosisCodes.map(code => {
            const diagnosis = Object.values(diagnoses).find(diagnosis => diagnosis.code === code);

        return  (<li key={code}>{code} {diagnosis?.name}</li>);
        })}
    </div>) 
    : null}

    </div>
  );
};

export default OccupationalHealthcareEntryComponent;