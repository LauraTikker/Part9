import React from "react";
import { HospitalEntry } from "../types";
import { useStateValue } from "../state/state";
import { Icon } from "semantic-ui-react";

export interface EntryProps {
    entry: HospitalEntry;
}

const HospitalEntryComponent: React.FC<EntryProps> = (props) => {
    const [{ diagnoses},] = useStateValue();
    const entry = props.entry;
  return (
    <div >
    <h2>{entry.date}
    <Icon className="hospital outline" size="big"></Icon>
    </h2>
    <p>{entry.description}</p>
    <p>Specialist: {entry.specialist}</p>
    {entry.discharge ? (
        <p>Discharge: {`${entry.discharge.date}: ${entry.discharge.criteria}`} </p>
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

export default HospitalEntryComponent;