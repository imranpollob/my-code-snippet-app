import GoogleAuthButton from "./components/GoogleAuthButton";
import SnippetsComponent from "./components/SnippetsComponent";
import "./page.css";

export default function Home() {
  return (
    <main>
      <GoogleAuthButton />
      <div>
        <p>Hi...</p>
        <SnippetsComponent />
      </div>
    </main>
  );
}
