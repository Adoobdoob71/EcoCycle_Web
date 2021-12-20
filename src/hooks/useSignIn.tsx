import { useContext } from "react"
import {
  GoogleAuthProvider,
  signInWithRedirect,
  GithubAuthProvider,
} from "firebase/auth"
import { AuthContext } from "../context/auth"

function useSignIn() {
  const { auth } = useContext(AuthContext)
  const googleProvider = new GoogleAuthProvider()
  const githubProvider = new GithubAuthProvider()
  googleProvider.addScope("https://www.googleapis.com/auth/userinfo.email")
  githubProvider.addScope("user:email")

  const signInGoogle = async () => {
    try {
      signInWithRedirect(auth, googleProvider)
    } catch (error) {
      console.error(error)
    }
  }

  const signInGithub = async () => {
    try {
      signInWithRedirect(auth, githubProvider)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    auth,
    googleProvider,
    githubProvider,
    signInGoogle,
    signInGithub,
  }
}

export { useSignIn }
