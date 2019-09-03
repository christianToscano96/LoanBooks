import React from 'react';

const SubscriberTab = ({subscriber}) => {
    return (
        <div className="card my-3">
            <h3 className="card-header bg-card text-center text-whithe">Applicant Information</h3>

            <div className="card-body">
                <p className="font-weight-bold">Name: {''}
                    <span className="font-weight-normal text-black">{subscriber.name} {subscriber.surname}</span>
                </p>
                <p className="font-weight-bold">Code: {''}
                    <span className="font-weight-normal text-black">{subscriber.code}</span>
                </p>
                <p className="font-weight-bold">Career: {''}
                    <span className="font-weight-normal text-black">{subscriber.career}</span>
                </p>
            </div>
        </div>

    );
}
 
export default SubscriberTab;