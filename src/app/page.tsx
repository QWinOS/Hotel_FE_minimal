import Image from "next/image";
import Home2 from "./home/page";
import SwitchMode from "@/components/switch";
// import { ApolloClient, ApolloProvider } from "@apollo/client";
// import client from "@/lib/apollo";
// import Navbar from "@/components/navbar";
// import client from "../../apollo-client";

export default function Home() {
  return (
    <div>
      {/* <SwitchMode /> */}
      <Home2 />
      {/* </ApolloProvider> */}
    </div>
  );
}
