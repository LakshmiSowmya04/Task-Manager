import NotFound from "../assets/not-found.png";
export default function Notfound() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <img src={NotFound} alt="Not Found" className="w-[200px] aspect-square pointer-events-none" />
    </div>
  );
}
