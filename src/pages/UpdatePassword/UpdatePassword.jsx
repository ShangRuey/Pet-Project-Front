export default function UpdatePassword() {
  return (
    <div>
      <h2>Update Password</h2>
      <form>
        <label>
          New Password: <input type="password" name="newPassword" />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
