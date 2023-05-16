import { DATE_SORT_TYPES } from "../../constants";

export function GetRequestsForm({
  queryType,
  setQueryType,
  dateSort,
  setDateSort,
  limitInp,
  setLimitPar,
  setLimitInp,
}) {
  return (
    <form id="form-get-requests">
      <select
        name="select2"
        value={dateSort}
        onChange={(e) => {
          setDateSort(e.target.value);
        }}
      >
        <option value={DATE_SORT_TYPES.otn}>Old to new</option>
        <option value={DATE_SORT_TYPES.nto}>New to old</option>
      </select>
      <select
        name="select1"
        value={queryType}
        onChange={(e) => {
          setQueryType(e.target.value);
        }}
      >
        <option value="true">Resolved</option>
        <option value="false">Unresolved</option>
        <option value="">All</option>
      </select>
      <input
        placeholder="Limit"
        type="number"
        name="limit"
        value={limitInp}
        onChange={(e) => {
          if (
            (e.target.value > 0 && e.target.value < 20) ||
            e.target.value === ""
          ) {
            setLimitInp(e.target.value);
            if (e.target.value !== "") {
              setLimitPar(e.target.value);
            }
          }
        }}
      />
    </form>
  );
}
