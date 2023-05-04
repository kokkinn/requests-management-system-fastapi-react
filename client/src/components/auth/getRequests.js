function GetRequests() {
  return (
    <form id="form-get-requests">
      <select name="select">
        <option value="true">Resolved</option>
        <option value="false">Unresolved</option>
      </select>
      <input type="submit" value="Get requests" />
    </form>
  );
}
