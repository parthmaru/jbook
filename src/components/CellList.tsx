import "./CellList.css";
import React, { Fragment } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import AddCell from "./AddCell";
import CellListItem from "./CellListItem";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cellsReducer: { order, data } }) => {
    return order.map((id) => {
      return data[id];
    });
  });

  const renderCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell prevCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} prevCellId={null} />
      {renderCells}
    </div>
  );
};

export default CellList;
