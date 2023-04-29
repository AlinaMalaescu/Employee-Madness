import { useEffect, useState } from "react";
// import {useAtom} from "jotai"
// import state from "./Atom"
import Loading from "../Components/Loading";
import EquipmentTable from "../Components/EquipmentTable/EquipmentTable";

const fetchEquipment = () => {
  return fetch("/api/equipment").then((res) => res.json());
};

const deleteEquipment = (id) => {
  return fetch(`/api/equipment/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EquipmentList = () => {
  const [loading, setLoading] = useState(true);
  const [equipment, setEquipment] = useState(null);

  const handleDelete = (id) => {
    deleteEquipment(id);

    setEquipment((equipment) => {
      return equipment.filter((equipment) => equipment._id !== id);
    });
  };

  useEffect(() => {
    fetchEquipment()
      .then((equipment) => {
        console.log(equipment)
        setLoading(false);
        setEquipment(equipment);
      })
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
  <EquipmentTable equipment={equipment} onDelete={handleDelete} />
  )
};

export default EquipmentList;