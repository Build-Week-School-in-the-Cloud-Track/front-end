import React, { useEffect } from "react";
import { getVolunteers } from "../actions";
import { connect } from "react-redux";
import { StyledVolunteers } from "../StyledComponents/StyledVolunteers";

function VolunteerList(props) {
  const fetchVolunteers = () => {
    props.getVolunteers();
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  return (
    <StyledVolunteers>
      {props.isFetchingVolunteers && <p>Getting list of volunteers...</p>}
      {props.volunteers.map(volunteer => {
        return (
          <div className="volunteer" key={volunteer.id}>
            <h3>{volunteer.name}</h3>
            <p>Email: {volunteer.email}</p>
            <p>Availability: </p>
            <table>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                </tr>
              </thead>
              <tbody>
                {volunteer.availability.map(item => {
                  return (
                    <tr key={item.id}>
                      <td>{item.day}</td>
                      <td>{item.time_start}</td>
                      <td>{item.time_end}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </StyledVolunteers>
  );
}

const mapStateToProps = state => {
  return {
    volunteers: state.volunteers,
    isFetchingVolunteers: state.isFetchingVolunteers,
    error: state.error,
  };
};

export default connect(mapStateToProps, { getVolunteers })(VolunteerList);
