import { Link } from "react-router-dom";

export default function LoggedOut() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div
        className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-400 dark:text-black"
        role="alert"
      >
        <span className="font-medium">Warning!</span> You are not logged in,
        please <Link className="underline" to={"/login"}>login</Link>
      </div>
    </div>
  );
}
