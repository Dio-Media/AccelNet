// src/components/ParticipantCard.jsx
import React from 'react';
import { BsLinkedIn, BsGoogle, BsOrcid } from 'react-icons/bs';

const ParticipantCard = ({ participant }) => {
  const { name, institution, title, department, linkedIn, orcid, googleScholar } = participant;

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">

      {/* Info */}
      <div className="flex-1">
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-gray-600">{institution}</p>
        {title && <p className="text-green-700">{title}</p>}
        {department && <p className="text-gray-500">{department}</p>}

        {/* Social links – conditional */}
        <div className="flex gap-2 mt-2">
          {linkedIn && (
            <a href={linkedIn} target="_blank" rel="noreferrer">
              <BsLinkedIn size={20} color="0077b5" />
            </a>
          )}
          {orcid && (
            <a href={orcid} target="_blank" rel="noreferrer">
              <BsOrcid size={20} color="0077b5" />
            </a>
          )}
          {googleScholar && (
            <a href={googleScholar} target="_blank" rel="noreferrer">
              <BsGoogle size={20} color="0077b5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParticipantCard;