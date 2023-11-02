import Link from "next/link";

function Error({ error }) {
  return (
    <div className="mt-8 text-center font-bold text-xl">
      {error ? (
        error
      ) : (
        <p>There was some unexpected error happened. Please start app over</p>
      )}
      <Link
        className="text-blue-300 hover:text-blue-400 duration-300 transition underline-offset-1"
        href="/"
      >
        Click Here
      </Link>
    </div>
  );
}

export default Error;
