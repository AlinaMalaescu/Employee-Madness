const EmployeeForm = ({ onSave, disabled, employee, equipment, onCancel }) => {

const updateEquipment = (equipmentList, name) => {

  const equipmentToUpdate =  equipmentList.filter(equipment => equipment.name === name)[0];
  console.log(equipmentToUpdate);
  equipmentToUpdate.amount--;

    return fetch(`/api/equipment/${equipmentToUpdate._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(equipmentToUpdate),
    }).then((res) => res.json());
  };


  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    updateEquipment(equipment, employee.equipment);
    return onSave(employee);
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={employee ? employee.name : null}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          defaultValue={employee ? employee.level : null}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
        />
      </div>

      {equipment && <div className="control">
        <label htmlFor="position">Equipment:</label>
        <select type="dropdown"
          name="equipment"
          id="equipment">
            <option></option>
            {equipment.map(equipment => (equipment.amount > 0?
              <option key={equipment.name}>{equipment.name}</option> : null
            ))}
          </select>
      </div>}

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
