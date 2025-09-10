import { FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";

const LeadItem = ({ lead, onDelete, onEdit }) => {
  return (
    <tr>
      <td>
        {lead.name || lead.firstName + ' ' + lead.lastName}
      </td>
      <td>{lead.email}</td>
      <td>{lead.phone}</td>
      <td>{lead.createdAt}</td>
      <td>
        <span className={`badge status-${(lead.leadStatus || lead.status || '').toLowerCase().replace(" ", "")}`}>{lead.leadStatus || lead.status}</span>
      </td>
      <td>
        <FaPen
          className="text-primary me-2"
          style={{ cursor: 'pointer' }}
          onClick={() => onEdit && onEdit(lead)}
        />
        <Link to={`/leads/${lead.id}`} title="View Lead">
          <button className="btn btn-sm btn-outline-primary text-primary" type="button">View</button>
        </Link>
      </td>
    </tr>
  );
};

export default LeadItem;
