export function GetRequestsForm({ queryType, setQueryType }) {
  return (
    <form id="form-get-requests">
      <select
        name="select"
        value={queryType}
        onChange={(e) => {
          setQueryType(e.target.value);
        }}
      >
        <option value="true">Resolved</option>
        <option value="false">Unresolved</option>
      </select>
    </form>
  );
}
