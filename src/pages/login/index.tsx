import { useEffect } from "react";
import logoImg from "../../assets/logo.svg";
import { Container } from "../../components/container";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { auth } from "../../services/firebaseConnection"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import toast from "react-hot-toast";

const schema = z.object({
  email: z
    .string()
    .email("Insira um email válido")
    .nonempty("O campo email é obrigatório"),
  password: z.string().nonempty("O campo senha é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(()=> {
    async function handleLogout(){
      await signOut(auth)
    }
      
    handleLogout();
  }, [])

  async function onsubmit(data: FormData) {
   signInWithEmailAndPassword(auth, data.email, data.password)
    .then((user) => {
      console.log("Usuario logado...")
      toast.success('Logado com sucesso!')
      console.log(user)
      navigate("/dashboard", {replace: true})
    })
    .catch((error) => {
      console.log("Erro ao logar")
      console.log(error)
      toast.error("Email ou senha invalida!")
    })

  }

  return (
    <Container>
      <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
        <Link className="mb-6 max-w-sm w-full" to="/">
          <img src={logoImg} alt="Logo do site" className="w-full" />
        </Link>

        <form
          className="bg-white max-w-xl w-full rounded-lg p-4"
          onSubmit={handleSubmit(onsubmit)}
        >
          <div className="mb-3 ">
            <Input
              type="email"
              placeholder="Digite seu email..."
              name="email"
              error={errors.email?.message}
              register={register}
            />
          </div>

          <div className="mb-3 ">
            <Input
              type="password"
              placeholder="Digite sua senha..."
              name="password"
              error={errors.password?.message}
              register={register}
            />
          </div>

          <button type="submit" className="bg-zinc-900 w-full rounded-md text-white h-10 font-medium">Acessar</button>
        </form>

        <Link to="/register">
        <p className="hover:text-blue-700">Ainda não possui uma conta? Cadastre-se</p>
        </Link>

      </div>
    </Container>
  );
}
