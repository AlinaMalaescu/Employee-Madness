const EmployeeForm = ({ onSave, disabled, employee, equipment, onCancel }) => {

const updateEquipment = (equipmentToUpdate) => {

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

    const formEmployee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

  //logic for updating the database
    // const initialEquipment =  equipment.filter(equip => equip.name === employee.equipment[0])[0];
    // const equipmentToUpdate = equipment.filter(equip => equip.name === formEmployee.equipment)[0];

    // !initialEquipment && formEmployee.equipment ? equipmentToUpdate.amount -- && updateEquipment(equipmentToUpdate) : formEmployee.equipment = [];

    // initialEquipment && formEmployee.equipment && equipmentToUpdate.name !== initialEquipment.name?   equipmentToUpdate.amount -- && updateEquipment(equipmentToUpdate) : formEmployee.equipment = [];
    

    return onSave(formEmployee);
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

       <div className="control">
        <label htmlFor="name">Brands:</label>
        <select type="dropdown"
          name="brand"
          id="brand">
            <option></option>
            <option>Acer</option>
            <option>HP</option>
            <option>Razer</option>
          </select>
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
