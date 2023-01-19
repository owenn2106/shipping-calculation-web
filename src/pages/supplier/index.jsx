// import { useEffect } from "react";
import { Card } from "antd";
import CardTitle from "../../components/supplier/card-title";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../services/firebase";

const Supplier = () => {
  // const getSuppliers = async () => {
  //   const querySnapshot = await getDocs(collection(db, "suppliers"));
  //   querySnapshot.forEach((doc) => {
  //     console.log(`${doc.id} => ${doc.data()}`);
  //   });
  // };

  // useEffect(() => {
  //   getSuppliers();
  // }, []);

  return (
    <div>
      <h1 style={{ marginBottom: 30 }}>Supplier</h1>
      <Card
        title={<CardTitle />}
        bordered={false}
        style={{
          width: "100%",
          minHeight: "70vh",
        }}
      ></Card>
    </div>
  );
};

export default Supplier;
