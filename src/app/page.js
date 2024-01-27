import GoogleAuthButton from "./components/GoogleAuthButton";
import SnippetContainer from "./components/SnippetContainer";
import "./page.css";

export default function Home() {
  return (
    <main>
      <GoogleAuthButton />
      <div>
        <SnippetContainer />
      </div>
    </main>
  );
}
