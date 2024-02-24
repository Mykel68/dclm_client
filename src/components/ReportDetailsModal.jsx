import React from 'react';

const ReportDetailsModal = ({ report, onClose }) => {
  return (
    <div className="modal fade" id="reportDetailsModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Report Details</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div>
              <strong>Date:</strong> {report.date}
            </div>
            <div>
              <strong>Service:</strong> {report.serviceType}
            </div>
            <div>
              <strong>Section:</strong> {report.section}
            </div>
            <div>
              <strong>Supervisor:</strong> {report.supervisor}
            </div>
            <div>
              <strong>Personnel Count:</strong> {report.personnelCount}
            </div>
            <div>
              <strong>Volunteer's Count:</strong> {report.volunteersCount}
            </div>
            <div>
              <strong>Challenges:</strong> {report.challenges}
            </div>
            <div>
              <strong>Solution:</strong> {report.solution}
            </div>
            <div>
              <strong>Faulty Equipment:</strong> {report.equipmentDetails}
            </div>
            <div>
              <strong>Remark:</strong> {report.remarks}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportDetailsModal;
