import { ChangeEvent, useState, useContext } from "react";
import { Container } from "../../../components/container";
import { DashboardHeader } from "../../../components/panelHeader";

import { FiUpload, FiTrash } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {AuthContext} from "../../../contexts/AlthContext"
import { v4 as uuidv4} from "uuid"

import { storage, db } from "../../../services/firebaseConnection"
import {ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { addDoc, collection } from "firebase/firestore"

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  model: z.string().nonempty("O modelo é obrigatório"),
  year: z.string().nonempty("O Ano do carro é obrigatório"),
  km: z.string().nonempty("O km do carro é obrigatório"),
  price: z.string().nonempty("Opreço do carro é obrigatório"),
  city: z.string().nonempty("A cidade é obrigatória"),
  whatsapp: z
    .string()
    .min(1, "O telefone é obrigatorio")
    .refine((value) => /^(\d{11,12})$/.test(value), {
      message: "Numero de telefone invalido.",
    }),
  description: z.string().min(5, "A descrição é obrigatoria"),
});

type FormData = z.infer<typeof schema>;

interface ImageItemProps{
  uid: string;
  name: string;
  previewUrl: string;
  url: string;
}

export function New() {
  const {user} = useContext(AuthContext);
  const {register, handleSubmit, formState: { errors }, reset,} = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const [carImages, setCarImages] = useState<ImageItemProps[]>([])

  async function handleFile(e: ChangeEvent<HTMLInputElement>){
    if(e.target.files && e.target.files[0]){
      const image = e.target.files[0]

      if(image.type === 'image/jpeg' || image.type === 'image/png'){
        await handleUpload(image)
      }else{
        alert("Envie ume imagem jpeg ou png")
        return
      }
    }
  }

  async function handleUpload(image: File){
    if(!user?.uid){
      return;
    }

    const currentUid = user?.uid;
    const uidImage = uuidv4();

    const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`)

    uploadBytes(uploadRef, image)
    .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadUrl) => {
          const imageItem ={
            name: uidImage,
            uid: currentUid,
            previewUrl: URL.createObjectURL(image),
            url: downloadUrl,
          }

          setCarImages((imagem) => [...imagem, imageItem] );

        })
    })

  }

  function onSubmit(data: FormData) {

    if(carImages.length === 0){
      alert("Envie alguma imagem desse carro!")
      return;
    }

    const carListImage = carImages.map(car => {
      return{
        uid: car.uid,
        name: car.name,
        url: car.uid
      }
    })

    addDoc(collection(db, "cars"), {
      name: data.name,
      model: data.model,
      whatsapp: data.whatsapp,
      city: data.city,
      year: data.year,
      km: data.km,
      price: data.price,
      description: data.description,
      created: new Date(),
      awner: user?.name,
      uid: user?.uid,
      image: carListImage
    })
    .then(() => {
      reset();
      setCarImages([]);
      console.log("Cadastrado com sucesso!!")
    })
    .catch((error) => {
      console.log(error)
      console.log("Erro ao cadastrar no banco!")
    })
  }

  async function hendleDeleteImage(item: ImageItemProps){
    const imagePath = `images/${item.uid}/${item.name}`

    const imageFef = ref(storage, imagePath);

    try{
      await deleteObject(imageFef)
      setCarImages(carImages.filter((car) => car.url !== item.url))
    }catch(err){
      console.log("Erro ao deletar")
    }

  }

  return (
    <Container>
      <DashboardHeader />

      <div className="w-full bg-white p-3 flex flex-col sm:flex-row items-center gap-2 ">
        <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48 ">
          <div className="absolute cursor-pointer">
            <FiUpload size={30} color="#000" />
          </div>
          <div className="cursor-pointer">
            <input
              className="opacity-0 cursor-pointer"
              type="file"
              accept="image/*"
              onChange={handleFile}
            />

          </div>
        </button>

            {carImages.map(item =>(
              <div key={item.name} className="w-full h-32 flex items-center justify-center relative">
                <button className="absolute" onClick={() => hendleDeleteImage(item)}>
                  <FiTrash size={28} color="#fff"/>
                </button>
                <img 
                src={item.previewUrl} 
                className="rounded-lg w-full h-32 object-cover"
                alt="Foto do carro" 
                />
              </div>
            ))}
      </div>

      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <p className="mb-2 font-medium">Nome do carro</p>
            <Input
              type="text"
              register={register}
              name="name"
              error={errors.name?.message}
              placeholder="EX: Goll 1.0..."
            />
          </div>

          <div className="mb-3">
            <p className="mb-2 font-medium">Modelo do carro</p>
            <Input
              type="text"
              register={register}
              name="model"
              error={errors.model?.message}
              placeholder="EX: 1.0 flex manual..."
            />
          </div>

          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="w-full">
              <p className="mb-2 font-medium">Ano</p>
              <Input
                type="text"
                register={register}
                name="year"
                error={errors.year?.message}
                placeholder="EX: 2021/2021..."
              />
            </div>

            <div className="w-full">
              <p className="mb-2 font-medium">Km rodado</p>
              <Input
                type="text"
                register={register}
                name="km"
                error={errors.km?.message}
                placeholder="EX: 21.000..."
              />
            </div>
          </div>

          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="w-full">
              <p className="mb-2 font-medium">Telefone / Whatsapp</p>
              <Input
                type="text"
                register={register}
                name="whatsapp"
                error={errors.whatsapp?.message}
                placeholder="EX: 011111111111..."
              />
            </div>

            <div className="w-full">
              <p className="mb-2 font-medium">Cidade</p>
              <Input
                type="text"
                register={register}
                name="city"
                error={errors.city?.message}
                placeholder="EX: Paranaíba - MS..."
              />
            </div>
          </div>

          <div className="mb-3">
            <p className="mb-2 font-medium">Preço</p>
            <Input
              type="text"
              register={register}
              name="price"
              error={errors.price?.message}
              placeholder="EX: 25.000..."
            />
          </div>

          <div className="mb-3">
            <p className="mb-2 font-medium">Desvrição</p>
            <textarea 
              className="border-2 border-neutral-400 w-full rounded-lg h-24 px-2"
              {...register("description")}
              name="description"
              id="description"
            
              placeholder="Digite a desccrição completa sobre o carro"              
            />
            {errors.description && <p className="mb-1 text-red-500 ">{errors.description.message}</p>}
          </div>
          
          <button type="submit" className="w-full rounded-md bg-zinc-900 text-white font-medium h-10  ">
            Cadastrar
          </button>

        </form>
      </div>
    </Container>
  );
}
