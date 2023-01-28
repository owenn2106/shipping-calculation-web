import { useEffect } from "react";
import { Card, Skeleton } from "antd";
import CardTitle from "../../components/supplier/card-title";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import actions from "redux/supplier/actions";
import SupplierTable from "components/supplier/supplier-table";

const Supplier = () => {
  const dispatch = useAppDispatch();
  const [suppliers, loadingSupplier] = useAppSelector((state) => [
    state.supplier.suppliers,
    state.supplier.loadingSupplier,
  ]);

  useEffect(() => {
    dispatch({
      type: actions.GET_SUPPLIER,
    });

    return () => {
      dispatch({
        type: actions.SET_STATE,
        payload: {
          alert: null,
        },
      });
    };
  }, [dispatch]);

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
      >
        {!loadingSupplier ? (
          <SupplierTable
            originData={suppliers.map((datum, idx) => ({ ...datum, key: idx }))}
          />
        ) : (
          <Skeleton />
        )}
      </Card>
    </div>
  );
};

export default Supplier;
