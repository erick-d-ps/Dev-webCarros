import { Container } from "../../components/container";

export function Home() {
  return (
    <Container>
      <section className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2">
        <input
          type="text"
          className="w-full border-2 rounded-lg h-9 px-3 border-gray-400 outline-none"
          placeholder="Digite o nome do carro..."
        />
        <button className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium text-lg">
          Buscar
        </button>
      </section>

      <h1 className=" text-center flex justify-center items-center text-2xl font-bold mt-6 mb-4">
        Carros novos e usados em todo o Brasil
      </h1>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

        <section className="w-full bg-white rounded-lg">
          <img
            className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
            src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202501/20250107/volkswagen-jetta-1.4-250-tsi-total-flex-rline-tiptronic-wmimagem16300887596.jpg?s=fill&w=552&h=414&q=60"
            alt="Carro"
          />
          <p className="font-bold mt-1 mb-2 px-2">Volkswagen Jetta</p>

          <div className="flex flex-col px-2">
            <span className="text-zinc-700 mb-6">
              Ano 2023/2023 | 50.000 Km
            </span>
            <strong className="text-black font-medium text-xl">
              R$ 102.000
            </strong>
          </div>

          <div className="w-full h-px bg-slate-300 my-2"></div>

          <div className="px-2 pb-2">
            <span className="text-zinc-900 ">Paranaíba MS</span>
          </div>
        </section>

      </main>
    </Container>
  );
}
