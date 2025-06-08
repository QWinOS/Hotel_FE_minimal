import { auth } from "@/auth";
import { SignIn, SignOut } from "@/components/sign_in_button";

// const Profile = async () => {
//   const session = await auth();
//   console.log(session?.user);
//   const user = session?.user;
//   return user ? (
//     <div>
//       <h1>Profile</h1>
//       <p>{session?.user?.name}</p>
//       <p>{session?.user?.email}</p>
//       <SignOut />
//     </div>
//   ) : (
//     <div>
//       <h1>Profile</h1>
//       <p>Not logged in</p>
//       <SignIn />
//     </div>
//   );
// };
const Profile = async () => {
  return <>Error</>;
};
export default Profile;
